import {getStyledNode} from './styled-dom'

export function svg2xml(el) {
    var node = getStyledNode(el)
    node.setAttribute('version', 1.1).setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    var xml = node.outerHTML
    return xml
}

export function svg2dataurl(el) {
    var xml = svg2xml(el)
    var dataurl = 'data:image/svg+xml;base64,'+ window.btoa(xml)
    return dataurl
}

export function svg2canvas(el) {
    var canvas = document.createElement('canvas')
    var context = canvas.getContext('2d')
    var img = new Image
    img.src = svg2dataurl(el)
    context.drawImage(img, 0, 0)
    return canvas
}

export function svg2image(el, type = 'png') {
    var canvas = svg2canvas(el)
    var base64url = canvas.toDataURL('image/' + type)
    return base64url
}

export function svg2imagedom(el) {
    var dataurl = svg2dataurl(el)
    var img = new Image
    img.src = dataurl
    var parent = el.parentNode
    parent.insertBefore(img, el)
    // parent.removeChild(el)
    el.style.display = 'none'
    return img
}
