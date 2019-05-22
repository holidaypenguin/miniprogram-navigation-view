
export default {
  isNumber(str) {
    return /^\d+(\.\d+)?$/.test(str)
  },

  getLength(str) {
    return str.toString().length
  },

  camelCase2Dash(str) {
    return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
  },

  dash2CamelCase(str) {
    return str.replace(/-([a-z])/gi, function (m, w) {
      return w.toUpperCase()
    })
  },

  trim(str) {
    if (str) {
      return str.trim()
    }
    return str
  },
}
