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
5. **Make sure** your screen after opened dev tool has around 1400px horizontally (Higher than 1600px or less than 1000px will probably break the script).
6. Run drive.js from dev tool
7. Wait and don't move away from the screen.
8. The images are then packed into zip file, save them anywhere you want.

## Configure
[TITLE, START, END](https://github.com/SornrasakC/MangaExtractors/blob/main/SpeedBinbReader/snippets/drive.js#L13) can be changed to whatever you want.

## Idea
Basically, it just relies on [dom-to-image](https://github.com/tsayen/dom-to-image) to convert each page to image and zipped them.

