var _faces = {}

export function getFontFaces() {
    if(_faces._cached) return _faces
    var styleSheets = document.styleSheets
    for(let i = 0, len = styleSheets.length; i < len; i++) {
        let styleSheet = styleSheets[i]
        let href = styleSheet.href
        let cssRules = styleSheet.cssRules
        for(let i = 0, len = cssRules.length; i < len; i++) {
            let cssRule = cssRules[i]
            let cssText = cssRule.cssText
            if(cssText.indexOf('@font-face') === 0) {
                let cssRuleStyles = cssRule.style
                let styles = Array.from(cssRuleStyles)
                let face = {
                    cssText,
                }
                styles.forEach(item => {
                    face[item] = cssRuleStyles.getPropertyValue(item)
                })
                let name = face['font-family']
                _faces[name] = face
                face.styleSheetHref = href
            }
        }
    }
    _faces._cached = true
    return _faces
}

function matchAll(str, reg) {
  var res = []
  var match
  while(match = reg.exec(str)) {
    res.push(match)
  }
  return res
}

function resolveUrl(path, base) {
    // Absolute URL
    if (path.match(/^[a-z]*:\/\//)) {
      return path;
    }
    // Protocol relative URL
    if (path.indexOf("//") === 0) {
      return base.replace(/\/\/.*/, path)
    }
    // Upper directory
    if (path.indexOf("../") === 0) {
        return resolveUrl(path.slice(3), base.replace(/\/[^\/]*$/, ''));
    }
    // Relative to the root
    if (path.indexOf('/') === 0) {
        var match = base.match(/(\w*:\/\/)?[^\/]*\//) || [base];
        return match[0] + path.slice(1);
    }
    //relative to the current directory
    return base.replace(/\/[^\/]*$/, "") + '/' + path.replace(/^\.\//, '');
}

function escapeRegex(value) {
    return value.replace( /[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&" );
}

// function fontEncodeBase64(url) {
//     var font = 'data:font/truetype;charset=utf-8;base64,'
// }

export function getFontFace(name) {
    var fontFaces = getFontFaces()
    var fontFace = fontFaces[name]
    if(!fontFace) return

    var cssText = fontFace.cssText
    var urls = matchAll(cssText, /url\(\"(.*?)\"\)/gi)
    var styleSheetHref = fontFace.styleSheetHref

    urls.forEach(item => {
        let src = item[1]
        if(src.indexOf('data:') === 0) return
        let url = resolveUrl(src, styleSheetHref)
        let reg = new RegExp(escapeRegex(src), 'g')
        cssText = cssText.replace(reg, url)
    })
    return cssText
}
