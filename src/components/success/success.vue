<template>
  <div id="success">
    <header-top title="添加成功"></header-top>
    <section class="content">
      <section class="bg"></section>
      <p class="device_name" >{{gadgetName}}</p>
      <section class="des">
        <p id="room" @click="showRoom">{{roomName}} <span class="icon" :class="{active: isShowRoom}"><i class="iconfont icon-arrow-up"></i></span></p>
        <section v-show="isShowRoom" class="room_wrapper">
          <section class="room_name" @click="selectRoom(item, index)" v-for="(item, index) in room" :key="index">
            {{item}}
          </section>
        </section>
      </section>
    </section>

    <section class="modal" v-show="isDefinition">
      <section class="modal_wrapper" v-show="isInput">
        <p class="modal_title">输入房间名称</p>
        <section class="modal_input_wrapper">
          <input class="modal_input" :class="{invalid: inputIsinValid}" placeholder="请输入房间名称" v-model="inputRoomName" />
        </section>
        <section class="modal_bottom">
          <section class="modal_bottom_cancel" @click="hideModal">取消</section>
          <section class="modal_bottom_ok" @click="definition">确认</section>
        </section>
      </section>
      <section class="modal_wrapper_wran" v-show="warning">
        <div class="modal_content_wrapper">
          <p class="modal_content">{{warningInfo}}</p>
        </div>
      </section>
    </section>
    <div @click='nextAction'>
      <foot title="完成"></foot>
    </div>
  </div>
</template>
<style rel="stylesheet" lang="stylus">
  @import '../../font/iconfont.css'
  @import '../../style/common.styl'

  #success
    width: 100%
    height: 100%
    .content
      padding-top .64rem
      width: 100%
      .bg
        margin .76rem auto .13rem auto
        width: 1.46rem
        height: 1.46rem
        background: url("./img/1.png") no-repeat center center
        background-size 100% 100%
      .device_name
        margin-bottom .13rem
        font-size .15rem
        color #222
        font-weight 400
        text-align center
      .des
        margin 0 auto
        width: 1.5rem
        #room
          position relative
          margin-bottom .03rem
          width: 100%
          height: .26rem
          line-height .26rem
          font-size .13rem
          color #666
          text-align center
          vertical-align: middle
          background-color: #F7F7F7
          border .01rem solid #c8c8c8
          span
            display inline-block
            transition all .3s linear
            &.active
              transform rotate(180deg)
        .room_wrapper
          width: 100%
          .room_name
            width: 100%
            height: .26rem
            line-height .26rem
            font-size .13rem
            text-align center
            border .01rem solid #c7c7c7
            border-bottom none
            &:last-of-type
              border-bottom .01rem solid #c7c7c7


    .modal
      position fixed
      left 0
      right 0
      top 0
      bottom 0
      background-color: rgba(0, 0, 0, 0.28)
      .modal_wrapper
        position absolute
        top 1.88rem
        left .3rem
        width: 3.15rem
        height: 1.76rem
        background-color: #fff
        .modal_title
          padding .18rem 0 .22rem 0
          font-size .18rem
          color #222
          font-weight 400
          text-align center
        .modal_input_wrapper
          padding: 0 .12rem
          .modal_input
            box-sizing border-box
            padding-left .18rem
            width: 2.91rem
            font-size .15rem
            color #222
            height .43rem
            line-height .43rem
            border .01rem solid #c8c8c8
            &.invalid
              border-color red
              animation jetter .2s ease-in-out 10
        .modal_bottom
          display flex
          justify-content space-around
          position absolute
          left 0
          bottom 0
          width: 100%
          height: .45rem
          line-height .45rem
          font-size .18rem
          color #222
          font-weight 400
          text-align center
          border-top .01rem solid #c8c8c8
          .modal_bottom_cancel
            box-sizing border-box
            flex 0 0 50%
            border-right .01rem solid #c8c8c8
          .modal_bottom_ok
            flex 0 0 50%
      .modal_wrapper_wran
        position absolute
        top 2.78rem
        left 1.04rem
        width: 1.68rem
        font-size .15rem
        color #222
        border-radius .08rem
        background-color: #fff
        text-align center
        .modal_content_wrapper
          display table
          height: 1.11rem
          .modal_content
            display table-cell
            vertical-align middle

</style>
<script type="text/ecmascript-6">
  import headerTop from '../common/headtop.vue'
  import foot from '../common/foot.vue'
  import '@/font/iconfont.js'
  export default {
    data(){
      return {
        gadgetName: '',
        isShowRoom: false,
        room: [],
        roomName: '选择所在房间',
        isDefinition: false,
        inputRoomName: '',
        isInput: false,
        warning: false,
        wraningInfo: '',
        inputIsinValid: false,
        timeout: null,
        warningTimeout: null,
        home_id: ''
      }
    },
    beforeCreate(){
      this.gadgetName = localStorage.getItem('gadgetName')
      let that = this;
      LenSmJs.getAddListener_h5()
      LenSmJs.QueryDataHomeAndRoomList_h5();
      window.callbackdata = function (id, name, data){
        data = JSON.parse(data)
        that.home_id = data[0].home_id
        if (name === 'QueryDataHomeAndRoomList') {
          data.forEach((elem, index)=> {
            that.room.push(elem.room_name)
          })
          that.room.push('自定义')
        }
        if(name === 'AddRoomWithName'){
          if(!data.state){ // 创建失败
            that.warning = true
            that.wraningInfo = '房间创建失败,请重新创建'
            that.warningTimeout = setTimeout(()=> {
              that.warning = false
            }, 2000)
          }else {
            // 如果创建成功
            that.warning = false
            that.room.unshift(that.inputRoomName)
            that.roomName = that.inputRoomName
          }
        }
      }
    },
    created(){
      this.$store.state.goNative = false
    },
    beforeDestory() {
      LenSmJs.getRemoveListener_h5();
      this.timeout = null
      this.warningTimeout = null
    },
    methods: {
      nextAction(){
        LenSmJs.initFinish_h5()
      },
      showRoom(){
        this.isShowRoom = !this.isShowRoom
      },
      selectRoom(item, index){
        this.isShowRoom = false
        if (index === this.room.length - 1) {
          this.isDefinition = true
          this.isInput = true
        } else {
          this.roomName = item
        }
      },
      hideModal(){
        this.isDefinition = false
        this.isInput = false
      },
      definition(){
        if(!this.inputRoomName.trim().length){
          this.inputIsinValid = true
          this.timeout = setTimeout(()=> {
            this.inputIsinValid = false
          }, 2000)
        }else if(this.room.includes(this.inputRoomName.trim())){
          this.warning = true
          this.warningInfo = '房间名已经存在，请重新创建'
          this.warningTimeout = setTimeout(()=> {
            this.warning = false
          }, 1300)
        } else {
          this.isDefinition = false
          this.isInput = false
          //发送添加新房间请求
          LenSmJs.AddRoomWithName_h5(this.inputRoomName,this.home_id);
          this.warning = true
          this.wraningInfo = '正在创建房间,请稍等...'

        }

      }
    },
    components: {
      headerTop, foot
    }
  }
</script>
