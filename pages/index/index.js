//index.js
//获取应用实例
/**
 * 思路：每次请求，拿两页的数据，当前页 和 下一页，
 * 当上拉加载的时候：1.不是加载状态，直接拼接下一页数据。
 *                  2.数据等于pageSize并且loading状态为false时 去发送请求再去加载 下一次数据，。
 *                  3:如果数据为空或者小于pageSize，则置为不可继续加载状态。
 */
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    PageCur: 'basics',
    action: 'stop',
    needLogin: false, //是否需要登录
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
    wx.setNavigationBarTitle({
      title: e.currentTarget.dataset.cur === "basics" ? '预约' : '我的'
    })

  },
  onShow: function() {
    wx.setNavigationBarTitle({
      title: this.data.PageCur === "basics" ? '预约' : '我的'
    })
  },
  onLoad: function() {
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
        },
        fail: res => {
          this.setData({
            needLogin: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      needLogin: false,
    })
  },
  onPullDownRefresh: function() {
    console.log("下拉");
    if (this.data.needLogin) {
      wx.stopPullDownRefresh();
      return;
    }
    this.setData({
      action: "refreshDown"
    });
  },
  onReachBottom: function() {
    console.log("上拉");
    if (this.data.needLogin) {
      return;
    }
    this.setData({
      action: "refreshUp"
    });
  },
  /**
   * 结束加载
   */
  loadFinish: function() {
    console.log("loadFinish");
    this.setData({
      action: "stop"
    });
    wx.stopPullDownRefresh();
  }
})