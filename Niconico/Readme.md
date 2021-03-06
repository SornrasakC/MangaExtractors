# NicoNicoReader

## Usage
1. open terminal
```
npm i (if not yet) 
npm start
```
2. Then copy [drive.js](snippets/drive.js) and [prep.js](snippets/prep.js) to [chrome dev tool snippets](https://developers.google.com/web/tools/chrome-devtools/javascript/snippets).
3. Open a page you want to download. (that is using BinB..)
4. Run prep.js from dev tool
5. Run drive.js from dev tool
6. Wait and don't move away from the screen.
7. The images are then packed into zip file, save them anywhere you want.

## Configure
[TITLE, START, END](snippets/drive.js#L13) can be changed to whatever you want.

## Idea
Basically, it just relies on [dom-to-image](https://github.com/tsayen/dom-to-image) to convert each page to image and zipped them.

