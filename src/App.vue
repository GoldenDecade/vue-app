<!--<template>
  <div >
    &lt;!&ndash;keep-alive用于缓存页面&ndash;&gt;
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="app" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    &lt;!&ndash;如果不支持keep-alive&ndash;&gt;
    <transition :name="transitionName">
      <router-view class="app" v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    data () {
      return {
        transitionName: 'slide-left'
      }
    },
  beforeRouteEnter(){
    console.log('enter');
  },
  beforeRouteLeave(){
    console.log('leave');
  },
  beforeRouteUpdate (to, from, next) {
    console.log(999)
    let isBack = this.$router.isBack
    console.log(isBack)
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

<style>
 .app {
    position: absolute;
    top: 0;
    width:100%;
    height: 100%;
    transition: all 3s linear;
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
</style>-->

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>

</style>
