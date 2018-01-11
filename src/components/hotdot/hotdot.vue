<template>
  <div id="hotdot">
    <header-top title="无线热点模式"></header-top>
    <section class="content">
      <section class="content_wrapper">
        <section class="bg"></section>
        <section class="des">
          <p>1.进入手机系统的设置页面,搜索并连接Wi-Fi(LenovoSmartxxxx-xxxx)后返回智慧联想APP</p>
          <p>2.待网络连接稳定后点击"下一步"</p>
        </section>
        <section class="wifi">
          <p class="wifi_name">当前连接的Wi-Fi网络{{wifiName}}</p>
          <p class="wifi_confirm">
            <span @click="isOk">
              <span class="box"><span class="ok" v-show="ok"></span></span>
              <span class="wifi_confirm_word">已完成以上步骤</span>
            </span>
          </p>
        </section>
      </section>
    </section>

    <section class="modal" v-show="isShowModal">
      <section class="warning">
        <p class="modal_info">{{warning_info}}</p>
        <p class="modal_bottom border-1px" @click="hideModal">我知道了</p>
      </section>
    </section>



    <div @click='nextAction'>
      <foot title="下一步"></foot>
    </div>
  </div>
</template>
<style rel="stylesheet" lang="stylus">
  @import "../../style/common.styl"
  #hotdot
    width: 100%
    height: 100%
    .content
      padding-top .64rem
      width: 100%
      .content_wrapper
        position relative
        .bg
          margin .52rem auto .42rem auto
          width: 2.125rem
          height: 1.975rem
          background url('./img/1.png') no-repeat center center
          background-size: cover
        .des
          box-sizing border-box
          padding 0 .45rem
          width: 100%
          p
            line-height .14rem
            font-size .12rem
            color #666
            word-wrap break-word
        .wifi
          position absolute
          left 0
          top 4.25rem
          width: 100%
          .wifi_name
            matgin-bottom .21rem
            font-size .12rem
            color #666
            text-align center
          .wifi_confirm
            position relative
            font-size 0
            text-align center
            .box
              position relative
              display inline-block
              margin-right .1rem
              width: .3rem
              height: .3rem
              bg-img('box')
              vertical-align middle
              .ok
                position absolute
                left 0
                top 0
                width: .3rem
                height: .3rem
                bg-img('ok')

            .wifi_confirm_word
              font-size .12rem
              color #666
              vertical-align middle
    .modal
      position fixed
      left 0
      right 0
      top 0
      bottom 0
      background-color: rgba(0, 0, 0, 0.28)
      .warning
        position absolute
        top 2.45rem
        left .52rem
        width: 2.71rem
        height: 1.76rem
        border-radius .14rem
        background-color: #fff
        text-align center
        p.modal_info
          padding 0.6rem .4rem 0 .4rem
          font-size .15rem
        p.modal_bottom
          box-sizing border-box
          position absolute
          left 0
          bottom 0
          width: 100%
          height .45rem
          font-size .15rem
          line-height .45rem
          color #2ea0f7
          text-align center
          &::after
            display block
            position absolute
            left 0
            top 0
            width: 100%
            border-top 1px solid #c8c8c8
            content ''
</style>
<script type="text/ecmascript-6">
  import headerTop from '../common/headtop.vue'
  import foot from '../common/foot.vue'
  export default {
    data(){
      return {
        wifiName: '',
        ok: false,
        isShowModal: false,
        warning_info: '请确认已完成以上步骤',
        timeout: null
      }
    },
    created(){
      this.wifiName = localStorage.getItem('wifiName')
      this.$store.state.goNative = false
    },
    mounted() {
    },
    beforeDestroy() {
      clearTimeout(this.timeout )
    },
    methods: {
      nextAction(){
        if(this.ok){
          this.$router.push('/process')
        }else {
          this.isShowModal = true
        }
      },
      isOk(){
        this.ok = !this.ok
      },
      hideModal(){
        this.isShowModal = !this.isShowModal
      }
    },
    components: {
      headerTop, foot
    }
  }
</script>

