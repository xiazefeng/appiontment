// pages/goods/order/order.js.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false
  },
  /**
   * 生成订单，同时调起微信支付下单。
   */
  handleSubmit: function() {
    const {
      currentGoods,
      loading
    } = this.data;
    if (!loading) {
      this.setData({
        loading: true,
      })
      wx.request({
        url: app.globalData.baseUrl + '/main/order',
        method: "POST",
        data: {
          goodsId: currentGoods.goodsId,
          openId: wx.getStorageSync("userOpenId"),
          sysId: app.globalData.sysId,
          detail: currentGoods.goodsName
        },
        success: res => {
          console.info(res);
          // if (!res.data.package){
          this.setData({
            loading: false,
          })
          wx.showToast({
            title: '调起微信支付失败',
            image: '/images/cancle.png'
          })
          return;
          // }
          //发起微信支付
          wx.requestPayment({
            'timeStamp': res.data.timeStamp,
            'nonceStr': res.data.nonceStr,
            'package': res.data.packageStr,
            'signType': 'MD5',
            'paySign': res.data.paySign,
            success: res => {
              this.setData({
                loading: false,
              })
              console.info(res)
              //支付成功 
            },
            fail: res => {
              this.setData({
                loading: false,
              })
              console.info(res)
            },
            complete: res => {
              this.setData({
                loading: false,
              })
              console.info(res)
            }
          })
        },
        fail: e => {
          this.setData({
            loading: false,
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let currentGoods = JSON.parse(wx.getStorageSync('currentGoods'));
    this.setData({
      currentGoods
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})