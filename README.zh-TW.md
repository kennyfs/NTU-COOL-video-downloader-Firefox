<p align="center">
  <img src="/icons/icon128.png" width="100" height="100"/>
</p>

<h1 align="center">NTU COOL 影片下載器（Firefox 版）</h1>

[![en](https://img.shields.io/badge/lang-en-red)](https://github.com/willychen0146/NTU-COOL-video-downloader/blob/main/README.md)
[![中文](https://img.shields.io/badge/lang-中文-green.svg)](https://github.com/willychen0146/NTU-COOL-video-downloader/blob/main/README.zh-TW.md)

*用於從 NTU COOL 網站下載影片與字幕的 Firefox 附加元件。此版本基於原始 Chrome 附加元件進行修改，新增 Firefox 相容性、字幕下載功能與國際化支援。*

## 安裝說明

### 方式一：安裝已簽署附加元件（建議）

1. 前往 [Releases 頁面](https://github.com/kennyfs/NTU-COOL-video-downloader-Firefox/releases)。
2. 下載最新的 `.xpi` 檔案（Mozilla 簽署的附加元件）。
3. 開啟 Firefox，前往 `about:addons`。
4. 點擊齒輪圖示（⚙️），選擇「從檔案安裝附加元件...」。
5. 選擇下載的 `.xpi` 檔案進行安裝。

### 方式二：開發者安裝

1. 從 GitHub 下載此儲存庫的 [ZIP 檔案](https://github.com/kennyfs/NTU-COOL-video-downloader-Firefox.git)。
2. 解壓縮檔案至名為 `NTU-COOL-video-downloader-Firefox` 的資料夾。
3. 開啟 Firefox，前往 `about:debugging#/runtime/this-firefox`。
4. 點擊「載入暫存附加元件...」。
5. 選擇資料夾中的 `manifest.json` 檔案。

### 注意事項

- **方式一**：已簽署的附加元件將永久安裝並支援自動更新。
- **方式二**：暫存附加元件僅在 Firefox 關閉前有效，適用於開發測試。

## 使用方法

1. 前往 NTU COOL 網站中包含目標影片的頁面。
2. 點擊瀏覽器工具列中的 NTU COOL 影片下載器圖示。
3. 在附加元件介面中點擊下載按鈕，影片與可用字幕將自動下載。

## 主要功能

- **影片下載**：支援從 NTU COOL 下載 MP4 格式影片。
- **字幕下載**：自動下載可用字幕檔案（.srt 格式）。
- **國際化支援**：提供繁體中文與英文介面。
- **Firefox 最佳化**：針對 Firefox WebExtensions API 進行建構。

## 影片相容性

目前此附加元件不支援 NTU COOL 網站上未使用 React 渲染的舊版影片。

## 問題排除

若附加元件無法正常運作，請重新整理 NTU COOL 頁面後再次嘗試。

## 免責聲明

此附加元件僅供學習和教育目的使用。

**⚠️ 開發注意事項**：此 Firefox 版本的開發過程中大量使用了大型語言模型 (LLM) 的協助。雖然程式碼已經過審查和測試，但使用者應注意 AI 生成的程式碼可能包含意外行為或安全性考量。建議在生產環境使用前先行檢視程式碼。

## 待辦事項 🐱

- [x] 實現基本下載功能
- [x] 新增 Mozilla Firefox 支援
- [x] 新增字幕下載功能
- [x] 新增國際化支援（i18n）
- [x] 完成 Mozilla 未列名簽署以供分發
- [ ] 提交至 Firefox 附加元件商店（AMO）

## 作者

- [@NoMercySusie](https://github.com/willychen0146) - 原始 Chrome 附加元件
- [@kennyfs](https://github.com/kennyfs) - Firefox 適配、字幕下載與國際化支援

## 授權條款

本專案採用 MIT 授權條款，詳情請參閱 LICENSE 檔案。
