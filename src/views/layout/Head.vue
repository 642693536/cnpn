<template>
  <div class="head">
    <div class="head-right">
      <ul class="head-menu">
        <li class="menu-item">
          <i class="iconfont">&#xe6eb;</i>
          <!-- <span class="menu-title">消息</span> -->
        </li>
        <li class="menu-item" @click="ToChangepwd">
          <i class="iconfont set">&#xe60a;</i>
        </li>
        <li class="menu-item">
          <div class="ImgBox">
            <img :src="this.ImgUrl" alt class="headImg" />
            <p class="menu-title">{{userName}}</p>
          </div>
        </li>
        <li class="menu-item" @click="logout">
          <i class="iconfont close">&#xe6e4;</i>
          <!-- <span class="menu-title">安全退出</span> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ImgUrl: require("../../assets/images/icon_avatar_male_default.png"),
      userName: "",
    };
  },
  methods:{
    ToChangepwd(){
      this.$router.push(`/Account`)
    },
    //退出
    	// 退出
			logout() {
				this.$confirm('确认要退出吗？','提示',{
					confirmButtonText:'确定',
					cancelButtonText:'取消',
					type:'warning'
				}).then(() => {
					//清空localStorage
					localStorage.removeItem('Authorization');
					localStorage.removeItem('UserName');
					//router显示状态
					let routesList = this.$router.options.routes;
					/*跳转到登录界面*/
					this.$router.push('/login');
				}).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消退出'
		          }); 
		        });
			},
  },
  created(){
    this.userName = localStorage.getItem('UserName')
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/varible.scss";
.head /deep/ .el-form-item {
  margin-bottom: 0;
}
.head /deep/ .el-form-item__content {
  line-height: $menuHeight;
}
.head {
  width: 100%;
  height: 64px;
  line-height: 64px;
  background: #fff;
  // box-shadow: 0 1px 6px 0 rgba(0,0,0,.1);
  .head-left {
    padding-left: 36px;
  }
  .head-right {
    padding-right: 38px;
    height: 64px;
    text-align: right;
    .head-menu {
      .menu-item {
        display: inline-block;
        
		height: 64px;
        cursor: pointer;
        &:not(:last-child) {
          padding-right: 30px;
        }
        .iconfont {
          width: 30px;
          height: 64px;
          display: block;
          font-size: 24px;
          text-align: center;
          position: relative;
          top:-10px;
        }
        .close {
          color: #0ec09c;
        }
        .set {
          font-size: 22px;
        }
        .ImgBox {
          display: flex;
          height: 64px;
          cursor: default;
          .headImg {
            display: inline-block;
            width: 40px;
            height: 40px;
            margin-right: 20px;
            margin-top: 12px;
          }
        }
      }
    }
  }
}
</style>