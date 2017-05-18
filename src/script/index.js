import html2canvas from 'html2canvas'
import download from 'downloadjs'

// event handler
function copy(dataurl) {
    var img = document.createElement('img')
    img.src = dataurl
    img.select()
    try {
        document.execCommand('copy')
        img.blur()
    }
    catch(e) {}
}

const getDataURL = (el, options, factory) => {
    if(typeof el === 'string') {
        el = document.querySelector(el)
    }
    let type = options.type || 'png'
    let filename = (options.name || 'download') + '.' + type
    let filetype = 'image/' + type
    options.width = options.width || el.offsetWidth
    options.height = options.height || el.offsetHeight
    options.onrendered = canvas => {
        let dataurl = canvas.toDataURL(filetype)
        factory(dataurl, filename, filetype, canvas)
    }
    html2canvas(el, options)
}

export default class Html2Image {
    static save(el, options) {
        getDataURL(el, options, download)
        return this
    }
    static copy(el, options) {
        getDataURL(el, options, dataurl => copy(dataurl))
    }
}
