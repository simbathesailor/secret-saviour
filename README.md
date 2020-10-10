# secret-saviour

A tab saviour in progress

## What I want

Let's take example

1. you have opened zoom and there are many tabs which are already open having private data. You dont want that anyone sees that. But we humans forget it every time when we start sharing.Every one faced times when they get that weird feeling , where some private stuff gets shown to everyone.

To get rid , I want a solution which have following functionality

WHen screen sharing is on.

- Hide all the private tabs contents with some meaningful alyover

- Everyone can see the layover

- If the person sharing the screen wants to still want to show the tab,
  He can click on the layover to allow sharing. A pop will be show to reconfirm the action. which can also be configurabel

- Layover can be configurable for certain things
- As a user I can click on the plugin in the toolbar can add a site to the
  pivate tab list.
  We can add by domain, exact or better searches

  Option to kill all the private tabs, at one click.

  Can have option to save the set of tabs which were private to be closed
  temorarily and clicking again can bring up them in one go

- Setting for the behviour of the layovers.
  Should automatically hide and unhide
  unhide when clicked on it.

The sharing clients to target are :

- Zoom for reliable, large video calls
- Microsoft Teams
- Google Meet for G Suite users :
- GoToMeeting for professional features
- join.me for a lightweight option
- Webex for whiteboarding
- Slack for calls from your team chat app

<!-- I am not sure , why any one would pay for it -->

No updates withe possibility of detecting screen share yet. Why it is so difficult

Revenue Model need to be decided :
................................
But the feature which are free should be good enough to pull the customers for premium verion of secret-saviour

---

Work started
Need to get correct icon and with the below following diomension to properly show
up in browser

"icons": { "16": "icon16.png",
"48": "icon48.png",
"128": "icon128.png" },

Mozilla specific docs:

https://www.extensiontest.com/test/bdfecc80-0adb-11eb-adfc-fd92bd9f8483

https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/

Open this page for debigging
about:debugging#/runtime/this-firefox

Safari:

https://developer.apple.com/documentation/safariservices/safari_web_extensions/converting_a_web_extension_for_safari
