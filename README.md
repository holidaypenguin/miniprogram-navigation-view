# navigation-view

小程序自定义组件

> 使用此组件需要依赖小程序基础库 2.2.3 以上版本，同时依赖开发者工具的 npm 构建。具体详情可查阅[官方 npm 文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)。

## 使用效果
![navigation-view](https://www.holidaypenguin.com/miniprogram-navigation-view/images/GIF.gif)

## 使用方法

1. 安装 navigation-view：

```
npm install --save miniprogram-navigation-view
```

2. 在需要使用 navigation-view 的页面 page.json 中添加 navigation-view 自定义组件配置

```json
{
  "usingComponents": {
    "navigation-view": "miniprogram-navigation-view"
  }
}
```
3. WXML 文件中引用 navigation-view

``` xml
<navigation-view></navigation-view> 
```

4. 根据需要禁用页面导航栏

全局设置
``` json
{
  "window": {
    "navigationStyle": "custom"
  }
}
```
页面设置
``` json
{
  "navigationStyle": "custom"
}
```

## navigation-view的属性介绍如下：

| 属性名      | 类型        | 默认值     | 是否必须        | 说明          |
|------------|-------------|------------|----------------|---------------|
| title   |   String   |  自定义导航栏视图  |  -  |  标题居中显示，如果长度超长省略号显示  |
| title-style   |   Object \| String   |  -  |  -  |  设置标题文字样式，可以是字符串或者对象，具体用法查看例子；如果设置了字体颜色，将覆盖 text-style设置的字体颜色  |
| text-style   |   String   |  white  |  -  |  对应页面的 navigationBarTextStyle 导航栏标题颜色，仅支持 black / white  |
| custom-style   |   Object \| String   |  -  |  -  |  设置导航栏样式，可以是字符串或者对象，具体用法查看例子  |
| back-delta   |   Number   |  1  |  -  |  点击返回回退指定数量的页面，如果为0不回退进发送回退事件，使用者自行处理；如果有0切换到大于0的数，则立即执行回退  |
| visible-back   |   Boolean   |  true  |  -  |  显示返回按钮，不显示则返回事件也不会发送  |
| nav-class   |   String   |  -  |  -  |  导航栏外部样式  |
| nav-title-class   |   String   |  -  |  -  |  标题外部样式  |

## navigation-view的事件介绍如下：

### back事件
只要存在返回按钮，手动点击返回按钮就会发送该事件

## navigation-view的slot介绍如下：

### back slot

可在当前返回图标之后添加文字兄弟节点作为返回按钮的子节点，作为返回按钮的一部分
``` js
<view slot="back">返回</view>
```

### back-after slot
可在返回按钮后面自定义一个兄弟节点，不作为返回按钮的一部分
``` js
<view slot="back-after"><icon></icon></view>
```

## 注意

- 因为表头采用的是`display: fixed;`布局，因此需要获取导航栏高度`wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT`，这两个参数是导航栏自己设定的。