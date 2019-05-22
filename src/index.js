/* eslint-disable no-bitwise */
import StyleHelper from './lib/styleHelper'

// const app = getApp()

const TEXT_STYLE_WHITE = 'white'
const TEXT_STYLE_BLACK = 'black'

const textStyleSet = new Set([TEXT_STYLE_WHITE, TEXT_STYLE_BLACK])

Component({
  externalClasses: ['nav-class', 'nav-title-class'],
  options: {
    multipleSlots: true
  },
  properties: {
    title: {
      type: String,
      value: '自定义导航栏视图'
    },
    titleStyle: {
      type: Object | String,
      observer(newVal) {
        this.setSelfTitleStyle(newVal)
      }
    },
    // 对应页面的 navigationBarTextStyle 导航栏标题颜色，仅支持 black / white
    textStyle: {
      type: String,
      value: TEXT_STYLE_WHITE,
      observer(newVal) {
        this.setTextStyle(newVal)
      }
    },
    customStyle: {
      type: Object | String,
      observer(newVal) {
        this.setSelfCustomStyle(newVal)
      }
    },
    backDelta: {
      type: Number,
      value: 1,
      observer(newVal, oldVal) {
        // 如果默认是0，表示当前不可关闭，当回退数量大于0则执行回退，如果原本是大于0的，将不执行回退
        if (oldVal < 1 && newVal > 0) {
          this.backHandler()
        }
      }
    },
    visibleBack: {
      type: Boolean,
      value: true,
    }
  },
  data: {
    statusBarHeight: 0,
    selfCustomStyle: '',
    selfLineHeight: '',
    selfTitleStyle: '',
    pageDeep: 0,
    _textStyle: TEXT_STYLE_WHITE,
    config: {
      customNavigation: true
    }
  },
  created() {
    this.init()
  },
  attached() {
    this.setSelfCustomStyle(this.data.customStyle, false)
    this.setSelfLineHeight(false)
    this.setSelfTitleStyle(this.data.titleStyle, false)
    this.setTextStyle(this.data.textStyle, false)
    this.setData({
      statusBarHeight: wx.STATUS_BAR_HEIGHT,
      selfCustomStyle: this.data.selfCustomStyle,
      selfLineHeight: this.data.selfLineHeight,
      selfTitleStyle: this.data.selfTitleStyle,
      pageDeep: getCurrentPages().length,
      _textStyle: this.data._textStyle,
    })
  },
  ready() {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    init() {
      if (wx.DEFAULT_HEADER_HEIGHT) return

      const res = wx.getSystemInfoSync()
      wx.WIN_WIDTH = res.screenWidth
      wx.WIN_HEIGHT = res.screenHeight
      wx.IS_IOS = /ios/i.test(res.system)
      wx.IS_ANDROID = /android/i.test(res.system)
      wx.STATUS_BAR_HEIGHT = res.statusBarHeight
      // https://www.jb51.net/article/158860.htm
      wx.DEFAULT_HEADER_HEIGHT = wx.IS_IOS ? 44 : 48
      // wx.DEFAULT_HEADER_HEIGHT = res.screenHeight - res.windowHeight;
      if (!this.data.config.customNavigation) {
        wx.STATUS_BAR_HEIGHT = 0
        wx.DEFAULT_HEADER_HEIGHT = 0
      }
      wx.DEFAULT_CONTENT_HEIGHT = res.screenHeight - res.statusBarHeight - wx.DEFAULT_HEADER_HEIGHT
      wx.IS_APP = true
      wx.PIXEL_RATIO = res.pixelRatio
    },
    setSelfCustomStyle(customStyle, isSetData = true) {
      const height = wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT
      const style = {}
      style.height = height
      style.lineHeight = wx.DEFAULT_HEADER_HEIGHT
      style.paddingTop = wx.STATUS_BAR_HEIGHT

      this.data.selfCustomStyle = `${StyleHelper.getPlainStyle(style)} ${StyleHelper.getPlainStyle(customStyle)}`

      if (isSetData) {
        this.setData({
          selfCustomStyle: this.data.selfCustomStyle,
        })
      }
    },
    setSelfLineHeight(isSetData = true) {
      const coverStyle = {}
      coverStyle.lineHeight = wx.DEFAULT_HEADER_HEIGHT
      this.data.selfLineHeight = StyleHelper.getPlainStyle(coverStyle)
      if (isSetData) {
        this.setData({
          selfLineHeight: this.data.selfLineHeight
        })
      }
    },
    setSelfTitleStyle(titleStyle, isSetData = true) {
      this.data.selfTitleStyle = `${this.data.selfLineHeight} ${StyleHelper.getPlainStyle(titleStyle)}`
      if (isSetData) {
        this.setData({
          selfTitleStyle: this.data.selfTitleStyle
        })
      }
    },
    setTextStyle(textStyle, isSetData = true) {
      this.data._textStyle = textStyleSet.has(textStyle) ? textStyle : TEXT_STYLE_WHITE

      if (isSetData) {
        this.setData({
          _textStyle: this.data._textStyle
        })
      }
    },
    doubleTap(e) {
      // 控制点击事件在350ms内触发，加这层判断是为了防止长按时会触发点击事件
      // if (this.data.touchEndTime - this.data.touchStartTime < 350) {
      // 当前点击的时间
      const currentTime = e.timeStamp
      const lastTapTime = this.data.lastTapTime
      // 更新最后一次点击时间
      this.data.lastTapTime = currentTime

      // 如果两次点击时间在300毫秒内，则认为是双击事件
      if (currentTime - lastTapTime < 300) {
        this.triggerEvent('doubletap')
        // 成功触发双击事件时，取消单击事件的执行
        // clearTimeout(this.lastTapTimeoutFunc);
      }
      // }
    },
    backHandler() {
      if (this.data.backDelta > 0 && this.data.visibleBack) {
        wx.navigateBack({delta: this.data.backDelta})
      }
      this.triggerEvent('back')
    }
  }
})


/**
 * 版本比较
 * a: 当前微信版本
 * b: 最低版本6.6.0
 */
// eslint-disable-next-line no-unused-vars
function compareVersion(a, b) {
  if (a && b) {
    const aArr = a.split('.')
    const bArr = b.split('.')
    const minLen = Math.min(aArr.length, bArr.length); let pos = 0; let
      flag = 0
    while (pos < minLen) {
      flag = parseInt(aArr[pos], 10) - parseInt(bArr[pos], 10)
      if (flag !== 0) {
        break
      }
      pos++
    }
    flag = (flag !== 0) ? flag : (aArr.length - bArr.length)
    return flag > 0
  } else {
    return false
  }
}
