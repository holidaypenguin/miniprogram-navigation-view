
import StringHelper from './stringHelper'

const SizeAttrs = [
  'height', 'width',
  'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
  'top', 'right', 'bottom', 'left',
  'lineHeight', 'fontSize',
]
const DashedSizeAttrs = SizeAttrs.map((attr) => StringHelper.camelCase2Dash(attr))

function getUnitizedValue(value) {
  if (/^\d+(\.\d+)?$/.test(value)) {
    return value + 'px'
  } else {
    return value
  }
}

function getObjectStyle(target) {
  if (typeof target === 'object') {
    return target
  }
  const attrs = target.split(';')
  const obj = {}

  attrs.forEach((attr) => {
    const pairs = attr.split(':')
    if (pairs.length === 2) {
      const key = StringHelper.trim(pairs[0])
      const value = StringHelper.trim(pairs[1])

      if (key && value) {
        obj[key] = value
      }
    }
  })
  return obj
}

const StyleHelper = {
  getPlainStyle(target) {
    if (!target) {
      return ''
    }
    let style = ''
    const type = typeof target
    if (type === 'string') {
      style = target
    } else if (type === 'object') {
      let dashAttr = ''
      Object.keys(target).forEach((attr) => {
        dashAttr = StringHelper.camelCase2Dash(attr)

        if (target[attr]) {
          if (DashedSizeAttrs.indexOf(dashAttr) > -1 || SizeAttrs.indexOf(attr) > -1) {
            style += `${dashAttr}: ${getUnitizedValue(target[attr])};`
          } else {
            style += `${dashAttr}: ${target[attr]};`
          }
        }
      })
    }
    return style
  },
  getMergedPlainStyles(targets) {
    const objectStyles = targets.map((target) => getObjectStyle(target))
    const mergedStyles = Object.assign({}, ...objectStyles)
    return StyleHelper.getPlainStyle(mergedStyles)
  }
}

export default StyleHelper
