const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: true,
    key: ''
  },
  onLoad: function (options) {
    var that = this;
    wx.login({
        success: res => {
            wx.request({
              url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
              method: 'GET',
              data: {
                appid: 'wx9388960493532182',
                secret: '73902fe9eda2cd7cfbd3b10d691fedd4',  
                js_code: res.code,
                grant_type: 'authorization_code'
              },
              success:function(res){
                that.setData({
                    key: res.data.session_key
                })
              }
            })
        }
    });
    // 查看是否授权
    // wx.getSetting({
    //     success: function(res) {
    //       // 授权或未授权显示
    //         if (res.authSetting['scope.userInfo']) {
    //             wx.getUserInfo({
    //                 success: function(res) {
    //                     wx.login({
    //                         success: res => {
    //                             wx.request({
    //                             //自行补上自己的 APPID 和 SECRET
    //                                 url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx9388960493532182&secret=73902fe9eda2cd7cfbd3b10d691fedd4&js_code=' + res.code + '&grant_type=authorization_code',
    //                                 success: res => {
    //                                     // 获取到用户的 openid
    //                                     console.log("用户的openid:" + res);
    //                                 }
    //                             });
    //                         }
    //                     });
    //                 }
    //             });
    //         } else {
    //             that.setData({
    //                 isHide: true
    //             });
    //         }
    //     }
    // });
  },
  // 登录
  // 手机号登录 
  getPhoneNumber(e) {
    let that = this
    // 获取传输给后台的信息
    if(e.detail.errMsg == 'getPhoneNumber:ok'){
      wx.checkSession({
        success () {
            wx.request({
              url: `${app.globalData.path}/wxphonept`,
              method: 'POST',
              data: {
              key: that.data.key,
              date: e.detail.encryptedData,  
              iv: e.detail.iv
              },
              success:function(res){
                console.log(res)
                // 获取电话号码并获取用户信息
                
                
              }
          })
        },
        fail () {
          wx.login() //重新登录
        }
      })
    }
    else {
        wx.showModal({
            title: '警告',
            content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
            showCancel: false,
            confirmText: '返回授权',
            success: function(res) {
                if (res.confirm) {
                    console.log('用户点击了“返回授权”');
                }
            }
        });
    }
  },
    //  用户信息登录
    bindGetUserInfo: function(e) {
      console.log('点击了授权按钮')
      if (e.detail.userInfo) {
          var that = this;
          let user = {
            avatarUrl: "",
            city: "",
            country: "",
            nickName: ""
          }
          user.avatarUrl = e.detail.userInfo.avatarUrl
          user.nickName =  e.detail.userInfo.nickName
          that.setData({
              isHide: false
          });
      } else {
          console.log('没有授权登录')
          wx.showModal({
              title: '警告',
              content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
              showCancel: false,
              confirmText: '返回授权',
              success: function(res) {
                  if (res.confirm) {
                      console.log('用户点击了“返回授权”');
                  }
              }
          });
      }
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

  }
})