if (!domtoimage) {
    domtoimage = globalThis.domtoimage;
}
if (!saveAs) {
    saveAs = globalThis.FS_saveAs;
}
if (!JSZip) {
    JSZip = globalThis.JSZip;
}

// ############# RESIZE TO X: 1400px ################
chapter = window.location.href.split("/")[6] || "CHAP";
TITLE = `HimeGimi Ch.${chapter}`;
START_PAGE = 0;
END_PAGE = 30;

main();

function saveBase64AsFile(base64, fileName) {
    var link = document.createElement("a");

    link.setAttribute("href", base64);
    link.setAttribute("download", fileName);
    link.click();

    console.log("clicked:", fileName);
}

async function extract(id, end, data) {
    if (id >= end) {
        fin(data);
        return;
    }

    container = document.getElementById(`content-p${id}`);
    if (!container || !container.children[0]) {
        console.log("missing:", id);
        extract(id + 1, end, data);
        return;
    }
    // container.scrollIntoView()

    const X = (elem) => elem.getBoundingClientRect().x;
    
    const contents = document.getElementById("contents");
    const evtUp = new WheelEvent('mousewheel', {deltaY: 100, view: window, bubbles: true})
    const evtDown = new WheelEvent('mousewheel', {deltaY: -100, view: window, bubbles: true})
    
    while (X(container) < 0 || 800 < X(container)) {
        if (X(container) < 0) {
            contents.dispatchEvent(evtDown); // PAGE SLIDES LEFT to RIGHT
            console.log('Wheeled Down')
            await new Promise(r => setTimeout(r, 1500));
            continue;
        }
        contents.dispatchEvent(evtUp); // PAGE SLIDES RIGHT to LEFT
        console.log('Wheeled Up')
        await new Promise(r => setTimeout(r, 1500));
    }

    console.log("started:", id);

    node = container.children[0];
    domtoimage
        .toPng(node)
        .then(function (dataUrl) {
            data.data = [...data.data, { dataUrl, id }];
            extract(id + 1, end, data);
        })
        .catch(function (error) {
            console.error("oops, something went wrong!", error);
        });
}

function main() {
    console.log("STARTED");
    let data = { data: [] };

    extract(START_PAGE, END_PAGE, data);
}

function fin(data) {
    let zip = new JSZip();
    let folder = zip.folder("collection");
    data.data.forEach(({ dataUrl, id }) => {
        dat = dataUrl.split("base64,")[1];
        folder.file(`${TITLE}-${id}.png`, dat, { base64: true });
    });

    folder.generateAsync({ type: "blob" }).then((content) => saveAs(content, "files"));
}
