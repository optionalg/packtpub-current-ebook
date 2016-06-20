# packtpub-current-ebook

Packtpub graciously offers a free tech related ebook to anyone who signed up. This script makes a call to the packtpub website,
extracts the information of the current free ebook and displays it in a notification window.

![The notification on a Linux Mint system](https://raw.githubusercontent.com/pbauerochse/packtpub-current-ebook/master/notification.png)

The sole purpose of this script is to be run at system startup of my local computer so I wouldn't forget to check the current offer.

## Usage

This script has only been tested on a Linux (Mint) system. There's no guarantee, that it will work on any other system (I especially doubt that it will work on Windows), although I tried to
be as OS independent as possible.

Running `npm install -g` should put the script on your path so you should be able to invoke it with `packtpub-current-ebook` from your console / bash.

## Credits

This script depends on the following libraries. All credits for those libraries go to their corresponding authors

* cheerio - https://github.com/cheeriojs/cheerio
* request - https://github.com/request/request
* node-notifier - https://github.com/mikaelbr/node-notifier
