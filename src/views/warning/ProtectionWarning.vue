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
            <el-form-item label="设备地址" label-width="80px">
              <el-input v-model="AidForm.Adress"></el-input>
            </el-form-item>
            <el-form-item label="识别人员" label-width="80px">
              <el-input v-model="AidForm.Person"></el-input>
            </el-form-item>
            <el-form-item label="员工工号" label-width="80px">
              <el-input v-model="AidForm.Code"></el-input>
            </el-form-item>
            <el-form-item label="人员类别" label-width="80px">
              <el-input v-model="AidForm.PersonType"></el-input>
            </el-form-item>
            <el-form-item label="预警原因" label-width="80px">
              <el-input v-model="AidForm.Reason"></el-input>
            </el-form-item>
            <el-form-item label="监控图片" label-width="80px">
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
        Type: "劳保异常预警",
        Equipment: "HW001  红外球体跟踪摄像机",
        Adress: "厂区正大门入口",
        Person:"郝妍妍",
        Code:"ZGSY5645",
        PersonType:"内部员工",
        Reason:"未穿劳保服、带佩戴安全帽",
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
.container /deep/ .el-form {
  margin: 0 auto;
}
.container /deep/ .el-form-item {
  text-align: center;
}
.container {
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