import {buildStyledDOM} from './styled-dom'

export function svg2xml(el, options) {
    buildStyledDOM(el, options)
    var svg = el.cloneNode(true)
    svg.setAttribute('version', 1.1)
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    var xml = svg.outerHTML
    return xml
}

export function svg2dataurl(el, options) {
    var xml = svg2xml(el, options)
    var dataurl = 'data:image/svg+xml;base64,'+ window.btoa(xml)
    return dataurl
}

export function svg2canvas(el, options) {
    var canvas = document.createElement('canvas')
    var context = canvas.getContext('2d')
    var img = new Image
    img.src = svg2dataurl(el, options)
    context.drawImage(img, 0, 0)
    return canvas
}

export function svg2image(el, type = 'png', options) {
    var canvas = svg2canvas(el, options)
    var base64url = canvas.toDataURL('image/' + type)
    return base64url
}

export function svg2img(el, options) {
    var dataurl = svg2dataurl(el, options)
    var img = new Image
    img.src = dataurl
    return img
}
