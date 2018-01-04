/**
 * Created by lenovo on 2017/12/28.
 */
(function(doc, win){
  var docEl = doc.documentElement  // 获取整个DOM对象 就是html这个DOM元素
  //  横竖屏的切换 引起resize事件
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  var recalculate = function(){
    var clientWidth = docEl.clientWidth  // 320  375  414
    if(!clientWidth) return;
    docEl.style.fontSize = (clientWidth / 375) * 100 + 'px' // 设置1rem是多少px
  }
  if(!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalculate, false)
  doc.addEventListener('DOMContentLoaded', recalculate, false)
})(document, window)
