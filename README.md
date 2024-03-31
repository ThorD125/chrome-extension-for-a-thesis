# Chrome Extension Pentest Toolkit

This repository contains a Chrome extension that facilitates the demonstration and testing of various web security exploits. Follow the setup instructions below to get started.

## TODO'S

| TODO Item                                                        | Status     |
| ---------------------------------------------------------------- | ---------- |
| Identifying requests                                             | ✅ Done    |
| Identifying exploits                                             | ✅ Done    |
| Adding more exploits                                             | ✅ Done    |
| Adding multiple payloads                                         | ✅ Done    |
| Returning results                                                | ✅ Done    |
| Performing attacks                                               | ✅ Done    |
| List of exploits                                                 | ✅ Done    |
| Default files to get when exploitable                            | ✅ Done    |
| Adding settings                                                  | 🟡 Pending |
| Adding a way to insert your own payloads                         | 🟡 Pending |
| Adding show all button to popup                                  | 🟡 Pending |
| Notifing badge icon when exploit worked                          | ✅ Done    |
| Default search for info on every new site fe .git folder, emails | 🟡 Pending |

## TedTalk

### - who am i (### - titles die hiermee beginnen moeten nog uitgewerkt worden)

### Disclaimer

This Chrome extension and associated exploits are intended for educational and testing purposes only. Do not use these exploits on any system or website without proper authorization. The developers and contributors of this repository are not responsible for any misuse or damage caused by the misuse of these exploits. Always ensure that you have appropriate permissions before conducting any security testing.

### - who knows what an extension is

### - explain what an extension is

### Why I Started Developing a Chrome Extension

It all began with my frustration at school, specifically with the cumbersome process of viewing documents on LEHO. I had to scroll three times just to see a single page in its entirety. This led me to write a small piece of JavaScript and execute it in the console. Later, I evolved this script into a bookmarklet. However, I still found it inconvenient to open a document and press the bookmark each time. Thus, I embarked on a quest to find a way to automatically execute JavaScript whenever a LEHO document was opened. This journey led me to the world of browser extensions.

Although there were existing extensions like Tampermonkey that could potentially meet my needs, they didn't perform exactly as I wanted. They were either too complex for my simple requirement or failed to function in the desired manner. As a result, I decided to develop my own extension.

### Why a chrome extension?

A couple of reasons: first of which that chrome my default browser was, second the documentaton is (not amazing) but better then firefox's documentation.
Afterwards when thinking more about it: the chrome browsers itself has a marketshare of ~65%, safari ~15% (but i dont have a macbook so this wouldnt be feasable), firefox ~5% and the last ~15% are the other browsers and a lot of those are chromium based.

Although initially i tried to develop the extensions for both Firefox and Chromium-based browsers i found Google's documentation to be superior. Furthermore, after spending hours trying to make it work on Firefox without success, I decided to focus on Chromium-based browsers, which also offered the advantage of wider applicability due to their increasing market share.

### - development proces

#### Key Components of the Extension

before i start explaining the exploits there are some things we need to get fimiliar with

- **manifest.json**: This file acts as the backbone of a Chrome extension. It configures the extension, declaring its major components, and requests the necessary permissions to function properly.

- **background.js**: Think of this as the JavaScript powering the entire browser's extension environment. While it can't interact directly with the content of each tab, it can handle different kinds of requests and manage broader extension activities.

- **offscreen.html**: This HTML file exists within the same operational context as a browser tab but remains invisible to the user. It's a hidden layer where certain extension processes can run in the background.

- **listener.js**: Associated with offscreen.html, this JavaScript file is dedicated to monitoring specific events or "attacks" in the extension's hidden realm. It's where we listen for and respond to various triggers.

- **content.js**: This script runs in the context of each browser tab, directly interacting with the web content. It's isolated to the tab it operates in, ensuring that its actions are tab-specific and do not interfere with the broader browser or other tabs.

#### Tools and Methodology

Therre wherre also tools:...

For examining and modifying requests, I utilized Burp Suite by Dafydd Stuttard, a tool that lets you intercept, view, and modify the requests sent from your browser. My approach involved intercepting every request using background JavaScript. This method allowed for real-time monitoring and modification of requests before they were completed, offering insights into potential exploits.

