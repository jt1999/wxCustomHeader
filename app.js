//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
       
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  /**处理链接 */
  subByHttps: function(str) {
    var url = '';
    if (str.substr(0, 8) == "https://") {
      //这部分是以https://为开头的处理
      url = str;
    } else {
      url = this.globalData.filesUrl + str;
    }
    return url;
  },
  /**
   * 公共上传文件
   * @path 路径
   * @cb callBack 回调
   * @key 后台需要的name
   * @formData 额外参数
   */
  wxUploadFile: function (path, cb, key, formData) {
    wx.showLoading({
      title: '正在上传',
    })
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
      filePath: path,
      name: 'file',
      formData: {
        'path': 'user'
      },
      success(res) {
        return typeof cb == "function" && cb(res.data)
      },
      fail(){
        wx.showToast({
          title: '网络错误，请稍候重试',
          icon:'none'
        })
      },
      complete(){
        wx.hideLoading();
      }
    })
  },
  globalData: {
    userInfo: null,
    filesUrl: "",
  }
})