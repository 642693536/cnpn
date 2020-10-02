<template>
  <div class="container">
    <div class="main">
      <el-page-header @back="backNotesTable" content="预警处理 > 预警详情" class="go-back"></el-page-header>
      <div class="Form_table">
        <p class="title">预警详情</p>
        <p class="time">2020-08-30 16:15:45</p>
        <div class="item__body">
          <el-form class="form" :model="AidForm">
            <el-form-item label="预警类型" label-width="80px">
              <el-input v-model="AidForm.Type"></el-input>
            </el-form-item>
            <el-form-item label="预警设备" label-width="80px">
              <el-input v-model="AidForm.Equipment"></el-input>
            </el-form-item>
            <el-form-item label="设备读数"  class="read" label-width="80px">
              <el-input v-model="AidForm.Read" ></el-input>
            </el-form-item>
            <el-form-item label="设备地址" label-width="80px">
              <el-input v-model="AidForm.Adress"></el-input>
            </el-form-item>
            <el-form-item label="附近监控" label-width="80px">
              <el-image :src="AidForm.ImgUrl" class="Img_item"></el-image>
            </el-form-item>
          </el-form>
        </div>
        <div class="btnbox">关闭预警</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      AidForm: {
        Type: "温度预警",
        Equipment: "红外感应温度测量仪  CTB-256402",
        Read: "196℃",
        Adress: "A区油气净化车间储存运输12号管道",
        ImgUrl:""
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
  width: 360px;
  height: 32px;
}
.container /deep/ .read .el-input__inner {
  color:#FF445E;
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
        margin-top: 30px;
        width: 100%;
        .form {
          display: inline-block;
          text-align: center;
          .Img_item{
              width: 360px;
              height: 240px;
          }
        }
      }
      .btnbox {
        width: 180px;
        height: 32px;
        background: #fdbc56;
        border-radius: 4px;
        line-height: 32px;
        text-align: center;
        font-weight: 400;
        color: #ffffff;
        margin-left: 80px;
        margin-top: 30px;
      }
    }
  }
}
</style>