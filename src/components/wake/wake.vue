<template>
  <div id="wake">
    <header-top title="尝试与设备建立连接"></header-top>
    <section class="content">
      <section class="bg"></section>
      <section class="des">
        <p>1.请将设备接通电源；</p>
        <p>2.打开电源键；</p>
        <p>3.长按设备上的配对键3秒后点击下一步</p>
      </section>
    </section>
    <router-link tag="section" to="/join">
      <foot title="下一步"></foot>
    </router-link>
    <!--<div @click='nextAction'>
      <foot title="下一步"></foot>
    </div>-->

  </div>
</template>
<style rel="stylesheet" lang="stylus">
  #wake
    width: 100%
    height: 100%
    .content
      padding-top .64rem
      width: 100%
      .bg
        margin .52rem auto .42rem auto
        width: 2.1rem
        height: 1.96rem
        background: url("./img/wake1.png") no-repeat center center
        background-size 100% 100%
      .des
        margin-left 1.07rem
        font-size .12rem
        line-height .14rem
        color #666
</style>
<script type="text/ecmascript-6">
  import headerTop from '../common/headtop.vue'
  import foot from '../common/foot.vue'
  export default {
    created(){
      this.$store.state.goNative = false
    },
    methods: {
      /*nextAction(){
        this.$router.push('/join')
      }*/
    },
    components: {
      headerTop, foot
    }
  }
</script>
