<template>
  <div class="container">
    <div class="main">
      <div class="Form_table">
        <p class="title">账户设置</p>
        <div class="item__body">
          <el-form class="form" :model="AidForm">
            <el-form-item label="账号" label-width="80px">
              <el-input v-model="AidForm.userName" :disabled='true'></el-input>
            </el-form-item>
            <el-form-item label="工号" label-width="80px">
              <el-input v-model="AidForm.jobNum" :disabled='true'></el-input>
            </el-form-item>
            <el-form-item label="联系方式" label-width="80px">
              <el-input v-model="AidForm.phoneNumber" :disabled='true'></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="btnbox">
          <div class="ok" @click="ChangePwd">修改密码</div>
          <div class="fail" @click="back">返回</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getUserInfo } from "../../api/api";
export default {
  data() {
    return {
      AidForm: {
      },
    };
  },
  methods: {
    // 返回按钮
    back() {
      this.$router.go(-1);
    },
    //修改密码
    ChangePwd(){
        this.$router.push(`/ChangePassWord`)
    },
     //获取用户数据
    GetUserInfo(){
       let param = {};
       getUserInfo(param).then((res) => {
         let {head, data} = res
            if (head.code == 200) {
              this.AidForm = data
              if(this.AidForm.jobNum == null){
                this.AidForm.jobNum = "暂无数据"
              }
              if(this.AidForm.phoneNumber == null){
                this.AidForm.phoneNumber ="暂无数据"
              }
            } 
          });
    }
  },
  mounted(){
    this.GetUserInfo()
  }
};
</script>

<style lang="scss" scoped>
.container /deep/ .el-page-header__content {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #9a9a9a;
}
.container /deep/ .el-page-header__left {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #9a9a9a;
}
.container /deep/ .el-input__inner {
  width: 284px;
  height: 32px;
  color: #343434;
}
.container /deep/ .el-form {
  margin: 0 auto;
}
.container /deep/ .el-form-item {
  text-align: center;
}
.container {
  position: absolute;
  top: 24px;
  right: 24px;
  left: 24px;
  bottom: 24px;
  background: #fff;
  .main {
    padding: 30px;
    .Form_table {
      width: 420px;
      margin: 0 auto;
      margin-top: 8px;
      .title {
        text-align: center;
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #0ebf9c;
      }
      .time {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #9a9a9a;
        margin-top: 20px;
        text-align: center;
      }
      .item__body {
        margin-top: 58px;
        width: 100%;
        .form {
          display: inline-block;
          text-align: center;
        }
      }
      .btnbox {
        display: flex;
        justify-content: space-between;
        width: 224px;
        margin: 0 auto;
        margin-top: 48px;
        .ok {
          width: 80px;
          height: 32px;
          line-height: 32px;
          background: #FDBC56;
          border-radius: 4px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          text-align: center;
          cursor: pointer;
        }
        .fail {
          width: 80px;
          height: 32px;
          line-height: 32px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(240, 240, 240, 1);
          border-radius: 4px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(140, 140, 140, 1);
          text-align: center;
          cursor: pointer;
        }
      }
    }
  }
}
</style>