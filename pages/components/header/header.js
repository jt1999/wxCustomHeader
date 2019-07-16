// pages/components/header/header.js
Component({
  /* 组件的属性列表 */
  properties: {
    title: { // 设置标题
      type: String,
      value: ''
    },
    show_bol: { // 控制返回箭头是否显示
      type: Boolean,
      value: false
    },
    my_class: { // 控制样式
      type: Boolean,
      value: false
    },

  },
  /* 组件的初始数据 */
  data: {
    isShow: false,//显示隐藏
    bar_Height: wx.getSystemInfoSync().statusBarHeight, // 获取手机状态栏高度
    nav_Height: wx.getSystemInfoSync().statusBarHeight+46
  },
  /* 组件的方法列表 */
  methods: {
    setShowValue: function(value) {
      this.setData({
        isShow: value
      })
      console.log(value)
    },
    goBack: function() { // 返回事件
      wx.navigateTo({
        url: '/pages/logs/logs',
      })
      this.setData({
        isShow: true
      })
    }
  }
})