import html2canvas from 'html2canvas'
import download from 'downloadjs'
import {svg2imagedom} from './svg2image'

export default class Html2img {
    static canvas(el, options, factory) {
        if(typeof el === 'string') {
            el = document.querySelector(el)
        }
        let type = options.type || 'png'
        let filename = (options.name || 'download') + '.' + type
        let filetype = 'image/' + type

        // convert svg
        var svgs = el.querySelectorAll('svg')
        var svgImgs = []
        if(svgs.length > 0) svgs.forEach(item => {
            let img = svg2imagedom(item)
            svgImgs.push(img)
        })

        options.width = options.width || el.offsetWidth
        options.height = options.height || el.offsetHeight
        options.onrendered = canvas => {
            factory(canvas, filename, filetype)

            // remove converted svg images
            if(svgImgs.length > 0) svgImgs.forEach(item => {
                let next = item.nextSibling
                next.style.display = 'block'
                item.parentNode.removeChild(item)
            })
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
    static copy(el, options) {
        return this
    }
}
