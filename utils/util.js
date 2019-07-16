/**时间戳式日期处理 */
const formatTime = (datetime, type) => {
  let date = new Date(datetime)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()

  if (type == "YYYY-MM-DD") {
    return [year, month, day].map(formatNumber).join('/')
  } else if (type == "YYYY-MM-DD HH:mm") {
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
  } else {
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }

}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**字符串式日期处理 */
const formatDate = (date, type) => {
  if (!date) return '';
  let data = date.toString().replace(/\-/g, '/')
  let year = data.split(' ')[0].split('/')[0];
  let month = data.split(' ')[0].split('/')[1];
  let day = data.split(' ')[0].split('/')[2];
  let hours = data.split(' ')[1].split(':')[0];
  let min = data.split(' ')[1].split(':')[1];
  let sec = data.split(' ')[1].split(':')[2];

  if (type == "YYYY-MM-DD") {
    return [year, month, day].map(formatNumber).join('-')
  } else {
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hours, min].map(formatNumber).join(':')
  }

}


/**检测字符串中是否包含手机号 */
const matchPhoneNum = str => {
  var regx = /(1[3|4|5|7|8][\d]{9}|0[\d]{2,3}-[\d]{7,8}|400[-]?[\d]{3}[-]?[\d]{4})/g;
  var phoneNums = str.match(regx);
  if (phoneNums != null && phoneNums.length > 0) {
    for (var i = 0; i < phoneNums.length; i++) {
      //手机号全部替换
      //str = str.replace(phoneNums[i],"[****]");
      var temp = phoneNums[i]
      //隐藏手机号中间4位(例如:12300102020,隐藏后为132****2020)
      temp = temp.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
      str = str.replace(phoneNums[i], temp);
    }
  }
  return str;
}

/**处理字符串 null  */
const formatNullStr = str => {
  let result = "";
  if (str == null || str == "null" || str == "") {
    result = "";
  } else {
    result = str;
  }
  return result;
}

/**拨打电话 */
const callPhone = phone => {
  if (phone != null && phone != "") {
    wx.makePhoneCall({
      phoneNumber: phone
    })
  } else {
    wx.showToast({
      title: '暂无手机号',
      icon: 'none'
    })
  }
}

/**复制文字 */
const copyText = text => {
  wx.setClipboardData({
    data: text,
    success(res) {
      wx.getClipboardData({
        success(res) {
          console.log(res.data) // data
        }
      })
    }
  })
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  matchPhoneNum: matchPhoneNum,
  formatNullStr: formatNullStr,
  callPhone: callPhone,
  copyText: copyText
}