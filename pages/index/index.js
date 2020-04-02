//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    active: 0,
    page: 1,
    limit: 50,
    data: {},
    oldData: {},
    data0:{}, // 农业资讯
    data1:{}, // 价格行情
    data2:{}, // 农药新闻
    data3:{}, // 化肥新闻
    // isHidden0: true,
    // isHidden1: true,
    // isHidden2: true,
    // isHidden3: true,
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
            res.data[i].hot = parseInt(res.data[i].hot) + 100
            changeData[i] = res.data[i]
          }
          console.log(changeData)
          that.setData({
            data: changeData
          })
          let arr = that.dataAothor(changeData)
          that.dataClass(arr)
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
   let id = event.currentTarget.dataset.gid
   wx.navigateTo({
     url: '/pages/detal/detal?id=' + id
   })
  },
  // 集成数据
  dataAothor:function(data){
    if(this.count(this.data.oldData) === 0){
      this.setData({
        oldData: data
      })
    }
    let arr = [] // 每一次新来的数据
    let oldArr = [] // 老数据
    for(let i in data){
        arr.push(data[i]);
    }
    for(let i in this.data.oldData){
      oldArr.push(this.data.oldData[i]);
    }
    // 第一次请求数据,返回原数据,第二次请求数据,返回拼接数据
    if(oldArr[0].id === arr[0].id){

      return data
    }else{
      return arr.concat(oldArr)
    }

  },
  // 分发数据
  dataClass:function(data){
    let data0 = {}
    let data1 = {}
    let data2 = {}
    let data3 = {}
    let length = this.count(data)
    for(let i=0;i<length;i++){
      if(data[i].type == 2){
        data0[i] = data[i]
      }else if(data[i].type == 3){
        data1[i] = data[i]
      }else if(data[i].type == 4){
        data2[i] = data[i]
      }else if(data[i].type == 5){
        data3[i] = data[i]
      }
    }
    this.setData({
      data0: data0,
      data1: data1,
      data2: data2,
      data3: data3
    })
    // console.log('农业资讯',this.data.data0)
    // console.log('价格行情',this.data.data1)
    // console.log('农药新闻',this.data.data2)
    // console.log('化肥新闻',this.data.data3)
  },
  count:function(o){
    var t = typeof o;
    if(t == 'string'){
            return o.length;
    }else if(t == 'object'){
            var n = 0;
            for(var i in o){
                    n++;
            }
            return n;
    }
    return false;
  },
  // 判断数据是否存在的事件
  // judge(){
  //   if(this.count(this.data.data0)<=0) this.setData({isHidden0:false});
  //   if(this.count(this.data.data1)<=0) this.setData({isHidden1:false});
  //   if(this.count(this.data.data2)<=0) this.setData({isHidden2:false});
  //   if(this.count(this.data.data3)<=0) this.setData({isHidden3:false});
  // }
  // 点击标签请求相对应的数据
  tagClick(name){
    let that = this
    let map = {0:2,1:3,2:4,3:5}
    wx.request({
      url: `${app.globalData.path}/news`,
      method: 'POST',
      data: {
           type: map[name.detail.index],
           page: that.data.page,
           limit: that.data.limit
      },
      success: function (res) {
        if(name.detail.index == 0){
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
              res.data[i].hot = parseInt(res.data[i].hot) + 100
              changeData[i] = res.data[i]
            }
            that.setData({
              data0: changeData
            })
          }
        }else if(name.detail.index == 1){
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
              res.data[i].hot = parseInt(res.data[i].hot) + 100
              changeData[i] = res.data[i]
            }
            that.setData({
              data1: changeData
            })
          }
        }else if(name.detail.index == 2){
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
              res.data[i].hot = parseInt(res.data[i].hot) + 100
              changeData[i] = res.data[i]
            }
            that.setData({
              data2: changeData
            })
          }
        }else if(name.detail.index == 3){
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
              res.data[i].hot = parseInt(res.data[i].hot) + 100
              changeData[i] = res.data[i]
            }
            that.setData({
              data3: changeData
            })
          }
        }
      }
    })
  }
})
