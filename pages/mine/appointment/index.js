// pages/mine/appointment/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    maxDate: new Date().getTime() + 3600 * 1000 * 24 * 7,
    show: false,
    currentDate_show: '',
    showCodeCell:false,
    errorMessage:'',
    userPhone:'',
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const curr = this.dateFormat(new Date(), 'yyyy-MM-dd');
    const userPhone = wx.getStorageSync('userPhone');
    if (userPhone){
      this.setData({
        userPhone
      })
    }
    this.setData({
      currentDate_show: curr,
      ...options
    });
    this.fetchList();
  },
  /**
   * 获取商品预约列表
   */
  fetchList: function() {
    const {
      currentDate_show
    } = this.data;
    wx.request({
      url: app.globalData.baseUrl + '/center/appoint/list',
      method: 'POST',
      data: {
        sysId: app.globalData.sysId,
        appointDay: currentDate_show.replace(/-/g, ""),
      },
      success: res => {
        this.setData({
          appointList: res.data.appointResult
        })
      },
    })
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

  },
  activeChoose: function(e) {
    console.log(e);
    if (e.currentTarget.dataset.num > 0) {
      this.setData({
        active: e.currentTarget.dataset.key
      })
    }
  },
  showTime: function() {
    this.setData({
      show: true
    })
  },
  onClose: function() {
    this.setData({
      show: false
    });
  },
  chooseTime: function(e) {
    this.setData({
      currentDate: e.detail,
      currentDate_show: this.dateFormat(new Date(e.detail), 'yyyy-MM-dd')
    })
    this.fetchList();
    this.onClose();
  },
  phoneChange: function (e){
    if (this.isPoneAvailable(e.detail)){
      const userPhone = wx.getStorageSync("userPhone");
      //如果号码不是绑定的号码，则弹出验证码
      if(userPhone != e.detail){
        this.setData({
          showCodeCell:true,
          errorMessage:''
        })
      }else{
        this.setData({
          showCodeCell: false,
          errorMessage: ''
        })
      }
    }else{
      this.setData({
        showCodeCell:false,
        errorMessage:'手机号码格式错误' 
      })
    }
  },

  isPoneAvailable: function (value) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(value)) {
      return false;
    } else {
      return true;
    }
  },
  dateFormat: function(Date, fmt) {
    var o = {
      "M+": Date.getMonth() + 1, //月份 
      "d+": Date.getDate(), //日 
      "H+": Date.getHours(), //小时 
      "m+": Date.getMinutes(), //分 
      "s+": Date.getSeconds(), //秒 
      "q+": Math.floor((Date.getMonth() + 3) / 3),
      "S": Date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (Date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },
  appointSubmit: function() {

    var that = this;

    const {
      clientGoodsId,
      orderId,
      active,
      currentDate_show,
      appointId,
    } = this.data;
    const openId = wx.getStorageSync("userOpenId");
    const sysId = app.globalData.sysId;
    wx.request({
      url: app.globalData.baseUrl + '/center/appoint',
      method: 'POST',
      data: {
        clientGoodsId: clientGoodsId,
        startIndex: active,
        openId: openId,
        sysId: sysId,
        appointDay: currentDate_show.replace(/-/g, ""),
        appointId
      },
      success: res => {
        if (res.data.retCode == "success") {
          wx.showToast({
            title: res.data.retMsg,
            icon: 'success',
            success: () => {
              var pages = getCurrentPages();
              var prevPage = pages[pages.length - 2]; //上一页
              prevPage.setData({
                "A.isFrist": true,
                "B.isFrist": true
              })
              wx.navigateBack();
            }
          });
          //

        } else {
          wx.showToast({
            title: res.data.retMsg,
            image: '/images/cancle.png'
          })
        }
      },
    })
  }

})