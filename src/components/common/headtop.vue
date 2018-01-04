<template>
  <header id="headtop" class="boder-1px">
    <span id="back" @click="back"><svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-arrow-left"></use>
</svg></span>
    <span id="title">{{title}}</span>
  </header>
</template>
<style rel="stylesheet" lang="stylus">
  @import '../../style/common.styl'
  @import '../../font/iconfont.css'
  #headtop
    position fixed
    left 0
    top 0
    box-sizing border-box
    padding-top .2rem
    width: 100%
    height: .64rem
    &::after
      display block
      position absolute
      left 0
      bottom 0
      width: 100%
      border-bottom 1px solid #828282
      content ''
    #back
      position absolute
      left 0
      bottom 0
      padding 0 .05rem .12rem .05rem
      width: .2rem
      height: .2rem
      .icon
        width: 100%
        height: 100%
    #title
      position absolute
      left .42rem
      right .42rem
      bottom .12rem
      width: 2.91rem
      height: .2rem
      line-height .2rem
      font-size .18rem
      color #222
      text-align center
</style>
<script type="text/ecmascript-6">
  import '@/font/iconfont.js'
  export default {
    props: ['title'],
    methods: {
      back(){
        if(this.$store.state.goNative){
        //  返回到native
        //   LenSmJs.HtmlJumpApp_h5('list')
          alert('native')
        }else {
          console.log(this.$router.goBack);
          this.$router.goBack()
        }
      }
    }
  }
</script>
