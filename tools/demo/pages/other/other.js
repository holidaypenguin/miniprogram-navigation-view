Page({
  data: {
    title: '',
    textStyle: 'white',
    titleStyle: '',
    customStyle: '',
    backDelta: 1,
    visibleBack: true,
  },
  onLoad() {
  },
  onnavback() {

  },
  setTitle() {
    if (this.data.title !== '自定义导航栏视图') {
      this.setData({
        title: '自定义导航栏视图'
      })
    } else {
      this.setData({
        title: 'navigation-view'
      })
    }
  },
  setTextStyle() {
    if (this.data.textStyle !== 'white') {
      this.setData({
        textStyle: 'white'
      })
    } else {
      this.setData({
        textStyle: 'black'
      })
    }
  },
  setTitleStyle() {
    if (this.data.titleStyle !== 'color: #ddd;') {
      this.setData({
        titleStyle: 'color: #ddd;'
      })
    } else {
      this.setData({
        titleStyle: {
          color: '#fff'
        }
      })
    }
  },
  setCustomStyle() {
    if (this.data.customStyle !== 'background-color: #60A718;') {
      this.setData({
        customStyle: 'background-color: #60A718;'
      })
    } else {
      this.setData({
        customStyle: {
          backgroundColor: 'rgba(0, 0, 0, 0)'
        }
      })
    }
  },
  setBackDelta() {
    if (this.data.backDelta !== 1) {
      this.setData({
        backDelta: 1
      })
    } else {
      this.setData({
        backDelta: {
          backDelta: 0
        }
      })
    }
  },
  backHandler() {
    // eslint-disable-next-line no-console
    console.log('执行了回退')
  },
  setVisibleBack() {
    this.setData({
      visibleBack: !this.data.visibleBack
    })
  }
})
