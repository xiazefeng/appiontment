// pages/appointment/home/home.js
Component({
  options: {
    addGlobalClass: true,
  },
  properties:{
    cardList: {
      type:Array,
      value: [{
        cover: 'http://img11.360buyimg.com/n1/s350x449_jfs/t18340/22/1753887107/268218/a2eab8a/5ad704a0N1da46666.jpg%21cc_350x449.jpg',
        title: '良品铺子1',
        price: '122',
        saleNum: 111,
        tags: [{ tagName: '好吃', tagId: 1, color: 'cyan', }, { tagName: '看得见', tagId: 2, color: 'blue', }, { tagName: '绝', tagId: 3, color: 'purple' }]
      },
      {
        cover: 'http://img11.360buyimg.com/n1/s350x449_jfs/t18340/22/1753887107/268218/a2eab8a/5ad704a0N1da46666.jpg%21cc_350x449.jpg',
        title: '良品铺子2',
        price: '142',
        color: 'purple',
        saleNum: 112,
        tags: [{ tagName: '好吃', tagId: 1, color: 'cyan', }, { tagName: '看得见', tagId: 2, color: 'blue', }, { tagName: '绝', tagId: 3, color: 'purple' }]
      },
      {
        cover: 'http://img11.360buyimg.com/n1/s350x449_jfs/t18340/22/1753887107/268218/a2eab8a/5ad704a0N1da46666.jpg%21cc_350x449.jpg',
        title: '良品铺子3',
        price: '152',
        color: 'blue',
        saleNum: 113,
        tags: [{ tagName: '好吃', tagId: 1, color: 'cyan', }, { tagName: '看得见', tagId: 2, color: 'blue', }, { tagName: '绝', tagId: 3, color: 'purple' }]
      },
      {
        cover: 'http://img11.360buyimg.com/n1/s350x449_jfs/t18340/22/1753887107/268218/a2eab8a/5ad704a0N1da46666.jpg%21cc_350x449.jpg',
        title: '良品铺子34',
        price: '1523',
        color: 'blue',
        saleNum: 1133,
        tags: [{ tagName: '好吃', tagId: 1, color: 'cyan', }, { tagName: '看得见', tagId: 2, color: 'blue', }, { tagName: '绝', tagId: 3, color: 'purple' }]
      },
      {
        cover: 'http://img11.360buyimg.com/n1/s350x449_jfs/t18340/22/1753887107/268218/a2eab8a/5ad704a0N1da46666.jpg%21cc_350x449.jpg',
        title: '良品铺子35',
        price: '1552',
        color: 'blue',
        saleNum: 1313,
        tags: [{ tagName: '好吃1', tagId: 1, color: 'cyan', }, { tagName: '看得见', tagId: 2, color: 'blue', }, { tagName: '绝', tagId: 3, color: 'purple' }]
      },
      ],
      myCurrent:{
        type:String,
        value:""
      }
    },
  },
  /**
   * 页面的初始数据
   */
  data: {
    isCard:'no-card',
    current:1,
    pageSize: 30,
    
    searchTxt: "",
    picker: [{ tagName: '好吃', tagId: 1, color: 'cyan', }, { tagName: '看得见', tagId: 2, color: 'blue', }, { tagName: '绝', tagId: 3, color: 'purple' }],
    tagId:'',
    index:'',
  },
  
  methods:{
    /**
   * 查询列表数据
   */
    fetchList: function () {
      var that = this;
      this.data;
      this.triggerEvent('fetchList', this.data)
    },
    /**
   * 获取搜索内容
   */
    getSearchTxt: function (e) {
      this.setData({
        searchTxt: e.detail.value
      })
      console.log('搜索框里面的值' + e.detail.value);
    },
    /**
     * 搜索list
     */
    searchSubmit: function (options) {
      var that = this;
      var searchTxt = that.data.searchTxt;

      this.fetchList();
    },
    /**
     * 标签选择
     */
    PickerChange: function (e) {
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
    PickerCancel: function () {
      this.setData({
        index: '',
        tagId: '',
        current: 1,
      })
      this.fetchList();
    },
  },
  
  attached:function(){
    console.log("attached");
    const { myCurrent} = this.data;
    console.log(myCurrent)
    this.fetchList();
  }
  
})