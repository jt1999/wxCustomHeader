//index.js
//获取应用实例
const app = getApp()
const myWx = require('../../utils/request.js')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bar_Height: wx.getSystemInfoSync().statusBarHeight,
    widnowH: wx.getSystemInfoSync().screenHeight
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    console.log(wx.getSystemInfoSync().statusBarHeight)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

  },
  /**测试请求 */
  getTest() {
    myWx.request({
        url: "/cardcert/authentication",
        type: 'GET',
        params: {
          unionId: ''
        }
      }).then((res) => {
        console.log("[返回结果]",res);
      })
      .catch(myWx.showErr);
  },
  onShow: function() {
    this.selectComponent("#header").setShowValue(false)
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})