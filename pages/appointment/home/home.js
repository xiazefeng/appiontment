// pages/appointment/home/home.js
const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    action: {
      type: String,
      value: '',
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    isCard: 'no-card',
    current: 1,
    pageSize: 30,
    cardList: [{
        cover: 'http://img11.360buyimg.com/n1/s350x449_jfs/t18340/22/1753887107/268218/a2eab8a/5ad704a0N1da46666.jpg%21cc_350x449.jpg',
        title: '良品铺子1',
        price: '122',
        saleNum: 111,
      goodsInfo: '<div><h3>javascript - <em>js同步编程</em>与异步编程的区别,异步有哪些优点,为什么...</h3><div><span>2016年5月20日 - </span>从编程方式来讲当然是<em>同步编程</em>的方式更为简单,但是同步有其局限性一是假如是单线程那么一旦遇到阻塞调用,会造成整个线程阻塞,导致cpu无法得到有效利用...</div><div><div></div><span ><span ></span></span> - 百度快照</div><div ><span>为您推荐：</span>js同步和异步ajax异步和同步的区别</div></div>',
        tags: [{
          tagName: '好吃',
          tagId: 1,
          color: 'cyan',
        }, {
          tagName: '看得见',
          tagId: 2,
          color: 'blue',
        }, {
          tagName: '绝',
          tagId: 3,
          color: 'purple'
        }]
      },
      {
        cover: 'http://img11.360buyimg.com/n1/s350x449_jfs/t18340/22/1753887107/268218/a2eab8a/5ad704a0N1da46666.jpg%21cc_350x449.jpg',
        title: '良品铺子2',
        price: '142',
        color: 'purple',
        saleNum: 112,
        tags: [{
          tagName: '好吃',
          tagId: 1,
          color: 'cyan',
        }, {
          tagName: '看得见',
          tagId: 2,
          color: 'blue',
        }, {
          tagName: '绝',
          tagId: 3,
          color: 'purple'
        }]
      },
      {
        cover: 'http://img11.360buyimg.com/n1/s350x449_jfs/t18340/22/1753887107/268218/a2eab8a/5ad704a0N1da46666.jpg%21cc_350x449.jpg',
        title: '良品铺子3',
        price: '152',
        color: 'blue',
        saleNum: 113,
        tags: [{
          tagName: '好吃',
          tagId: 1,
          color: 'cyan',
        }, {
          tagName: '看得见',
          tagId: 2,
          color: 'blue',
        }, {
          tagName: '绝',
          tagId: 3,
          color: 'purple'
        }]
      },
      {
        cover: 'http://img11.360buyimg.com/n1/s350x449_jfs/t18340/22/1753887107/268218/a2eab8a/5ad704a0N1da46666.jpg%21cc_350x449.jpg',
        title: '良品铺子34',
        price: '1523',
        color: 'blue',
        saleNum: 1133,
        tags: [{
          tagName: '好吃',
          tagId: 1,
          color: 'cyan',
        }, {
          tagName: '看得见',
          tagId: 2,
          color: 'blue',
        }, {
          tagName: '绝',
          tagId: 3,
          color: 'purple'
        }]
      },
      {
        cover: 'http://img11.360buyimg.com/n1/s350x449_jfs/t18340/22/1753887107/268218/a2eab8a/5ad704a0N1da46666.jpg%21cc_350x449.jpg',
        title: '良品铺子35',
        price: '1552',
        color: 'blue',
        saleNum: 1313,
        tags: [{
          tagName: '好吃1',
          tagId: 1,
          color: 'cyan',
        }, {
          tagName: '看得见',
          tagId: 2,
          color: 'blue',
        }, {
          tagName: '绝',
          tagId: 3,
          color: 'purple'
        }]
      },
      {
        cover: 'http://img11.360buyimg.com/n1/s350x449_jfs/t18340/22/1753887107/268218/a2eab8a/5ad704a0N1da46666.jpg%21cc_350x449.jpg',
        title: '良品铺子35',
        price: '1552',
        color: 'blue',
        saleNum: 1313,
        tags: [{
          tagName: '好吃1',
          tagId: 1,
          color: 'cyan',
        }, {
          tagName: '看得见',
          tagId: 2,
          color: 'blue',
        }, {
          tagName: '绝',
          tagId: 3,
          color: 'purple'
        }]
      }, {
        cover: 'http://img11.360buyimg.com/n1/s350x449_jfs/t18340/22/1753887107/268218/a2eab8a/5ad704a0N1da46666.jpg%21cc_350x449.jpg',
        title: '良品铺子35',
        price: '1552',
        color: 'blue',
        saleNum: 1313,
        tags: [{
          tagName: '好吃1',
          tagId: 1,
          color: 'cyan',
        }, {
          tagName: '看得见',
          tagId: 2,
          color: 'blue',
        }, {
          tagName: '绝',
          tagId: 3,
          color: 'purple'
        }]
      }, {
        cover: 'http://img11.360buyimg.com/n1/s350x449_jfs/t18340/22/1753887107/268218/a2eab8a/5ad704a0N1da46666.jpg%21cc_350x449.jpg',
        title: '良品铺子35',
        price: '1552',
        color: 'blue',
        saleNum: 1313,
        tags: [{
          tagName: '好吃1',
          tagId: 1,
          color: 'cyan',
        }, {
          tagName: '看得见',
          tagId: 2,
          color: 'blue',
        }, {
          tagName: '绝',
          tagId: 3,
          color: 'purple'
        }]
      }
    ],
    searchTxt: "",
    picker: [{
      tagName: '好吃',
      tagId: 1,
      color: 'cyan',
    }, {
      tagName: '看得见',
      tagId: 2,
      color: 'blue',
    }, {
      tagName: '绝',
      tagId: 3,
      color: 'purple'
    }],
    tagId: '',
    index: '',
    animation:""
  },

  /**
   * 监听属性值的变化
   */

  observers: {
    'action': function(action) {
      if (action === "refreshDown") {
        console.log("子页面下拉刷新。。。");
        this.setData({
          loading:true,
          animation:"fade"
        })
        this.fetchList();
      } else if (action === "refreshUp") {
        console.log("子页面上拉加载。。。")
        this.fetchList();
      }
    },
  },


  methods: {
    /**
     * 查询列表数据
     */
    fetchList: function() {
      console.log("加载中。。。");
      var that = this;
      this.data;
      setTimeout(
        () => {
          this.triggerEvent('loadFinish')
          this.setData({
            loading: false
          })
          that.setData({
            animation: ''
          });
        }, 500)
    },
    /**
     * 获取搜索内容
     */
    getSearchTxt: function(e) {
      this.setData({
        searchTxt: e.detail.value
      })
      console.log('搜索框里面的值' + e.detail.value);
    },
    /**
     * 搜索list
     */
    searchSubmit: function(options) {
      var that = this;
      var searchTxt = that.data.searchTxt;
      this.fetchList();
    },
    /**
     * 标签选择
     */
    PickerChange: function(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      var index = e.detail.value;
      var picker = this.data.picker;
      this.setData({
        index: index,
        tagId: picker[index].tagId,
        current: 1,
      })
      this.fetchList();
    },
    /**
     * 取消选择
     */
    PickerCancel: function() {
      this.setData({
        index: '',
        tagId: '',
        current: 1,
      })
      this.fetchList();
    },
  },

  attached: function() {
    console.log("attached");
    const {
      myCurrent
    } = this.data;
    console.log(myCurrent)
    this.fetchList();
  }

})