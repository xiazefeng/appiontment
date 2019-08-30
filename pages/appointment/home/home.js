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
    pageSize: 10,
    total: 0,
    cardList: [],
    searchTxt: "",
    tagList: [],
    tagId: '',
    index: '',
  },

  /**
   * 监听属性值的变化
   */

  observers: {
    'action': function(action) {
      if (action === "refreshDown") {
        console.log("子页面下拉刷新。。。");
        this.setData({
          loading: true,
          topText: "正在加载",
          current: 1,
        })
        this.fetchList();
      } else if (action === "refreshUp") {
        const {
          current,
          pageSize,
          total
        } = this.data;
        const totalPage = total <= current * pageSize ? current : (parseInt(total / pageSize) + 1);
        // 如果有分页，则加载，没有则直接提示无
        if (current < totalPage) {
          this.setData({
            current: current+1,
            loading: true,
            loadingText: "正在加载中"
          })
          console.log("子页面上拉加载。。。")
          this.fetchList();
        } else {
          this.setData({
            loading: false,
            loadingText: "已全部加载完毕"
          })
          console.log("已全部加载完毕。。。")
        }
      } else if (action === "stop"){
        setTimeout(()=>{
          this.setData({
            loading: false,
            topText:"",
            loadingText: "已全部加载完毕"
          })
        },500)
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
      // setTimeout(
      //   () => {
      //     this.triggerEvent('loadFinish')
      //     this.setData({
      //       loading: false,
      //       loadingText: ""
      //     })
      //   }, 500)
      var searchTxt = this.data.searchTxt;
      var tagId = this.data.tagId;
      wx.request({
        url: searchTxt || tagId ? app.globalData.baseUrl + '/main/goods/search' : app.globalData.baseUrl + '/main/goods/default',
        method: 'POST',
        data: {
          searchKey: searchTxt,
          tagId: tagId,
          sysId: app.globalData.sysId,
          pagination: {
            current: this.data.current,
            pageSize: this.data.pageSize
          }
        },
        success: res => {
          const {
            TabCurNum
          } = this.data;
          if (this.properties.action === "refreshDown" || this.properties.action === "stop") {
            
            if (res.data.goodsDTOList && res.data.goodsDTOList.length > 0) {
              this.setData({
                loading: false,
                topText: "已刷新",
                ...res.data.pagination,
                cardList: res.data.goodsDTOList,
              })
            } else {
              this.setData({
                loading: false,
                topText: "暂无更多",
                cardList:[]
              })
            }
            this.triggerEvent('loadFinish');
          } else if (this.properties.action === "refreshUp"){
            //合并数据
            let {cardList } = this.data;
            if (res.data.goodsDTOList){
              res.data.goodsDTOList.map(item=>{
                cardList.push(item);
              })
            }
            this.setData({
              loading: false,
              loadingText: "加载完成",
              cardList: cardList
            })
          }
        },
        fail: e => {
          console.log("加载失败：" + e);
          this.triggerEvent('loadFinish')
          this.setData({
            loading: false,
            loadingText: "加载失败："
          })
        },
      })

    },
    fetchTagList: function() {
      wx.request({
        url: app.globalData.baseUrl + '/main/tags',
        method: 'POST',
        data: {
          sysId: app.globalData.sysId
        },
        success: res => {
          this.setData({
            tagList: res.data
          })
        },
      })
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
      console.log('picker发送选择改变，携带值为', e)
      const id = e.currentTarget.dataset.id ? e.currentTarget.dataset.id : '';
      const oldId = this.data.tagId;
      if(id != oldId){
        this.setData({
          tagId: id,
          current: 1,
          action:"refreshDown"
        })
      }else if(id === oldId){
        this.setData({
          tagId: '',
          current: 1,
          action: "refreshDown"
        })
      }
      // var index = e.detail.value;
      // var tagList = this.data.tagList;
      // this.setData({
      //   index: index,
      //   tagId: tagList[index].tagId,
      //   current: 1,
      //   action:"refreshDown"
      // })
    },
    /**
     * 取消选择
     */
    PickerCancel: function() {
      this.setData({
        index: '',
        tagId: '',
        current: 1,
        action: "refreshDown"
      })
      // this.fetchList();
    },
  },

  attached: function() {
    const {} = this.data;
    this.fetchList();
    this.fetchTagList();
  }

})