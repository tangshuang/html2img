import {getFontFace} from './font-face'

export function getComputedCssText(el, options = {}) {
    var pseudo = options.pseudo || null
    var computedStyles = window.getComputedStyle(el, pseudo)
    var classNames = options.classNames || []
    var defaultCssText = options.defaultCssText || el.style.cssText
    var cssText = ''
    classNames.forEach(property => {
        let value = computedStyles.getPropertyValue(property)
        // value = value.replace(`"`, `'`)
        cssText += property + ':' + value + ';'
    })
    if(defaultCssText !== '' && defaultCssText !== cssText) {
        cssText = defaultCssText + cssText
    }
    return cssText
}

export function buildStyledSvg(el, options) {
    var fontFamilys = []
    var textElements = el.querySelectorAll('text')
    textElements.forEach(item => {
        let textComputedStyles = window.getComputedStyle(item, null)
        let familys = textComputedStyles.getPropertyValue('font-family')
        familys = familys.split(',')
        if(familys.length === 0) return
        familys.forEach(item => {
            let name = item.trim().replace(/"|'/g, '')
            let cssText = getFontFace(name)
            if(cssText) {
                fontFamilys.push(cssText)
            }
        })
    })

    if(fontFamilys.length === 0) return

    var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
    el.insertBefore(defs, el.firstElementChild)

    var style = document.createElementNS('http://www.w3.org/2000/svg', 'style')
    style.setAttribute('type', 'text/css')
    defs.appendChild(style)

    var styleTextContent = fontFamilys.join('')
    var styleTextNode = document.createTextNode(styleTextContent)
    style.append(styleTextNode)
}

export function buildStyledElement(el, options) {
    var defaultCssText = el.style.cssText
    el.setAttribute('default-style', defaultCssText)

    var stylesText = getComputedCssText(el, options)
    el.style.cssText = stylesText

    if(el.tagName === 'svg') {
        buildStyledSvg(el, options)
    }

    var svgElements = options.svgElements || ['svg', 'g', 'path', 'line', 'circle', 'rect', 'text', 'tspan', 'style']
    if(options.pseudo && svgElements.indexOf(el.tangName) === -1) {
        options.pseudo = ':before'
        var beforeStylesText = getComputedCssText(el, options)
        var before = document.createElement('span')
        before.className = 'pseudo-element'
        before.style.cssText = beforeStylesText
        el.insertBefore(before, el.firstChild)

        options.pseudo = ':after'
        var afterStylesText = getComputedCssText(el, options)
        var after = document.createElement('span')
        after.className = 'pseudo-element'
        after.style.cssText = afterStylesText
        el.appendChild(after)
    }
}

export function buildStyledDOM(el, options) {
    if(el.children.length > 0) for(let i = 0, len = el.children.length; i < len; i ++) {
        let child = el.children[i]
        buildStyledDOM(child, options)
    }
    buildStyledElement(el, options)
}


// export function buildSvgTextNode(el, options) {
//     var pseudo = options.pseudo || null
//     var classNames = options.classNames || []
//     var parentNode = el.parentNode
//     var treeNodes = [parentNode, el]
//     var styles = {}
//     for(let i = 0; parentNode.tagName !== 'svg' && parentNode.tagName !== 'BODY' && i < 100; i ++) {
//         parentNode = parentNode.parentNode
//         treeNodes.unshift(parentNode)
//     }
//
//     treeNodes.forEach(item => {
//         var computedStyles = window.getComputedStyle(item, pseudo)
//         classNames.forEach(property => {
//             let value = computedStyles.getPropertyValue(property)
//             if(styles[property] !== value) {
//                 styles[property] = value
//             }
//         })
//     })
// }

export function getStyledHtml(el, options) {
    buildStyledDOM(el, options)
    return el.outerHTML
}
