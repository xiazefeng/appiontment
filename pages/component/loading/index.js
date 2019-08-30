// pages/component/loading/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    loading:{
      type:Boolean,
      value:false,
    },
    type:{
      type:String,
      value:'circular',
    },
    size:{
      type:String,
      value:'30px'
    },
    title:{
      type:String,
      value:'',
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

  }
})
