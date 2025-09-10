<p align="center">
  <img src="/icons/icon128.png" width="100" height="100"/>
</p>

<h1 align="center">NTU COOL Video Downloader (Firefox Edition)</h1>

[![en](https://img.shields.io/badge/lang-en-red)](https://github.com/willychen0146/NTU-COOL-video-downloader/blob/main/README.md)
[![中文](https://img.shields.io/badge/lang-中文-green.svg)](https://github.com/willychen0146/NTU-COOL-video-downloader/blob/main/README.zh-TW.md)

*Firefox extension for downloading videos and subtitles from the NTU COOL website. This is a modified version based on the original Chrome extension with added Firefox support, subtitle downloading, and internationalization features.*

## Installation Instructions

### Option 1: Download Signed Extension (Recommended)

1. Go to the [Releases page](https://github.com/kennyfs/NTU-COOL-video-downloader-Firefox/releases).
2. Download the latest `.xpi` file (Mozilla signed extension).
3. Open Firefox and navigate to `about:addons`.
4. Click the gear icon (⚙️) and select "Install Add-on From File...".
5. Select the downloaded `.xpi` file to install.

### Option 2: Development Installation

1. Download this repo as a [ZIP file from GitHub](https://github.com/kennyfs/NTU-COOL-video-downloader-Firefox.git).
2. Unzip the file to obtain a folder named `NTU-COOL-video-downloader-Firefox`.
3. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
4. Click "Load Temporary Add-on...".
5. Select the `manifest.json` file from the extracted folder.

### Notes

- **Option 1**: The signed extension will remain permanently installed and auto-update.
- **Option 2**: The extension will remain active until Firefox is closed (temporary installation for development).

## Usage

1. Navigate to the NTU COOL page containing the video you want to download.
2. Click on the NTU COOL Video Downloader extension icon.
3. Click the download button. The video and available subtitles will download automatically.

## Features

- **Video Download**: Download MP4 videos from NTU COOL
- **Subtitle Download**: Automatically download available subtitle files (.srt)
- **Internationalization**: Supports Traditional Chinese and English interface
- **Firefox Optimized**: Built specifically for Firefox WebExtensions API

## Video Compatibility

Currently, the extension does not support old videos that are not rendered by React on the NTU COOL website.

## Troubleshooting

If the extension fails to work, try refreshing the NTU COOL page and attempt again.

## Disclaimer

This extension is intended for learning and educational purposes only.

**⚠️ Development Notice**: This Firefox adaptation was developed with significant assistance from Large Language Models (LLMs). While the code has been reviewed and tested, users should be aware that AI-generated code may contain unexpected behaviors or security considerations. Please review the code before use in production environments.

## TODO 🐱

- [x] Implement basic download function
- [x] Add support for Mozilla Firefox
- [x] Add subtitle downloading functionality
- [x] Add internationalization support (i18n)
- [x] Mozilla unlisted signing for distribution
- [ ] Submit to Firefox Add-ons store (AMO)

## Authors

- [@NoMercySusie](https://github.com/willychen0146) - Original Chrome extension
- [@kennyfs](https://github.com/kennyfs) - Firefox adaptation, subtitle download, i18n support

## LICENSE

The project is made available under the MIT license. See the LICENSE file for more information.
