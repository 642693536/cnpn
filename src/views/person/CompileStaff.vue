<template>
  <div class="container">
    <div class="main">
      <el-page-header @back="backNotesTable" content="员工设备 > 员工详情 > 编辑" class="go-back"></el-page-header>
      <div class="Form_table">
        <p class="title">员工详情</p>
        <p class="time">创建时间：2020-08-30 16:15:45</p>
        <div class="item__body">
          <el-form class="form" :model="UserForm">
            <el-form-item label="姓名" label-width="80px">
              <el-input v-model="UserForm.Name"></el-input>
            </el-form-item>
            <el-form-item label="工号" label-width="80px">
              <el-input v-model="UserForm.Code"></el-input>
            </el-form-item>
            <el-form-item label="类别" label-width="80px">
              <el-select v-model="UserForm.Type">
                <el-option
                  v-for="(item,index) in TypeList"
                  :key="index"
                  :label="item.TypeName"
                  :value="item.TypeId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门" label-width="80px" class="Department">
              <el-select v-model="UserForm.Dept">
                <el-option
                  v-for="(item,index) in DeptList"
                  :key="index"
                  :label="item.DeptName"
                  :value="item.DeptId"
                ></el-option>
              </el-select>
              <span class="creatdet">创建部门</span>
            </el-form-item>
            <el-form-item label="联系方式" label-width="80px">
              <el-input v-model="UserForm.Contact"></el-input>
            </el-form-item>
            <el-form-item label="员工照片">
              <el-image :src="UserForm.ImgUrl" class="Img_item"></el-image>
              <div>
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="1"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                >
                  <el-button size="small"  class="sendBtn">点击上传</el-button>
                </el-upload>
              </div>
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
      UserForm: {
        Name: "",
        Code: "",
        Type: "",
        Dept: "",
        Contact: "",
        ImgUrl: require("../../assets/images/1.png"),
      },
      TypeList: {},
      DeptList: {},
      fileList:[]
    };
  },
  methods: {
    // 返回按钮
    backNotesTable() {
      this.$router.go(-1);
    },
     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
  },
};
</script>

<style lang="scss" scoped>
.container /deep/ .Department .el-input__inner {
  width: 225px;
  height: 32px;
}
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
//   position: absolute;
//   top: 24px;
//   right: 24px;
//   left: 24px;
//   bottom: 24px;
    padding: 12px;
  background: #F3F4F8;
  .main {
    padding: 30px;
    background: #fff;
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
          .creatdet {
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #febc56;
            margin-left: 10px;
          }
          .Img_item {
            width: 180px;
            height: 240px;
            margin-right: 90px;
          }
          .sendBtn{
              background: #FDBC56;
              width: 180px;
              height: 32px;
              margin-right: 20px;
              color:#fff;
          }
        }
      }
      .btnbox {
        display: flex;
        width: 254px;
        margin: 0 auto;
        margin-top: 50px;
        .ok {
          width: 64px;
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
          margin-right: 30px;
        }
        .fail {
          width: 64px;
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