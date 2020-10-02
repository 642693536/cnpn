<template>
  <el-aside class="aside" width="240px">
    <div class="aside-head" ></div>
    <el-menu
      class="aside-menu"
      text-color="#343434"
      active-text-color="#0EBF9C"
      background-color="#fff"
      :default-active="$route.path"
      unique-opened
      router
    >
      <template v-for="(item,index) of asideMenu" v-if="ShowMenuItem(item.hidden)">
        <!-- :index="index+''" 这种写法将num转为字符串，否则报语法错误 -->
        <el-submenu :index="index+''" v-if="isParent(item.leaf)" class="menu-item">
          <template slot="title">
            <i >
              <img :src="item.imgUrl" alt="">
            </i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item
            class="submenu-item"
            v-for="child of item.children"
            :key="child.path"
            :index="child.path"
            v-if="showChildMenu(child.hidden)"
          >{{child.name}}</el-menu-item>
        </el-submenu>
        <el-menu-item :index="item.children[0].path" v-if="isChild(item)" class="menu-item">
          <i class="iconfont">&#xe615;</i>
          <span>{{item.children[0].name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      asideMenu: [],
    };
  },
  methods: {
    // 侧边栏是否显示相关菜单
    ShowMenuItem(flag) {
      return !flag;
    },
    // 二级菜单是否展示
    showChildMenu(flag) {
      return !flag;
    },
    // 是否是父级菜单
    isParent(flag) {
      return !flag;
    },
    // 是否没有子菜单
    isChild(item) {
      return item.leaf && item.children.length > 0;
    },
  },
  mounted() {
    // 获取侧边栏菜单
    this.asideMenu = this.$router.options.routes;
    if (window.name == "") {
      window.name = "isReload"; // 在首次进入页面时我们可以给window.name设置一个固定值
    } else if (window.name == "isReload") {
      //权限设置
    //   let data = JSON.parse(window.localStorage.getItem("AccountInfo"));
    //   let perms = data.perms;
    //   let routesList = this.$router.options.routes;
    //   let adminType = window.localStorage.getItem("adminType");
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/varible.scss";
.aside /deep/ .el-menu {
  border-right: none;
}
.aside /deep/ .el-menu-item.is-active {
  background-color: #E6FFF6 !important;
}
// .aside /deep/ .el-submenu.is-active.is-opened {
//   background-color: $themeColor !important;
//   color: #fff;
// }

.aside /deep/ .el-submenu.is-opened > .el-submenu__title {
  color: #56D9B6 !important;
  background-color: #fff !important;
}
.aside /deep/ .el-submenu__icon-arrow{
    display: none;
}
.aside /deep/ .el-submenu__title i{
    margin-left: 26px;
}
.aside /deep/ .el-submenu__title span{
    margin-left: 22px;
}
.aside /deep/ .el-menu-item{
    text-align: center;
    text-indent: 20px;
}
.aside /deep/ .el-submenu__title:hover{
  background-color:#E6FFF6 !important;  
}
.el-menu-item:hover{   
  background-color:#E6FFF6 !important;  
}  
  
.aside {
  background-color: #fff;
  border-right: 1px solid #F3F4F8;
  .aside-head {
    height: 64px;
    // color: #fff;
    // border-bottom: 1px solid $bottomColor;
    text-align: center;
    background: url("../../assets/images/icon_logo.png")  no-repeat;
    background-size:208px 64px;
    text-align: center;
    font-size: 16px;
    cursor: default;
  }
  .aside-menu {
    position: absolute;
    top: 60px;
    left: 0;
    width: 240px;
    bottom: 0;
  }
}
</style>