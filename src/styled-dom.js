export function getComputedStyleString(el, pe = null) {
    var computedStyles = window.getComputedStyle(el, pe)
    var stylesText = computedStyles.cssText
    return stylesText
}

export function getStyledElement(el) {
    var element = el.cloneNode()
    var stylesText = getComputedStyleString(el)
    element.style.cssText = stylesText
    var beforeStylesText = getComputedStyleString(el, ':before')
    var before = document.createElement('span')
    before.style.cssText = beforeStylesText
    element.insertBefore(before, el.firstChild)
    var afterStylesText = getComputedStyleString(el, ':after')
    var after = document.createElement('span')
    after.style.cssText = afterStylesText
    element.appendChild(before)
    return element
}

export function getStyledNode(el) {
    var cloned = el.cloneNode(true)
    if(cloned.children.length > 0) {
        cloned.children = cloned.children.map(element => getStyledNode(element))
    }
    return getStyledElement(cloned)
}

export function getStyledHtml(el) {
    return getStyledNode(el).outerHTML
}
