/**接口请求前缀 */
const apiUrl = '';
/**
 * 判断请求状态是否成功
 * 参数：http状态码
 * 返回值：[Boolen]
 */
function isHttpSuccess(status) {
  return status >= 200 && status < 300 || status === 304;
}
/**
 * 提炼错误信息
 * 参数：err
 * 返回值：[string]errMsg
 */
function errPicker(err) {
  if (typeof err === 'string') {
    return err;
  }

  return err.msg || err.errMsg || (err.detail && err.detail.errMsg) || '未知错误';
}
/**
 * 错误弹窗
 */
function showErr(err) {
  const msg = errPicker(err);
  wx.showToast({
    title: msg,
    icon: 'none'
  })
}
/**
 * 请求设置 header
 * jsJson [boolean]
 */
function headerType(isJson) {
  let headerObj = {
    'content-type': 'application/x-www-form-urlencoded' // 默认值
  }
  if (isJson) {
    headerObj = {
      'content-type': 'application/json'
    }
  }
  return headerObj;
}
/**
 * ajax高级封装
 * 参数：[Object]option = {}，参考wx.request；
 * 返回值：[promise]res
 */
function request(url, options = {}) {
  return new Promise((res, rej) => {
    const header = headerType(options.header)

    wx.request({
      url: apiUrl + url,
      method: options.type || "GET",
      header: header,
      data: options.params,
      success(requestRes) {
        const isSuccess = isHttpSuccess(requestRes.statusCode);
        //成功请求状态
        if (isSuccess) {
          res(requestRes.data)
        } else {
          rej({
            msg: "网络错误，请稍候重试！",
            detail: requestRes
          });
        }
      },
      fail() {
        rej({
          msg: "网络错误，请稍候重试！",
          detail: "接口请求出错"
        })
      }
    })
  });
}

module.exports = {
  request: request,
  showErr: showErr
}