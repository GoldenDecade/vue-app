<template>
  <div id="join">
    <header-top title="设备入网"></header-top>
    <section class="content">
      <section class="bg"></section>
      <section class="des">
        <p>请确保您的手机已连接Wi-Fi网络</p>
        <p>暂不支持5GHz网络，仅支持2.4GHz网络</p>
      </section>
      <section class="wifiname">
        <input  placeholder="请输入Wi-Fi名称" disabled v-model="wifiName" name="wifi" type="text" />
      </section>
      <section class="wifipsd">
        <input v-if="!isPsd" type="password"  placeholder="请输入Wi-Fi密码" v-model="wifiPsd"  name="psd"  />
        <input v-else type="text" placeholder="请输入Wi-Fi密码" v-model="wifiPsd"  name="psd"  />
        <span class="eye" :class="{open: isPsd}" @click="changeType"></span>
      </section>
      <p class="rempsd"><span @click="remberPsd"><span class="box"></span><span class="ok" v-show="remPsd"></span>记住密码</span></p>
    </section>
    <div @click='nextAction'>
      <foot title="开始设置" :able="isCan"></foot>
    </div>
  </div>
</template>
<style rel="stylesheet" lang="stylus">
  @import "../../style/common.styl"
  #join
    width: 100%
    height: 100%
    .content
      padding-top .64rem
      width: 100%
      .bg
        width: 100%
        height: 1.94rem
        background: url("./img/join1.jpg") no-repeat center center
        background-size 100% 100%
      .des
        margin-top .25rem
        margin-bottom .16rem
        font-size .12rem
        line-height .15rem
        color #666
        text-align center
      .wifiname
        margin 0 .24rem .19rem .24rem
        input
          box-sizing border-box
          padding-left .18rem
          width: 100%
          height: .44rem
          line-height .44rem
          font-size .15rem
          color #222
          border solid  .01rem #d6d6de
      .wifipsd
        position relative
        margin 0 .24rem .15rem .24rem
        input
          box-sizing border-box
          padding-left .18rem
          width: 100%
          height: .44rem
          line-height .44rem
          font-size .15rem
          color #222
          border-width .01rem
          border-style solid
          border-color #c8c8c8
          &:focus
            border-color #d6d6de
        .eye
          position absolute
          top .06rem
          right 0
          padding .09rem
          width: .2rem
          height: .13rem
          bg-img('eye')
          background-repeat no-repeat
          background-origin content-box
          &.open
            bg-img('openeye')
      .rempsd
        position relative
        margin-left .36rem
        height .3rem
        line-height .3rem
        font-size .12rem
        color #666
        .box
          display inline-block
          margin-right .08rem
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
          vertical-align middle
</style>
<script type="text/ecmascript-6">
  import headerTop from '../common/headtop.vue'
  import foot from '../common/foot.vue'
  import Base64 from './js/base64.js'

  export default {
    data(){
      return {
        wifiName: '',
        wifiPsd: '',
        remPsd: false,
        isPsd: false
      }
    },
    beforeCreate() {
      let that = this
      that.$store.state.goNative = false

      LenSmJs.getAddListener_h5()
      LenSmJs.GetWifiName_h5()
      window.callbackdata = function callbackdata(id, name, data) {
        if (name === 'GetWifiName') { // 获取wifi 名字
          that.wifiName = new Base64().decode(data)
          window.localStorage.setItem('wifiName', that.wifiName)
          if (window.localStorage.getItem('wifiName') === that.wifiName && window.localStorage.getItem('wifiPsd') && that.remPsd) {
            that.wifipsd = window.localStorage.getItem('wifiPsd')
          }
        }
      }
    },
    created(){


    },
    mounted(){

    },
    beforeDestory() {

      LenSmJs.getRemoveListener_h5();
    },
    methods: {
      nextAction(){
        console.log(this.wifiPsd.trim());
        localStorage.setItem('wifiPsd', this.wifiPsd.trim())
        if (LenSmJs.isAndroid && this.wifiPsd.trim().length) {
          this.$router.push('/process')
        } else if(LenSmJs.isiOS && this.wifiPsd.trim().length ) { // ios
          this.$router.push('/hotdot')
        }
      },
      remberPsd(){
        this.remPsd = !this.remPsd
      },
      changeType(){
        this.isPsd = !this.isPsd
      }
    },
    computed: {
      isCan(){
        return this.wifiPsd.trim().length ? 'can' : ''
      }
    },
    components: {
      headerTop, foot
    }
  }
</script>
