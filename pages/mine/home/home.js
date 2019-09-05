// pages/mine/home/home.js
const app = getApp();
const constants = require('../../../utils/constants.js');
const util = require('../../../utils/util.js');
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 页面的初始数据
   */
  data: {
    modalVisible: false,
    showLogin: true,
    TabCur: 'usable',
    constants: constants,
    util: util,
    TabCurNum: "A",
    userInfo: {},
    imageURL: "http://img11.360buyimg.com/n1/s350x449_jfs/t18340/22/1753887107/268218/a2eab8a/5ad704a0N1da46666.jpg%21cc_350x449.jpg",
    transitionName: "slide-right",
    A: {
      current: 1,
      pageSize: 10,
      total: 0,
      isFrist: true,
    },
    B: {
      current: 1,
      pageSize: 10,
      total: 0,
      isFrist: true,
    },
    C: {
      current: 1,
      pageSize: 10,
      total: 0,
      isFrist: true,
    },
    D: {
      current: 1,
      pageSize: 10,
      total: 0,
      isFrist: true,
    }
  },

  properties: {
    action: {
      type: String,
      value: '',
    },
    defaultTabCur: {
      type: String,
      value: '',
    }
  },
  /**
   * 监听属性值的变化
   */

  observers: {
    'defaultTabCur': function(defaultTabCur) {
      if (defaultTabCur === "usable") {
        this.setData({
          TabCur: "usable",
          TabCurNum: "A",
          "A.isFrist": true,
          "B.isFirst": true,
          "C.isFirst": true,
          "D.isFirst": true,
        })
        // this.triggerEvent('reloadCenter')
      }
    },
    'action': function(action) {
      if (action === "refreshDown") {
        console.log("子页面下拉刷新。。。");
        const {
          TabCurNum
        } = this.data;
        const key = TabCurNum + ".current";
        this.setData({
          loading: true,
          [key]: 1
        })
        this.initData();
      } else if (action === "refreshUp") {
        const {
          TabCurNum
        } = this.data;
        const {
          current,
          pageSize,
          total
        } = this.data[TabCurNum];
        const totalPage = total <= current * pageSize ? current : (parseInt(total / pageSize) + 1);
        const key = TabCurNum + ".current";
        //如果有分页，则加载，没有则直接提示无
        if (current < totalPage) {
          this.setData({
            [key]: current + 1,
            loading: true,
            loadingText: "正在加载中"
          })
          console.log("子页面上拉加载。。。")
          this.initData();
        } else {
          this.setData({
            loading: false,
            loadingText: "已全部加载完毕"
          })
          console.log("已全部加载完毕。。。")
        }
      } else {
        this.setData({
          loading: false,
          loadingText: "已全部加载完毕"
        })
      }
    },
  },
  methods: {
    initData: function() {
      const openId = wx.getStorageSync("userOpenId");
      const {
        TabCur,
        TabCurNum
      } = this.data;
      // setTimeout(
      //   () => {
      //     this.triggerEvent('loadFinish')
      //     this.setData({
      //       loading: false,
      //       loadingText: ""
      //     })
      //   }, 500)
      wx.request({
        url: TabCur !== 'all' ? app.globalData.baseUrl + '/center/goods/' + TabCur : app.globalData.baseUrl + '/center/order',
        method: 'POST',
        data: {
          sysId: app.globalData.sysId,
          openId: openId,
          pagination: {
            current: this.data[TabCurNum].current,
            pageSize: this.data[TabCurNum].pageSize
          }
        },
        success: res => {
          const {
            TabCurNum
          } = this.data;
          if (this.properties.action === "refreshDown") {
            this.triggerEvent('loadFinish')
            if (res.data.clientGoodsVOList && res.data.clientGoodsVOList.length > 0) {
              this.setData({
                loading: false,
                loadingText: "",
                [TabCurNum]: {
                  ...res.data.pagination,
                  orderList: res.data.clientGoodsVOList,
                  isFrist: false,
                }
              })
            } else if (res.data.orderDTOList && res.data.orderDTOList.length > 0) {
              this.setData({
                loading: false,
                loadingText: "",
                [TabCurNum]: {
                  ...res.data.pagination,
                  orderList: res.data.orderDTOList,
                  isFrist: false,
                }
              })
            } else {
              this.setData({
                loading: false,
                loadingText: "",
                [TabCurNum]: {
                  ...this.data[TabCurNum],
                  orderList: [],
                  isFrist: false,
                }
              })
            }
          } else if (this.properties.action === "refreshUp") {
            //合并数据
            let {
              orderList
            } = this.data[TabCurNum];
            if (res.data.clientGoodsVOList && res.data.clientGoodsVOList.length > 0) {
              res.data.clientGoodsVOList.map(item => {
                orderList.push(item);
              })
            } else if (res.data.orderDTOList && res.data.orderDTOList.length > 0) {
              res.data.orderDTOList.map(item => {
                orderList.push(item);
              })
            }

            const key = TabCurNum + ".orderList";
            this.setData({
              loading: false,
              loadingText: "",
              [key]: orderList
            })
          }
        },
      })
    },
    tabSelect(e) {
      const {
        TabCurNum
      } = this.data;
      var transitionName;
      const newNum = e.currentTarget.dataset.num;
      if (TabCurNum < newNum) {
        transitionName = "slide-right";
      } else {
        transitionName = "slide-left";
      }
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        TabCurNum: newNum,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
        transitionName
      })
      if (this.data[newNum].isFrist) {
        const key = newNum + ".current";
        this.setData({
          [key]: 1,
          action: "refreshDown"
        })
      }
    },
    //跳转到预约界面
    toAppointment(e) {
      const id = e.currentTarget.dataset.id;
      const appointId = e.currentTarget.dataset.aid;
      if (appointId) {
        wx.navigateTo({
          url: '/pages/mine/appointment/index?clientGoodsId=' + id + '&appointId=' + appointId,
        })
      } else {
        wx.navigateTo({
          url: '/pages/mine/appointment/index?clientGoodsId=' + id,
        })
      }
    },
    getPhoneNumber: function(e) {
      const openId = wx.getStorageSync("userOpenId");
      wx.request({
        url: app.globalData.baseUrl + '/auth/phone',
        method: 'POST',
        data: {
          sysId: app.globalData.sysId,
          openId,
          ...e.detail,
        },
        success: res => {
          if (res && res.data.phoneNumber) {
            wx.setStorageSync("userPhone", res.data.phoneNumber);
            this.setData({
              userPhone: res.data.phoneNumber
            })
            const id = e.currentTarget.dataset.id;
            console.log(id)
            wx.navigateTo({
              url: '/pages/mine/appointment/index?clientGoodsId=' + id,
            })
          }
        }
      })
    },
    showLoginModal: function() {
      this.setData({
        modalVisible: true
      })
    },
    closeLoginModal: function() {
      this.setData({
        modalVisible: false
      })
    },
    getUserInfo: function(e) {
      if (e && e.detail.errMsg == 'getUserInfo:ok') {
        this.closeLoginModal();
        app.wxLoginRequest();
        app.globalData.userInfo = e.detail.userInfo
        if (e.detail.userInfo){
          this.setData({
            userInfo: e.detail.userInfo,
            showLogin:false,
          })
        }
      }
    },
  },
  attached: function() {
    if (!app.globalData.loginStatus) {
      this.setData({
        showLogin: true,
      })
    } else {
      this.setData({
        showLogin: false
      })
    }
    const userPhone = wx.getStorageSync('userPhone');
    this.setData({
      userInfo: app.globalData.userInfo,
      userPhone
    })

    this.setData({
      action: "refreshDown"
    });
  }
})