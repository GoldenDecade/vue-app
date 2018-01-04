<template>
  <footer id="footer" class="border-1px">{{title}}</footer>
</template>
<style rel="stylesheet" lang="stylus">
  @import "../../style/common.styl"
  #footer
    position fixed
    left 0
    bottom 0
    box-sizing border-box
    width: 100%
    height: .48rem
    line-height .48rem
    font-size .18rem
    color #222
    text-align center
    &::before
      display: block
      position: absolute
      left: 0
      top: 0
      width: 100%
      border-top: 1px solid #c8c8c8
      content: ' '
</style>
<script type="text/ecmascript-6">
  export default {
    props: ['title']
  }
</script>
