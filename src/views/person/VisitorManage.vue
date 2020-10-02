<template>
  <div class="container">
    <div class="main">
      <div class="top">
        <div class="title_box">
          <img src="../../assets/images/icon_employee.png" alt class="img_icon" />
          <p class="title_name">访客列表</p>
        </div>
        <div class="person_box">
          <img src="../../assets/images/icon_statistics.png" alt class="img_icon_2" />
          <p class="person_num">4</p>
        </div>
      </div>
      <div class="middle">
        <el-form :model="SearchFrom">
          <div class="search_box">
            <el-input v-model="SearchFrom.search" class="seach_input" placeholder="请输入姓名"></el-input>
            <div class="add_act" @click="addacount">添加访客</div>
          </div>
          <div class="person_table">
            <el-table :data="tableData" :header-cell-style="{background:'#F3F4F8'}">
              <el-table-column prop="Code" label="序号">
                <template slot-scope="scope">
                  <span class="NameColor">{{scope.row.Code}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="Name" label="姓名"></el-table-column>
              <el-table-column prop="Company" label="所属公司"></el-table-column>
              <el-table-column prop="Time" label="来访时间"></el-table-column>
              <el-table-column prop="Phone" label="联系方式"></el-table-column>
              <el-table-column fixed="right" label="操作" class="handle">
                <template>
                  <el-button type="text" size="small" class="detail" @click="CheckDetail">查看详情</el-button>
                  <el-button type="text" size="small" class="compile" @click="CheckDetail">编辑</el-button>
                  <el-button type="text" size="small" class="delete" @click="deleteAids">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form>
      </div>
    </div>
    <el-dialog :visible.sync="creatVisible" custom-class="addRole" class="addperson">
      <p class="topname">添加访客</p>
      <el-form :model="AccountForm">
        <div class="FirstStep" v-show="TableShow">
            <el-form-item label="姓名" label-width="80px">
          <el-input v-model="AccountForm.Name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="所属公司" label-width="80px">
          <el-input v-model="AccountForm.Company" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" label-width="80px">
          <el-input v-model="AccountForm.Phone" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="来访时间" label-width="80px">
          <el-date-picker v-model="AccountForm.Time" class="time" type="date" placeholder="选择时间"></el-date-picker>
        </el-form-item>
        <div class="btnbox">
            <div class="ok" @click="nextstep">下一步</div>
            <div class="fail">取消</div>
          </div>
        </div>
      
        <div class="LastStep" v-show="ImgShow">
           <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="AccountForm.imageUrl" :src="AccountForm.imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon">上传图片</i>
          </el-upload>
          <div class="btnbox">
            <div class="ok" @click="creatRole">确定</div>
            <div class="fail">取消</div>
        </div>
        </div>
      </el-form>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog
      :visible.sync="deleteVisible"
      :show-close="false"
      custom-class="deletebox"
      class="deleteDialog"
    >
      <div class="top">
        <img src="../../assets/images/icon_caveat_red.png" alt class="ImgIcon" />
        <p class="msg">确定删除该访客？</p>
      </div>
      <p class="content">访客删除后，该访客将无权访问厂区！</p>
      <div class="btnbox">
        <div class="ok" @click="deletetRole">删除</div>
        <div class="fail" @click="deletePersonHandle">取消</div>
      </div>
    </el-dialog>
    <!-- 添加成功 -->
    <el-dialog :visible.sync="successVisible" custom-class="successDialog" class="successBox">
      <div class="top">
        <img src="../../assets/images/icon_addedsuccessfully.png" alt class />
        <p class="success_title">添加成功！</p>
      </div>
      <p class="content">访客：李国斌(成都旅鸟科技有限公司)将于2020-08-25(当天) 访问厂区！</p>
      <div class="btnbox">
        <div class="ok" @click="successHandle">确定</div>
        <div class="fail" @click="successHandle">取消</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      SearchFrom: {
        search: "",
      },
      tableData: [
        {
          Code: "001",
          Name: "李国斌",
          Company: "成都旅鸟科技有限公司",
          Time: "2020-08-25",
          Phone: "18988886666",
        },
        {
          Code: "001",
          Name: "李国斌",
          Company: "成都旅鸟科技有限公司",
          Time: "2020-08-25",
          Phone: "18988886666",
        },
        {
          Code: "001",
          Name: "李国斌",
          Company: "成都旅鸟科技有限公司",
          Time: "2020-08-25",
          Phone: "18988886666",
        },
        {
          Code: "001",
          Name: "李国斌",
          Company: "成都旅鸟科技有限公司",
          Time: "2020-08-25",
          Phone: "18988886666",
        },
      ],
      creatVisible: false,
      deleteVisible: false,
      AidsVisible: false,
      successVisible: false,
      AccountForm: {
        Code: "",
        Name: "",
        IP: "",
        Adress: "",
        imageUrl:""
      },
      AidsForm: {
        Name: "",
        Company: "",
        Phone: "",
        Time: "",
      },
      TableShow: true,
      ImgShow: false,
    };
  },
  methods: {
    //添加访客弹出框
    addacount() {
      this.creatVisible = true;
      this.ImgShow = false;
      this.TableShow = true;
    },
    //添加访客完成
    creatRole() {
      this.successVisible = true;
      this.creatVisible = false;
    },
    //取消添加监控
    cancelPersonHandle() {
      this.creatVisible = false;
    },
    //删除监控
    deletetRole() {
      this.deleteVisible = false;
    },
    //取消删除
    deletePersonHandle() {
      this.deleteVisible = false;
    },
    //删除监控弹出框
    deleteAids() {
      this.deleteVisible = true;
    },
    //添加成功
    successHandle() {
      this.successVisible = false;
    },
    //下一步
    nextstep() {
      this.TableShow = false;
      this.ImgShow = true;
    },
    handleAvatarSuccess(res, file) {
      this.StaffForm.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //查看详情
    CheckDetail(){
      this.$router.push(`/VisitorDetail`)
    }
  },
};
</script>

