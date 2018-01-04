<template>
  <div>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        transitionName: 'slide-left'
      }
    },
    beforeRouteUpdate (to, from, next) {
      let isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slide-right' // 当前页面返回时候（必须调用goBack，因为牵扯到isBack），从右侧离开
      } else {
        this.transitionName = 'slide-left' // 新页面进入 (从右侧进入)
      }
      this.$router.isBack = false
      next()
    }
  }
</script>

<style scoped type="text/css" rel="stylesheet">
  .child-view {
    position: absolute;
    top: 0;
    width:100%;
    height: 100%;
    transition: all .3s linear;
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 1;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }

/* standard
.fade-enter-active, .fade-leave-active {  // 默认终止效果
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {  // 起始效果
  opacity: 0
}
*/
</style>
