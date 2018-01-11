<template>
  <div id="process">
    <header-top title="设备连接"></header-top>
    <section class="content">
      <section class="bg1" :class="itemClass">
        <section class="bg2"></section>
      </section>
      <p class="linking">正在连接</p>
      <p class="duration">这可能需要2分钟</p>
    </section>

    <section class="modal" v-show="fail">
      <section v-show="fail_link" class="modal_wrapper">
        <p class="modal_title">设备连接失败</p>
        <p class="modal_content">{{modal_content}}</p>
        <p class="modal_bottom border-1px" @click="gojoin">我知道了</p>
      </section>
    </section>
  </div>
</template>
<style rel="stylesheet" lang="stylus">
  @import "../../style/common.styl"
  #process
    width: 100%
    height: 100%
    .content
      padding-top .64rem
      width: 100%
      .bg1
        position relative
        margin .65rem auto .3rem auto
        width: 2.03rem
        height: 2.03rem
        background: url('./img/01.png') no-repeat center center
        background-size 100% 100%
        &.c0
          background: url('./img/1.gif') no-repeat center center
          background-size 100% 100%
        &.c1
          background: url('./img/2.gif') no-repeat center center
          background-size 100% 100%
        &.c2
          background: url('./img/3.gif') no-repeat center center
          background-size 100% 100%
        &.c3
          background: url('./img/4.gif') no-repeat center center
          background-size 100% 100%
      .bg2
        position absolute
        left 50%
        top 50%
        transform translate(-50%, -50%)
        width .85rem
        height .85rem
        background url('./img/wifi.gif') no-repeat center center
        background-size 100% 100%
      .linking
        margin-bottom .16rem
        font-size .18rem
        color #222
        text-align center
      .duration
        font-size .12rem
        color #666
        text-align center


    .modal
      position fixed
      left 0
      right 0
      top 0
      bottom 0
      z-index 100
      background-color: rgba(0, 0, 0, 0.28)
      .modal_wrapper
        position absolute
        top 2.45rem
        left .52rem
        width: 2.71rem
        height: 1.76rem
        border-radius .14rem
        background-color: #fff
        .modal_title
          padding .24rem 0 .26rem 0
          font-size .18rem
          color #222
          font-weight bold
          text-align center
        .modal_content
          padding 0 .4rem
          font-size .15rem
          text-align center
        .modal_bottom
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
        itemClass: '',
        fail: false,
        fail_link: false,
        fail_reason: 102, //默认是超时  ------100 wifi连接失败   101 超时  102 已被绑定
        modal_content: '',
      }
    },
    beforeCreate() {

    },
    created(){
      this.$store.state.goNative = false
      let that = this, timeZone = LenSmJs.getTimezoneName_h5(), iostimeout1 = false, iostimeout2 = false, iostimeout3 = false, iosinterval1 = null, iosinterval2 = null, iosinterval3 = null, iostimeout1_90 = null, iostimeout2_60 = null, iostimeout3_90 = null, iosHubtype = '', iosMacaddr = '';
      console.log('timeZone:::'+timeZone);
      if (LenSmJs.isiOS) {
        iosinterval1 = setInterval(()=> { //step1
          if (!iostimeout1) {
            LenSmJs.softAPNew_h5(localStorage.getItem('wifiName'), localStorage.getItem('wifiPsd'), new Date().getTime() / 1000, timeZone)
          }
        }, 5000)
        LenSmJs.softAPNew_h5(localStorage.getItem('wifiName'), localStorage.getItem('wifiPsd'), new Date().getTime() / 1000, timeZone)
        that.itemClass = 'c0'
        iostimeout1_90 = setTimeout(()=> {
          clearInterval(iosinterval1)
          clearTimeout(iostimeout1_90)
          fail = true
          fail_link = true
        }, 90000)
      } else {
        LenSmJs.getAddListener_h5()
        //这里有服务器差异
        console.log('startAutoFindDeviceBySoftAp_h5 start');
        console.log(localStorage.getItem('wifiName'));

        console.log(localStorage.getItem('wifiPsd'));
        LenSmJs.startAutoFindDeviceBySoftAp_h5('LenovoSmartAir', localStorage.getItem('wifiName'), localStorage.getItem('wifiPsd'), '192.168.199.1', 'cn', 'dev', '', timeZone, false, '60000', '60000', '120000', '120000', 'true');
        console.log('startAutoFindDeviceBySoftAp_h5 end');
      }
      window.callbackdata = function (id, name, data) {
        if (name === "softAPNew" && !iostimeout1) {  // ios step1
          data = JSON.parse(data)
          if (data.state) {
            that.itemClass = 'c1'
            clearInterval(iosinterval1)
            clearTimeout(iostimeout1_90)
            iosHubtype = data.hubtype
            iosMacaddr = data.macaddr

            //  如果第一步成功,就进行第二步绑定hub
            iosinterval2 = setInterval(()=> {
              if (!iostimeout2) {
                LenSmJs.bindHub_h5(iosMacaddr, iosHubtype)
              }
            }, 5000)
            LenSmJs.bindHub_h5(iosMacaddr, iosHubtype)
            iostimeout2_60 = setTimeout(()=> {
              iostimeout2 = true
              clearInterval(iosinterval2)
              clearTimeout(iostimeout2_60)
              that.fail = true
              that.fail_link = true
            }, 60000)

          }
        }
        if (name === "bindHub" && !iostimeout2) { // ios step2
          data = JSON.parse(data)
          if (data.state) {
            that.itemClass = 'c2'
            clearInterval(iosinterval2)
            clearTimeout(iostimeout2_60)
            iosinterval3 = setInterval(()=> {
              LenSmJs.updateGadgetListWithResultBlock_h5(iosMacaddr)
            }, 5000)
            LenSmJs.updateGadgetListWithResultBlock_h5(iosMacaddr)
            iostimeout3_90 = setTimeout(()=> {
              iostimeout3 = true
              clearInterval(iosinterval3)
              clearTimeout(iostimeout3_90)
              that.fail = true
              that.fail_link = true
            }, 90000)
          }
        }
        if (name === 'updateGadgetListWithResultBlock' && !iostimeout3) {
          data = JSON.parse(data)
          if (data.state) {
            that.itemClass = 'c3'
            clearInterval(iosinterval3)
            clearTimeout(iostimeout3_90)
            that.$router.push('/success')
          }
        }
        if (name == "onDeviceWifiConnectSuccess") { // 设备wifi连接成功
          that.itemClass = 'c0'
        }
        if (name == "onDeviceWifiConnectTimeout") { // 设备wifi连接超时
          that.fail = true
          that.fail_link = true
          that.fail_reason = 100
          that.modal_content = '设备wifi连接失败,请再次连接'
        }
        if (name == "onSoftApSuccess") { // softAp成功
          that.itemClass = 'c1'
        }
        if (name == "onSoftApTimeout") {//softAp超时
          that.fail = true
          that.fail_link = true
          that.modal_content = '请长按设备上的配对键3秒重置'
        }
        if (name == "onBindSuccess") { //绑定成功
          that.itemClass = 'c2'
        }
        if (name == "onBindError") {
          if (data == "103" || data == "-8" || data == "42409") {//失败 提示被其他用户绑定
            that.fail = true
            that.fail_link = true
            that.modal_content = '设备已被其他账号绑定,请解绑后再次连接'
          } else {//绑定超时
            that.fail = true
            that.fail_link = true
            that.modal_content = '请长按设备上的配对键3秒重置'
          }
        }
        if(name == "onCreateGadgetSuccess"){
          that.itemClass = 'c3'
          let gadgetName = data.split(",")[1]  //设备名字
          localStorage.setItem('gadgetName', gadgetName)
          let gadgetId = data.split(",")[2]   //设备号
          this.$router.push('/success')
        }
        if(name == "onCreateGadgetTimeout"){ //创建设备超时
          that.fail = true
          that.fail_link = true
          that.modal_content = '请长按设备上的配对键3秒重置'
        }

      }
    },
    mounted(){

    },
    beforeDestroy(){
      LenSmJs.getRemoveListener_h5();
    },
    methods: {
      gojoin(){
        if(this.fail_reason === 100){ // wifi 连接失败  安卓
          this.$store.state.replacehistory = true
          this.$router.replace('/hotdot')
        }else if(this.fail_reason === 101 || this.fail_reason === 102){
          this.$store.state.replacehistory = true
          this.$router.replace('/join')
        }

      }
    },
    components: {
      headerTop, foot
    }
  }
</script>
