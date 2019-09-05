// pages/goods/home/home.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nodes:'',
    modalVisible:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.watch$("showLogin", (val, old) => {
        this.setData({
          modalVisible: !!val
        })
    });

    let currentGoods = JSON.parse(wx.getStorageSync('currentGoods'));
    this.setData({
      currentGoods
    });
  },
  closeLoginModal:function(){
    app.setGlobalData({
      showLogin: false
    })
  },
  /**
   * 立即购买
   */
  handleBuy:function(){
    if (!app.globalData.loginStatus){
      app.setGlobalData({
        showLogin:true
      })
    }else{
      //已经登录，跳转到支付页面
      wx.navigateTo({
        url: '../order/order'
      })
    }
  },
  getUserInfo: function (e) {
    if (e && e.detail.errMsg == 'getUserInfo:ok') {
      this.closeLoginModal();
      app.wxLoginRequest();
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        modalVisible:false
      })
    }
  },
  toDetailPage:function(){
    wx.navigateTo({
      url: '../detail/detail'
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

  }
})