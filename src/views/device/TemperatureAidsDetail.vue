<template>
  <div class="container">
    <div class="main">
      <el-page-header @back="backNotesTable" content="温度设备 > 设备详情" class="go-back"></el-page-header>
      <div class="Form_table">
        <p class="title">设备详情</p>
        <p class="time">创建时间：2020-08-30 16:15:45</p>
        <div class="item__body">
          <el-form class="form" :model="AidForm">
            <el-form-item label="名称" label-width="80px">
              <el-input v-model="AidForm.Name"></el-input>
            </el-form-item>
            <el-form-item label="读数" label-width="80px">
              <el-input v-model="AidForm.Read"></el-input>
            </el-form-item>
            <el-form-item label="下限" label-width="80px">
              <el-input v-model="AidForm.Floor" placeholder="请输入下限值"></el-input>
            </el-form-item>
            <el-form-item label="上限" label-width="80px">
              <el-input v-model="AidForm.Upper"  placeholder="请输入上限值"></el-input>
            </el-form-item>
            <el-form-item label="地址" label-width="80px">
              <el-input v-model="AidForm.Adress"  placeholder="请输入地址"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="btnbox">
          <div class="ok">确定</div>
          <div class="fail">返回</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      AidForm: {
        Name: "",
        Read: "",
        Floor: "",
        Upper: "",
        Adress: "",
      },
    };
  },
  methods: {
    // 返回按钮
    backNotesTable() {
      this.$router.go(-1);
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
          background: rgba(14, 191, 156, 1);
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