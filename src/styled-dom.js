export function getComputedStyleString(el, pseudo = null, options = {}) {
    var computedStyles = window.getComputedStyle(el, pseudo)
    var classNames = options.classNames || []
    var cssText = ''
    var styleText = el.style.cssText
    classNames.forEach(item => {
        let style = computedStyles.getPropertyValue(item)
        cssText += ';' + item + ':' + style
    })
    return styleText + cssText
}

export function buildStyledElement(el, options) {
    var defaultStylesText = el.style.cssText
    var stylesText = getComputedStyleString(el, null, options)
    el.style.cssText = stylesText
    el.setAttribute('default-style', defaultStylesText)

    if(options.pseudo) {
        var beforeStylesText = getComputedStyleString(el, ':before', options)
        var before = document.createElement('span')
        before.className = 'pseudo-element'
        before.style.cssText = beforeStylesText
        el.insertBefore(before, el.firstChild)

        var afterStylesText = getComputedStyleString(el, ':after', options)
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

export function getStyledHtml(el, options) {
    buildStyledDOM(el, options)
    return el.outerHTML
}
