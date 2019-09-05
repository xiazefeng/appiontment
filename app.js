//app.js
App({
  onLaunch: function () {
    // 全局数据
    this.globalData$ = Object.assign({}, this.globalData);
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              this.wxLoginRequest();

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    //获得系统信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  wxLoginRequest:function(){
    if (!this.globalData.userInfo) {
      this.globalData.loginStatus = false;
      return;
    }else{
      this.globalData.loginStatus = true;
    }
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: this.globalData.baseUrl + '/auth/code',
          data: { ...res, sysId: this.globalData.sysId, ...this.globalData.userInfo},
          method: 'POST',
          success: res => {
           
            if (res.data.openId) {
              wx.setStorageSync('userOpenId', res.data.openId);
              wx.setStorageSync('userSessionKey', res.data.sessionKey);
              wx.setStorageSync('userUnionId', res.data.unionId);
            }
          },
          fail: e => {
            console.log(e);
          },
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    // baseUrl:"http://172.16.10.27:9000",
    baseUrl:"https://wx.autoinet.cn/mini",
    loginStatus:true,
    sysId:1,
    showLogin:false,
  },
  /** 监听函数的对象数组 */
  watchCallBack: {},

  /** 监听列表 */
  watchingKeys: [],
 
  /** 设置全局数据 */
  setGlobalData: function (obj) {
    Object.keys(obj).map(key => {
      this.globalData[key] = obj[key];
    });
  },

  /** watch函数 */
  watch$(key, cb) {
    this.watchCallBack = Object.assign({}, this.watchCallBack, {
      [key]: this.watchCallBack[key] || []
    });
    this.watchCallBack[key].push(cb);
    if (!this.watchingKeys.find(x => x === key)) {
      const that = this;
      this.watchingKeys.push(key);
      Object.defineProperty(this.globalData, key, {
        configurable: true,
        enumerable: true,
        set: function (val) {
          const old = that.globalData$[key];
          that.globalData$[key] = val;
          that.watchCallBack[key].map(func => func(val, old));
        },
        get: function () {
          return that.globalData$[key];
        }
      });
    }
  },
})