import html2canvas from 'html2canvas'
import download from 'downloadjs'
import {buildStyledDOM} from './styled-dom'

export default class Html2img {
    static canvas(el, options, factory) {
        if(typeof el === 'string') {
            el = document.querySelector(el)
        }
        let type = options.type || 'png'
        let filename = (options.name || 'download') + '.' + type
        let filetype = 'image/' + type

        // build styles
        let classNames = options.classNames || [
            'background-color',
            'box-sizing',
            'color',
            'display',
            'font-family',
            'font-size',
            'line-height',
            'overflow-x',
            'overflow-y',
            'opacity',
            'shape-rendering',
            'text-anchor',
            'text-size-adjust',
            'stroke',
            'stroke-width',
            'fill',
            // 'transform',
            // 'transform-origin',
        ]
        buildStyledDOM(el, {
            classNames,
            pseudo: options.pseudo,
        })
        // background-color
        let bgDefault = el.style.backgroundColor
        el.style.backgroundColor = options.backgroundColor || '#ffffff'

        options.width = options.width || el.offsetWidth
        options.height = options.height || el.offsetHeight
        options.onrendered = canvas => {
            // reset backgroundColor
            el.style.backgroundColor = bgDefault

            if(typeof options.before === 'function') {
                options.before(el, canvas)
            }

            factory(canvas, filename, filetype)

            if(typeof options.after === 'function') {
                options.after(el, canvas)
            }
        }

        if(typeof options.init === 'function') {
            options.init(el, options)
        }

        html2canvas(el, options)
        return this
    }
    static base64(el, options, factory) {
        this.canvas(el, options, (canvas, filename, filetype) => {
            let dataurl = canvas.toDataURL(filetype)
            factory(dataurl, filename, filetype)
        })
        return this
    }
    static blob(el, options, factory) {
        this.canvas(el, options, (canvas, filename, filetype) => {
            canvas.toBlob(blob => factory(blob, filename, filetype), 'image/' + filetype, 1)
        })
        return this
    }
    static save(el, options) {
        this.base64(el, options, download)
        return this
    }
    static copy(el, options) {
        return this
    }
}
