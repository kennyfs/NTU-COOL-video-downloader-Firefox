// Firefox API
const api = browser;

// 儲存影片和字幕請求
let videoRequestUrls = [];
let subtitleRequests = new Set();  // 使用Set避免重複URL

// 攔截請求
api.webRequest.onBeforeRequest.addListener(details => {
    const url = details.url;

    // 影片 API 請求
    if (/^https:\/\/cool-video\.dlc\.ntu\.edu\.tw\/api\/courses\/[^\/]+\/videos\/[^\/]+\/view$/
            .test(url)) {
        videoRequestUrls.push(url);
        console.log(browser.i18n.getMessage('interceptedVideoRequest'), url);
    }

    // 字幕檔案請求
    if (/https:\/\/.*\.dlc\.ntu\.edu\.tw\/cool-video-subtitles\/.*\.srt/
            .test(url)) {
        // 使用Set自動去重相同URL
        subtitleRequests.add(
            {url: url, timestamp: Date.now(), tabId: details.tabId});
        console.log(browser.i18n.getMessage('interceptedSubtitleRequest'), url);
    }
}, {urls: ['*://cool-video.dlc.ntu.edu.tw/*', '*://*.dlc.ntu.edu.tw/*']});

// 攔截字幕請求標頭
api.webRequest.onBeforeSendHeaders.addListener(details => {
    if (/https:\/\/.*\.dlc\.ntu\.edu\.tw\/cool-video-subtitles\/.*\.srt/
            .test(details.url)) {
        // 找到對應的字幕請求並更新標頭
        for (const request of subtitleRequests) {
            if (request.url === details.url &&
                Math.abs(request.timestamp - Date.now()) < 2000) {
                request.headers = details.requestHeaders;
                break;
            }
        }
    }
}, {urls: ['*://*.dlc.ntu.edu.tw/*']}, ['requestHeaders']);

// 字幕下載功能
async function downloadSubtitle(subtitleRequest, filename) {
    const headers = {
        'User-Agent':
            'Mozilla/5.0 (X11; Linux x86_64; rv:142.0) Gecko/20100101 Firefox/142.0',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh-TW,en-US;q=0.5',
        'Referer': 'https://cool-video.dlc.ntu.edu.tw/',
        'Origin': 'https://cool-video.dlc.ntu.edu.tw'
    };

    // 使用攔截到的標頭
    if (subtitleRequest.headers) {
        subtitleRequest.headers.forEach(header => {
            if (header.name && header.value) {
                headers[header.name] = header.value;
            }
        });
    }

    try {
        const response = await fetch(
            subtitleRequest.url,
            {method: 'GET', headers: headers, credentials: 'include'});

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        return new Promise((resolve, reject) => {
            api.downloads.download(
                {url: blobUrl, filename: filename}, (downloadId) => {
                    URL.revokeObjectURL(blobUrl);
                    downloadId ? resolve({success: true}) :
                                 reject(new Error(browser.i18n.getMessage(
                                     'downloadFailed')));
                });
        });
    } catch (error) {
        throw error;
    }
}

// 安全的檔案名稱清理函數
function sanitizeFilename(filename) {
    if (!filename || typeof filename !== 'string') {
        return `video_${Date.now()}`;
    }
    
    return filename
        .replace(/[<>:"/\\|?*\x00-\x1f]/g, '_')  // 移除危險字元
        .replace(/^\.+/, '')  // 移除開頭的點
        .replace(/\.+$/, '')  // 移除結尾的點
        .replace(/\s+/g, '_')  // 空格轉為底線
        .substring(0, 100)  // 限制長度
        .trim() || `video_${Date.now()}`;
}

// 下載所有字幕
async function downloadAllSubtitles(videoTitle) {
    if (subtitleRequests.size === 0) return [];

    const baseTitle = sanitizeFilename(videoTitle);
    const results = [];

    // 轉換Set為陣列
    const requestArray = Array.from(subtitleRequests);

    console.log(browser.i18n.getMessage(
        'preparingSubtitleDownload', [requestArray.length]));

    for (let i = 0; i < requestArray.length; i++) {
        const request = requestArray[i];
        try {
            // 使用序列編號作為檔名
            const filename = `${baseTitle}.${i + 1}.srt`;

            await downloadSubtitle(request, filename);
            results.push({success: true, index: i + 1});
            console.log(
                browser.i18n.getMessage('subtitleDownloadSuccess'), filename);
        } catch (error) {
            results.push({success: false, error: error.message, index: i + 1});
            console.error(
                browser.i18n.getMessage('subtitleDownloadError'), `[${i + 1}]:`,
                error);
        }
    }

    // 清空字幕請求
    subtitleRequests.clear();
    return results;
}

// 分頁事件處理
api.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes('cool.ntu.edu.tw') &&
        changeInfo.status === 'loading') {
        videoRequestUrls = [];
        // 清空字幕請求
        subtitleRequests.clear();
    }
});

api.tabs.onRemoved.addListener((tabId) => {
    videoRequestUrls = [];
    // 清空字幕請求
    subtitleRequests.clear();
});

// 處理下載請求
api.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'triggerDownload' && videoRequestUrls.length > 0) {
        const videoUrl = videoRequestUrls.pop();

        fetch(videoUrl)
            .then(response => response.json())
            .then(async data => {
                // 找到影片下載 URL
                let downloadUrl = null;
                if (data.sourceUri && data.sourceUri.includes('.mp4')) {
                    downloadUrl = data.sourceUri;
                } else if (
                    data.altSourceUri && data.altSourceUri.includes('.mp4')) {
                    downloadUrl = data.altSourceUri;
                } else if (
                    data.sourceUri && data.sourceUri.includes('manifest.mpd')) {
                    downloadUrl = data.altSourceUri;
                }

                if (downloadUrl) {
                    const videoTitle = data.title || data.name;
                    const baseFilename = sanitizeFilename(videoTitle);

                    // 下載影片
                    api.downloads.download(
                        {url: downloadUrl, filename: `${baseFilename}.mp4`},
                        async (downloadId) => {
                            if (downloadId) {
                                // 下載字幕
                                try {
                                    const subtitleResults =
                                        await downloadAllSubtitles(
                                            baseFilename);
                                    const successful =
                                        subtitleResults.filter(r => r.success)
                                            .length;

                                    sendResponse({
                                        success: true,
                                        subtitles: {
                                            total: subtitleResults.length,
                                            successful: successful
                                        }
                                    });
                                } catch (error) {
                                    sendResponse({
                                        success: true,
                                        subtitles: {error: error.message}
                                    });
                                }
                            } else {
                                sendResponse({
                                    success: false,
                                    error: browser.i18n.getMessage(
                                        'videoDownloadFailed')
                                });
                            }
                        });
                } else {
                    sendResponse({
                        success: false,
                        error: browser.i18n.getMessage('videoUrlNotFoundError')
                    });
                }
            })
            .catch(error => {
                sendResponse({
                    success: false,
                    error: browser.i18n.getMessage('videoInfoFetchFailed')
                });
            });

        return true;
    } else if (request.action === 'getVideoUrl') {
        sendResponse({
            url: videoRequestUrls.length > 0 ?
                videoRequestUrls[videoRequestUrls.length - 1] :
                null
        });
        return true;
    } else {
        sendResponse({
            success: false,
            error: browser.i18n.getMessage('videoUrlNotFoundError')
        });
    }
});
