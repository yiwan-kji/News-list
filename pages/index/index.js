//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    active: 0,
    page: 1,
    limit: 10,
    data: {},
    imgUrl: ['../../static/img/background1.jpg', '../../static/img/background2.jpg', '../../static/img/background3.jpg', '../../static/img/background4.jpg']
  },
  // 生命周期
  onLoad: function () {
    wx.stopPullDownRefresh()
    let that = this
    // 网络请求
    wx.request({
      url: `${app.globalData.path}/news`,
      method: 'POST',
      data: {
           type: "all",
           page: that.data.page,
           limit: that.data.limit
      },
      success: function (res) {
        let changeData = {}
        if(res.data.length === 0){
          wx.showToast({
            title: '数据已经是最新啦！',
            icon: 'none',
            duration: 3000
          })
        }else{
          for(let i=0;i<res.data.length;i++){
            res.data[i].typeText = that.typeFunction(res.data[i].type)
            let num = Math.floor(Math.random() * 4);
            res.data[i].img = that.data.imgUrl[num]
            changeData[i] = res.data[i]
          }
          that.setData({
            data: changeData
          })
        }
      },
     fail:function(err){
          console.log('数据请求错误!')
     }
  })
  },
  // 事件
  typeFunction(id){
    let map = {2:"农业资讯",3:"价格行情",4:"农药新闻",5:"化肥新闻"}
    return map[id]
  },
  // 上拉刷新
  onPullDownRefresh: function () {
    let that = this;
    that.setData({
      page: that.data.page+1
    })
    this.onLoad();
  },
  // 跳转事件
  Todetail(event) {
   let item = event.currentTarget.dataset.gid
   let data = JSON.stringify(item)
   wx.navigateTo({
     url: '/pages/detal/detal?goods=' + data
   })
  }
})
