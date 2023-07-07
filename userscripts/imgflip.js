const replaceNode = (el, keepChildren) => {
  if (keepChildren) {
    el.parentNode.replaceChild(el.cloneNode(true), el);
  }
  else {
    var newEl = el.cloneNode(false);
    while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
    el.parentNode.replaceChild(newEl, el);
  }
};
const gB = () => { return document.querySelector('#mm-settings > div.gen-wrap > div.gen-wrap-btns.clearfix > button.mm-generate.b.but') };
const canvas = document.querySelector('#mm-preview-outer > div.mm-preview > canvas');
const nSB = (blob, fileName) => {
    Object.assign(document.createElement('a'), { 
        style: 'display:none!important;', 
        href: window.URL.createObjectURL(blob),
        download: fileName,
    }).click();
};
replaceNode(gB());
Object.assign(gB(), {
    innerText: 'Free Download <3',
    onclick: ()=>{
        canvas.toBlob((blob) => {
            nSB(blob, `meme-${canvas.width}x${canvas.height}.png`);
        });
    }
});
