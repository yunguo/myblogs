//index.js
//获取应用实例
var app = getApp()
Page({
  onShareAppMessage: function () {
    return {
      title: '中海-右岸接房手续费计算器',
      desc: '本计算器只适用于中海左岸和右岸的手续费计算，其他楼盘请查看相关的税率变化。',
      path: '/pages/index/index'
    }
  },
  data: {
    conditionArray: [
      {
        id: 0,
        name: '首套房'
      },
      {
        id: 1,
        name: '二套房'
      },
      {
        id: 2,
        name: '二套以上'
      }
    ],
    propertyTypeArray: [
      {
        id: 0,
        name: '住宅'
      },
      {
        id: 1,
        name: '车位'
      },
      {
        id: 2,
        name: '商业'
      }
    ],
    partOwnerArray: [
      {
        id: 0,
        name: '0'
      },
      {
        id: 1,
        name: '1'
      },
      {
        id: 2,
        name: '2'
      },
      {
        id: 3,
        name: '3'
      },
      {
        id: 4,
        name: '4'
      },
      {
        id: 5,
        name: '5'
      },
      {
        id: 6,
        name: '6'
      }
    ],
    conditionIndex: 0,
    partOwnerIndex: 0,
    propertyTypeIndex:0
  },
  conditionChange: function(e) {
    this.setData({
      conditionIndex: e.detail.value
    })
  },
  partOwnerChange: function(e) {
    this.setData({
      partOwnerIndex: e.detail.value
    })
  },
  propertyTypeChange: function(e) {
    this.setData({
      propertyTypeIndex: e.detail.value
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  formSubmit: function(e) {
     let formData=e.detail.value;
     if(!formData.area){
wx.showModal({
  title: '提示',
  showCancel:false,
  content: '请输入房屋面积！',
  success: function(res) {
    if (res.confirm) {
      wx.hideToast();
    }
  }
});
return false;
     }
     if(!formData.totalPrices){
wx.showModal({
  title: '提示',
  showCancel:false,
  content: '请输入房屋总价！',
  success: function(res) {
    if (res.confirm) {
      wx.hideToast();
    }
  }
});
return false;
     }
wx.navigateTo({
  url: '../result/result'
})
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
