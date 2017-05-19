import html2canvas from 'html2canvas'
import download from 'downloadjs'

export default class Html2Image {
    static canvas(el, options, factory) {
        if(typeof el === 'string') {
            el = document.querySelector(el)
        }
        let type = options.type || 'png'
        let filename = (options.name || 'download') + '.' + type
        let filetype = 'image/' + type
        options.width = options.width || el.offsetWidth
        options.height = options.height || el.offsetHeight
        options.onrendered = canvas => {
            factory(canvas, filename, filetype)
        }
        html2canvas(el, options)
        return this
    }
    static base64(el, options, factory) {
        this.canvas(el, options, (canvas, filename, filetype) => {
            let dataurl = canvas.toDataURL(filetype)
            factory(dataurl, filename, filetype)
        })
    }
    static blob(el, options, factory) {
        this.canvas(el, options, (canvas, filename, filetype) => {
            canvas.toBlob(blob => factory(blob, filename, filetype), 'image/' + filetype, 1)
        })
    }
    static save(el, options) {
        this.base64(el, options, download)
        return this
    }
}
