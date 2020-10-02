<template>
  <div class="wrapper">
    <el-container class="container">
      <aside-box></aside-box>
      <el-container class="right-container">
        <head-box></head-box>
        <el-main class="main-con">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
        <el-backtop target=".main-con">
          <i class="iconfont">&#xe605;</i>
        </el-backtop>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import headBox from "./Head";
import asideBox from "./Aside";
export default {
  name: "Home",
  components: {
    asideBox,
    headBox,
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  min-width: 1200px;
  overflow: auto;
  font-size: 14px;
  & > .container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    /* min-height: 100%; */
  }
  .right-container {
    position: relative;
    display: block !important;
    .main-con {
      position: absolute;
      top: 60px;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #f7f7f7;
    }
  }
}

</style>