if (!domtoimage) {
    domtoimage = globalThis.domtoimage;
  }
  if (!saveAs) {
    saveAs = globalThis.FS_saveAs;
  }
  if (!JSZip) {
    JSZip = globalThis.JSZip;
  }
  
  chapter = window.location.href.split("/")[6] || "CHAP";
  title = `HimeGimi${chapter}`;
  drivee();
  
  function saveBase64AsFile(base64, fileName) {
    var link = document.createElement("a");
  
    link.setAttribute("href", base64);
    link.setAttribute("download", fileName);
    link.click();
  
    console.log("clicked:", fileName);
  }
  
  function extract(id, ii, end, data) {
    if (id >= end) {
      fin(data);
      return;
    }
    //     if(id < 10) { id = '0' + id}
  
    //     container = document.querySelector(`[data-ptimg="data/00${id}.ptimg.json"]`)
    container = document.getElementById(`content-p${id}`);
    if (!container || !container.children[0]) {
      console.log("missing:", id);
      extract(id + 1, ii, end, data);
      return;
    }
  
    ii.ii = ii.ii >= 0 ? ii.ii : id;
  
    console.log("started:", id);
  
    node = container.children[0];
    domtoimage
      .toPng(node)
      .then(function (dataUrl) {
        data.data = [...data.data, { dataUrl, id }];
        extract(id + 1, ii, end, data);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  }
  
  function drivee(title) {
    console.log("STARTED");
    let ii = { ii: -1 };
    let data = { data: [] };
    let node;
  
    extract(0, ii, 30, data);
    //     for (let i = 0; i < 30; i++) {
    //         setTimeout(() => extract(i, title, ii), 3000);
    //     }
  }
  
  function fin(data) {
    let zip = new JSZip();
    let folder = zip.folder("collection");
    data.data.forEach(({ dataUrl, id }) => {
      dat = dataUrl.split("base64,")[1];
      folder.file(`${title}-${id}.png`, dat, { base64: true });
    });
  
    folder
      .generateAsync({ type: "blob" })
      .then((content) => saveAs(content, "files"));
  }
  