<style lang="scss" scoped>
.container /deep/ .el-table th:first-child > .cell {
  margin-left: 30px;
}
.container /deep/ .NameColor {
  margin-left: 30px;
}
.container /deep/ .compile {
  color: #febc56;
  margin-right: 30px;
}
.container /deep/ .delete {
  color: #ff445e;
}
.container /deep/ .detail {
  color: #0ebf9c;
  margin-right: 30px;
}
.container /deep/ .handle {
  margin-left: 10px;
}
.container /deep/ .el-table__row {
  height: 75px;
}
.container /deep/ .addRole {
  width: 480px;
  height: 450px;
}
.container /deep/ .successDialog {
  width: 480px;
  height: 220px;
}
.container /deep/ .deletebox {
  width: 480px;
  height: 220px;
}
.container /deep/ .el-input__inner {
  width: 282px;
  height: 32px;
}
.container /deep/ .el-form-item {
  margin-left: 20px;
}
.container /deep/ .time .el-input__inner::-webkit-input-placeholder {
  color: #0ebf9c !important;
}
.container /deep/ .time .el-input__inner::-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #0ebf9c !important;
}
.container /deep/ .time .el-input__inner::-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #0ebf9c !important;
}
.container /deep/ .time .el-input__inner::-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #0ebf9c !important;
}
// 上传图片
.container /deep/ .el-upload {
  margin-left: 150px;
  margin-top: 30px;
}
.container /deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.container /deep/ .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.container /deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.container /deep/ .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.container {
  position: absolute;
  top: 24px;
  right: 24px;
  left: 24px;
  bottom: 24px;
  background: #fff;
  .radio {
    display: inline-block;
    margin-right: 5px;
    border-radius: 5px; /* 圆形边缘弧度 */
    width: 10px; /* 宽度 */
    height: 10px; /* 高度 */
    background-color: red;
  }
  .radio2 {
    display: inline-block;
    margin-right: 5px;
    border-radius: 5px; /* 圆形边缘弧度 */
    width: 10px; /* 宽度 */
    height: 10px; /* 高度 */
    background-color: green;
  }
  .main {
    padding: 30px;
    .top {
      display: flex;
      height: 50px;
      .title_box {
        display: flex;
        margin-right: 30px;
        .img_icon {
          // display: block;
          width: 22px;
          height: 20px;
          margin-right: 11px;
          margin-top: 5px;
        }
        .title_name {
          height: 24px;
          line-height: 24px;
          font-size: 20px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #101010;
        }
      }
      .person_box {
        display: flex;
        .img_icon_2 {
          width: 14px;
          height: 14px;
          margin-right: 11px;
          margin-top: 7px;
        }
        .person_num {
          height: 24px;
          line-height: 30px;
          font-size: 14px;
          font-family: DIN;
          font-weight: bold;
          color: #666666;
        }
      }
    }
    .middle {
      margin-top: 20px;
      .search_box {
        display: flex;
        justify-content: space-between;
        .seach_input {
          width: 240px;
          height: 32px;
        }
        .add_act {
          width: 128px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          background: #0ebf9c;
          border-radius: 4px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #ffffff;
          cursor: pointer;
        }
      }
      .person_table {
        margin-top: 20px;
      }
    }
  }
  .addperson {
    .topname {
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #101010;
      text-align: center;
      margin-bottom: 30px;
    }
   .FirstStep {
      width: 480px;
      .msg {
        width: 359px;
        height: 27px;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #febc56;
        margin-left: 30px;
      }
      .creatdet {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #febc56;
        margin-left: 20px;
        cursor: pointer;
      }
      .btnbox {
        display: flex;
        justify-content: space-between;
        width: 224px;
        // margin: 0 auto;
        margin-left: 100px;
        margin-top: 30px;
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
    .LastStep {
      width: 450px;
      // height: 450px;
      .btnbox {
        display: flex;
        justify-content: space-between;
        width: 224px;
        margin: 0 auto;
        margin-top: 40px;
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
  .deleteDialog {
    .top {
      display: flex;
      margin-top: 15px;
      margin-left: 60px;
      .ImgIcon {
        display: block;
        width: 24px;
        height: 24px;
      }
      .msg {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #343434;
        margin-left: 20px;
      }
    }
    .content {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #9a9a9a;
      margin-left: 104px;
      margin-top: 1px;
    }
    .btnbox {
      display: flex;
      justify-content: space-between;
      width: 224px;
      margin: 0 auto;
      margin-top: 30px;
      .ok {
        width: 80px;
        height: 32px;
        line-height: 32px;
        background: #ff445e;
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
  .successBox {
    .top {
      display: flex;
      margin-left: 60px;
      .ImgIcon {
        width: 24px;
        height: 24px;
        display: block;
      }
      .success_title {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #343434;
        margin-left: 20px;
      }
    }
    .content {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #666666;
      line-height: 18px;
      margin-top: 10px;
      margin-left: 106px;
    }
    .btnbox {
      display: flex;
      justify-content: space-between;
      width: 224px;
      margin: 0 auto;
      margin-top: 30px;
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
</style>