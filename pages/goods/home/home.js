// pages/goods/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nodes:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let currentGoods = JSON.parse(wx.getStorageSync('currentGoods'));
    this.setData({
      currentGoods
    });
  },
  /**
   * 立即购买
   */
  handleBuy:function(){
    wx.showToast({
      title:"支付成功",
      icon: 'success',
      duration: 2000,
    })
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