## Chrome Extension Exploit Identifier and Status Table

| Exploit Identifier                               | Exploit Link                                                                                                  | Description                                                                                                                         | Working    |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| post_formbody_attack                             | [Exploit Link](https://portswigger.net/web-security/xxe/lab-xinclude-attack)                                  | This exploit demonstrates an XXE (XML External Entity) attack by exploiting vulnerabilities in the `post_formbody_attack` scenario. | ✅         |
| post_xmlbody_attack                              | [Exploit Link](https://portswigger.net/web-security/xxe/lab-exploiting-xxe-to-retrieve-files)                 | This exploit showcases the exploitation of XXE to retrieve files by targeting the `post_xmlbody_attack` scenario.                   | ✅         |
| postmessage_exploit                              | [Exploit Link](https://medium.com/@chiragrai3666/exploiting-postmessage-e2b01349c205)                         | This exploit demonstrates the exploitation of postMessage vulnerabilities.                                                          | 🟡 Pending |
| blind_xxe_with_data_retrieval_via_error_messages | [Exploit Link](https://portswigger.net/web-security/xxe/blind/lab-xxe-with-data-retrieval-via-error-messages) | This exploit aims to demonstrate blind XXE with data retrieval via error messages.                                                  | 🟡 Pending |

<!-- TODO add to table get_filepath <https://portswigger.net/web-security/file-path-traversal> -->
<!-- TODO add to table postmessage identifying -->

### Exploiting and Refining

The first automatic exploit I worked on involved an XML attack, which I learned about from an article. After successfully implementing this exploit, I took the time to modularize my code, breaking it down into separate files and folders for better organization and maintenance.

During the development process, I encountered challenges with variable scope across different document files, which I resolved using `postMessage` for event passing and `localStorage` for data storage. Additionally, I utilized resources from PortSwigger (the creators of Burp Suite) to find and test other exploits.

To address the issue of not always having the console open, I introduced badges as a way to visually indicate the number of exploits executed on a tab, complemented by a popup to display the executed exploits and their results.

### - issues

### - adding more explanations of the other exploits and show pocs

## Setup

1. Clone this repository to a known location on your system, for example, `~/chrome-extension`.

2. Open Google Chrome.

3. Navigate to `chrome://extensions/` in the address bar.

4. Enable developer mode by toggling the switch located at the top right corner.

5. Click on the "Load unpacked" button and select the folder where you cloned this repository (`~/chrome-extension`).

6. The extension should now be loaded into Chrome.

7. Navigate to a webpage that you wish to test for vulnerabilities.

## How to use

For now, you can visit websites and freely explore their features. If the extension detects a request that might be exploitable, it will automatically attempt certain actions. You can view the results in the extension's service. To access the service:

1. Open Google Chrome.
2. Surf website you may leggaly pentest
3. After a while, if there are any exploits that succeeded, there will show a badge with the amount of exploits that succeeded, then you can click on the popup and it will show the exploits with a button to copy the executed exploit

## Sources

- “All labs | Web Security Academy.” <https://portswigger.net/web-security/all-labs>
- “API reference,” Chrome for Developers. <https://developer.chrome.com/docs/extensions/reference/api>
- “Chat GPT.” <https://chat.openai.com/auth/login>
- A. Leybourne, “Chrome Extension Icon Generator.” <https://alexleybourne.github.io/chrome-extension-icon-generator/>
- “Extensions / Manifest v3 | Chrome for Developers,” Chrome for Developers. <https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3>
- Scribbr, “Free Citation Generator | APA, MLA, Chicago | Scribbr,” Scribbr, Mar. 21, 2024. <https://www.scribbr.com/citation/generator>
- “People of Twitter.” <https://twitter.com/home>
- “Using IndexedDB - Web APIs | MDN,” MDN Web Docs, Jan. 30, 2024. <https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB>

<!-- TODO add sources postmessage<https://medium.com/@chiragrai3666/exploiting-postmessage-e2b01349c205> -->
<!-- TODO add sources tedtalk <https://www.youtube.com/watch?v=1JT_lTfK69Q> -->
