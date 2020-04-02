var util = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {},
    time: '',
    article_content: null,
    dataAlready: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.request({
      url: `${app.globalData.path}/news_detail`,
      method: 'POST',
      data: {
        id: options.id
      },
      success:function(res){
        that.setData({
          item: res.data
          })
          let TIME = util.formatTime(new Date());
          var sRDate = new Date(TIME);
          var eRDate = new Date(that.data.item.intime);
          var result = (eRDate-sRDate)/(24*60*60*1000);
          result = result.toString().substr(1);
          let time = that._gshDate(result)
          that.setData({
            time: time
          })
          // 处理content的img图片
        let article_content = that.data.item.content
        let imgReg = /<img.*?(?:>|\/>)/gi;
        article_content = article_content.replace(imgReg, " ");
        console.log(article_content)
          that.setData({
            article_content: article_content
          })
      }
    })
    that.setData({
      dataAlready: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 时间转换
  _gshDate:function(shijian) {
    if (shijian < 0) {
      return ''
    } else if ((shijian / 1000 < 30)) {
      return '刚刚'
    } else if (shijian / 1000 < 60) {
      return parseInt((shijian / 1000)) + '秒前'
    } else if ((shijian / 60000) < 60) {
      return parseInt((shijian / 60000)) + '分钟前'
    } else if ((shijian / 3600000) < 24) {
      return parseInt(shijian / 3600000) + '小时前'
    } else if ((shijian / 86400000) < 31) {
      return parseInt(shijian / 86400000) + '天前'
    } else if ((shijian / 2592000000) < 12) {
      return parseInt(shijian / 2592000000) + '月前'
    } else {
      return parseInt(shijian / 31536000000) + '年前'
    }
  },
  backHome(){
    wx.switchTab({
      url: "/pages/index/index"
    })
  }
})