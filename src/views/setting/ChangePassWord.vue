<template>
  <div class="container">
    <div class="main">
      <div class="Form_table">
        <p class="title">账户设置</p>
        <div class="item__body">
          <el-form class="form" :model="AidForm">
            <el-form-item label="旧密码" label-width="80px">
              <el-input v-model="AidForm.oldPassword" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码" label-width="80px">
              <el-input v-model="AidForm.newPassword" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" label-width="80px">
              <el-input v-model="AidForm.newAgainPassword" type="password" show-password></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="btnbox">
          <div class="ok" @click="ChangePwd">确定</div>
          <div class="fail" @click="backNotesTable">返回</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChangePassword } from "../../api/api";
export default {
  data() {
    return {
      AidForm: {
        oldPassword: "",
        newPassword: "",
        newAgainPassword: "",
      },
    };
  },
  methods: {
    // 返回按钮
    backNotesTable() {
      this.$router.go(-1);
    },
    //修改密码
    ChangePwd() {
      let param = this.AidForm;
      if(this.AidForm.newAgainPassword == '' || this.AidForm.newPassword == ''){
        this.$message({
            message: "新密码不能为空",
            type: "warning",
          });
          return false
      }
       if (this.AidForm.newPassword != this.AidForm.newAgainPassword) {
          this.$message({
            message: "新密码不一致请重新输入",
            type: "warning",
          });
          return false
        }
      ChangePassword(param).then((res) => {
        let { head, data } = res;
        if(head.code == 200){
           this.$message({
            message: "重置密码成功",
            type: "success",
          });
          this.$router.push(`/login`)
          localStorage.removeItem('Authorization')
        }else{
           this.$message({
            type: "error",
            message: head.message,
            showClose: true,
          });
        }
      });
    },
  },
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
          background: #0ec09c;
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