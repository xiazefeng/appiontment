// pages/component/card/card.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    isCard:{
      type:String,
      value:''
    },
    info:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toItemPage:function(e){
      wx.setStorageSync('currentGoods', JSON.stringify(e.currentTarget.dataset.goods));
      wx.navigateTo({
        url: '../../pages/goods/home/home'
      })
    }
  }
})
