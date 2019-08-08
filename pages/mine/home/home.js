// pages/mine/home/home.js
const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 页面的初始数据
   */
  data: {
    TabCur:0,
    userInfo: {},
  },

  properties: {
    action: {
      type: String,
      value: '',
    }
  },
  observers: {
    'action': function (action) {
      if (action === "refreshDown") {
        console.log("子页面下拉刷新。。。");
        this.initData();
      } 
    },
  },
  methods:{
    initData:function(){
      console.log("initData");
      this.triggerEvent('loadFinish');
    },
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    }
  },
  attached:function(){
    this.setData({
      userInfo: app.globalData.userInfo
    })
  }
})