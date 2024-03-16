# chrome extension

## Why I Started Developing a Chrome Extension

It all began with my frustration at school, specifically with the cumbersome process of viewing documents on LEHO. I had to scroll three times just to see a single page in its entirety. This led me to write a small piece of JavaScript and execute it in the console. Later, I evolved this script into a bookmarklet. However, I still found it inconvenient to open a document and press the bookmark each time. Thus, I embarked on a quest to find a way to automatically execute JavaScript whenever a LEHO document was opened. This journey led me to the world of browser extensions.

Although there were existing extensions like Tampermonkey that could potentially meet my needs, they didn't perform exactly as I wanted. They were either too complex for my simple requirement or failed to function in the desired manner. As a result, I decided to develop my own extension.

## The Development Process

My journey began with creating my first extension to improve document presentation on LEHO. However, another significant reason for choosing to develop a Chrome extension was the popularity and extensive use of Chromium-based browsers (e.g., Brave, Edge) alongside Firefox and Safari. Despite Safari being an option, my lack of a MacBook meant I couldn't test on it. I initially tried to develop extensions for both Firefox and Chromium-based browsers but found Google's documentation to be superior. Furthermore, after spending an hour trying to make it work on Firefox without success, I decided to focus on Chromium-based browsers, which also offered the advantage of wider applicability due to their increasing market share.

This led me to an idea: what if I could create an extension that automatically intercepts requests while browsing websites normally?

### Key Components of the Extension

- **Manifest**: This is where all the global settings of an extension are stored, including paths to its various components.
- **Manifest Version**: Initially, this was version 2, but it changed to version 3 after January, which significantly affected how some functionalities were handled.
- **Content Script**: A JavaScript script that executes on every page you visit.
- **Background Script**: A JavaScript script that runs in the background.
- **Popup**: A combination of HTML, JavaScript, and CSS files that display when you click the extension button.
- **Badge**: A small text that can appear under the extension icon to display the number of exploits found on a specific tab.
- **Offscreen**: Similar to the popup but does not appear visibly. It allows for background processing like a normal website.

## Tools and Methodology

For examining and modifying requests, I utilized Burp Suite by Dafydd Stuttard, a tool that lets you intercept, view, and modify the requests sent from your browser. My approach involved intercepting every request using background JavaScript. This method allowed for real-time monitoring and modification of requests before they were completed, offering insights into potential exploits.

## Exploiting and Refining

The first automatic exploit I worked on involved an XML attack, which I learned about from an article. After successfully implementing this exploit, I took the time to modularize my code, breaking it down into separate files and folders for better organization and maintenance.

During the development process, I encountered challenges with variable scope across different document files, which I resolved using `postMessage` for event passing and `localStorage` for data storage. Additionally, I utilized resources from PortSwigger (the creators of Burp Suite) to find and test other exploits.

To address the issue of not always having the console open, I introduced badges as a way to visually indicate the number of exploits executed on a tab, complemented by a popup to display the executed exploits and their results.
