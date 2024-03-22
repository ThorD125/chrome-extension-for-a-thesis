# Chrome Extension Exploit Toolkit

This repository contains a Chrome extension that facilitates the demonstration and testing of various web security exploits. Follow the setup instructions below to get started.

## Setup

1. Clone this repository to a known location on your system, for example, `~/chrome-extension`.

2. Open Google Chrome.

3. Navigate to `chrome://extensions/` in the address bar.

4. Enable developer mode by toggling the switch located at the top right corner.

5. Click on the "Load unpacked" button and select the folder where you cloned this repository (`~/chrome-extension`).

6. The extension should now be loaded into Chrome.

7. Navigate to a webpage that you wish to test for vulnerabilities.

## Chrome Extension Exploit Identifier and Status Table

| Exploit Identifier | Exploit Link | Description | Working |
|--------------------|--------------|-------------|---------|
| post_formbody_attack | [Exploit Link](https://portswigger.net/web-security/xxe/lab-xinclude-attack) | This exploit demonstrates an XXE (XML External Entity) attack by exploiting vulnerabilities in the `post_formbody_attack` scenario. | ✅ |
| post_xmlbody_attack | [Exploit Link](https://portswigger.net/web-security/xxe/lab-exploiting-xxe-to-retrieve-files) | This exploit showcases the exploitation of XXE to retrieve files by targeting the `post_xmlbody_attack` scenario. | ✅ |
| postmessage_exploit | [Exploit Link](https://medium.com/@chiragrai3666/exploiting-postmessage-e2b01349c205) | This exploit demonstrates the exploitation of postMessage vulnerabilities. | 🟡 Pending |
| blind_xxe_with_data_retrieval_via_error_messages | [Exploit Link](https://portswigger.net/web-security/xxe/blind/lab-xxe-with-data-retrieval-via-error-messages) | This exploit aims to demonstrate blind XXE with data retrieval via error messages. | 🟡 Pending |

## Usage

For now, you can visit websites and freely explore their features. If the extension detects a request that might be exploitable, it will automatically attempt certain actions. You can view the results in the extension's service. To access the service:

1. Open Google Chrome.

2. Navigate to the extension menu by clicking on the extension icon in the toolbar.

3. Select "Inspect views" and then choose "Service Worker".

4. Here, you can monitor the activity and results of the extension's actions when it detects potential exploits.

## TODO'S

| TODO Item                                           | Status   |
|----------------------------------------------------|----------|
| Identifying requests                               | ✅ Done     |
| Identifying exploits                               | ✅ Done     |
| Adding more exploits                               | ✅ Done     |
| Adding multiple payloads                           | ✅ Done     |
| Returning results                                  | ✅ Done     |
| Performing attacks                                 | ✅ Done     |
| List of exploits                                   | 🟡 Pending  |
| Default files when exploitable                     | 🟡 Pending  |
| Adding settings                                    | 🟡 Pending  |
| Notifing when exploit detection                    | 🟡 Pending  |

## Files Explained

- **manifest.json**: This file acts as the backbone of a Chrome extension. It configures the extension, declaring its major components, and requests the necessary permissions to function properly.

- **background.js**: Think of this as the JavaScript powering the entire browser's extension environment. While it can't interact directly with the content of each tab, it can handle different kinds of requests and manage broader extension activities.

- **offscreen.html**: This HTML file exists within the same operational context as a browser tab but remains invisible to the user. It's a hidden layer where certain extension processes can run in the background.

- **listener.js**: Associated with offscreen.html, this JavaScript file is dedicated to monitoring specific events or "attacks" in the extension's hidden realm. It's where we listen for and respond to various triggers.

- **content.js**: This script runs in the context of each browser tab, directly interacting with the web content. It's isolated to the tab it operates in, ensuring that its actions are tab-specific and do not interfere with the broader browser or other tabs.

## Disclaimer

This Chrome extension and associated exploits are intended for educational and testing purposes only. Do not use these exploits on any system or website without proper authorization. The developers and contributors of this repository are not responsible for any misuse or damage caused by the misuse of these exploits. Always ensure that you have appropriate permissions before conducting any security testing.
