path = "http://localhost:8081/dom-to-image.js"
import(path).then(m => {__module = m; console.log('dom-to-image loaded', m)});

path2 = "http://localhost:8081/FileSaver.js"
import(path2).then(m => {__module = m; console.log('FileSaver loaded', m)});

path3 = "http://localhost:8081/jszip.js"
import(path3).then(m => {__module = m; console.log('jszip loadded', m)});