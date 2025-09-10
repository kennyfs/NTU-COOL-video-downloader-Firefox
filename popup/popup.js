// popup.js

// Firefox API
const api = browser;

document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadBtn');
    const copyUrlBtn = document.getElementById('copyUrlBtn');
    const videoUrlDisplay = document.getElementById('videoUrlDisplay');
    const urlError = document.getElementById('urlError');
    const status = document.getElementById('status');
    const loadingIndicator = document.getElementById('loadingIndicator');

    function fetchVideoUrl() {
        api.runtime.sendMessage({action: 'getVideoUrl'}, function(response) {
            if (response.url) {
                videoUrlDisplay.textContent = response.url;
                urlError.classList.add('hidden');
            } else {
                urlError.classList.remove('hidden');
            }
        });
    }

    fetchVideoUrl();

    downloadBtn.addEventListener('click', function() {
        loadingIndicator.classList.remove('hidden');
        status.textContent = i18n.getMessage('downloadingVideoSubtitles');
        status.className = 'text-sm text-blue-500';

        api.runtime.sendMessage(
            {action: 'triggerDownload'}, function(response) {
                loadingIndicator.classList.add('hidden');
                if (response.success) {
                    let message = i18n.getMessage('downloadStarted');

                    if (response.subtitles &&
                        response.subtitles.successful > 0) {
                        const count = `${response.subtitles.successful}/${
                            response.subtitles.total}`;
                        message += ' ' + i18n.format('subtitlesCount', count);
                    } else if (response.subtitles && response.subtitles.error) {
                        message += ' (' +
                            i18n.getMessage('subtitlesDownloadFailed') + ')';
                    }

                    status.textContent = message;
                    status.className = 'text-sm text-green-500';
                } else {
                    status.textContent =
                        response.error || i18n.getMessage('downloadFailed');
                    status.className = 'text-sm text-red-500';
                }
            });
    });

    copyUrlBtn.addEventListener('click', function() {
        const url = videoUrlDisplay.textContent;
        if (url) {
            navigator.clipboard.writeText(url).then(() => {
                status.textContent = i18n.getMessage('urlCopied');
                status.classList.add('text-green-500');
            });
        }
    });
});