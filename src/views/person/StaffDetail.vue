<template>
  <div class="container">
    <div class="main">
      <el-page-header @back="backNotesTable" content="员工列表 > 员工详情" class="go-back"></el-page-header>
      <div class="Form_table">
        <p class="title">员工详情</p>
        <p class="time">创建时间：2020-08-30 16:15:45</p>
        <div class="item__body">
          <div class="img_box">
            <img :src="imgUrl" alt class="Img_item"/>
          </div>
          <div class="right_box">
            <div class="item">
              <p class="item_tite">姓名:</p>
              <p class="item_content">{{Name}}</p>
            </div>
             <div class="item">
              <p class="item_tite">工号:</p>
              <p class="item_content">{{Code}}</p>
            </div>
             <div class="item">
              <p class="item_tite">类别:</p>
              <p class="item_content">{{Type}}</p>
            </div>
             <div class="item">
              <p class="item_tite">部门:</p>
              <p class="item_content">{{Dept}}</p>
            </div>
             <div class="item">
              <p class="item_tite">联系方式:</p>
              <p class="item_content">{{Contact}}</p>
            </div>
          </div>
        </div>
        <div class="btnbox">
          <div class="ok" @click="deletetRole">删除</div>
          <div class="compile" @click="CompileStaff">编辑</div>
          <div class="fail">返回</div>
        </div>
      </div>
    </div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: '',
      Name:'郝妍妍',
      Code:'zgsy2013',
      Type:'内部员工',
      Dept:'电气工程部',
      Contact:'18988886666',
      deleteVisible:false
    };
  },
  methods: {
    // 返回按钮
    backNotesTable() {
      this.$router.go(-1);
    },
    //编辑员工
    CompileStaff(){
        this.$router.push(`/CompileStaff`)
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
.container /deep/ .deletebox {
  width: 480px;
  height: 220px;
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
        margin-top: 60px;
        display: flex;
        .img_box {
          width: 180px;
          height: 240px;
          margin-right: 30px;
          .Img_item{
              width: 180px;
              height: 240px;
          }
        }
        .right_box {
          width: 220px;
          height: 240px;
          .item {
               width: 220px;
              display: flex;
              justify-content: space-between;
              margin-bottom: 37px;
            .item_title {
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: bold;
              color: #666666;
            }
            .item_content {
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: bold;
              color: #343434;
            }
          }
        }
      }
      .btnbox {
        display: flex;
        justify-content: space-between;
        width: 300px;
        margin: 0 auto;
        margin-top: 48px;
        .ok {
          width: 80px;
          height: 32px;
          line-height: 32px;
          background:#FF445E;
          border-radius: 4px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          text-align: center;
          cursor: pointer;
        }
        .compile{
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
}
</style>