<template>
  <div class="container">
    <div class="main">
      <el-page-header
        @back="backNotesTable"
        content="点位管理 > 添加轨迹"
        class="go-back"
      ></el-page-header>
      <div class="Form_table">
        <p class="title">添加轨迹</p>
        <div class="item__body">
          <el-form class="form" :model="AidForm">
            <el-form-item label="编号" label-width="80px">
              <el-input v-model="AidForm.Code"></el-input>
            </el-form-item>
            <el-form-item label="名称" label-width="80px">
              <el-input
                v-model="AidForm.Name"
                placeholder="请输入线路名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="标准用时" label-width="80px">
              <el-time-picker
                v-model="AidForm.timeRange"
                value-format="HH:mm:ss"
              >
              </el-time-picker>
            </el-form-item>
            <el-form-item label="路线/点位" label-width="80px">
              <div class="item_line">
                <div class="item">
                  <p class="title">起点</p>
                  <el-input
                    class="point2"
                    @focus="ChoosePoint('起点', AidForm.origin)"
                    v-model="AidForm.origin"
                    placeholder="选择点位"
                  ></el-input>
                </div>
                <div
                  class="item_box"
                  v-for="(item, index) in PointList"
                  :key="index"
                >
                  <div class="close" @click="deletePoint(index)">x</div>
                  <el-input
                    class="point2"
                    @focus="ChoosePoint('中间点', item.Adress,index)"
                    v-model="item.Adress"
                    placeholder="选择点位"
                  ></el-input>
                </div>
                <div class="item">
                  <p class="title">终点</p>
                  <el-input
                    class="point2"
                    @focus="ChoosePoint('终点', AidForm.destination)"
                    v-model="AidForm.destination"
                    placeholder="选择点位"
                  ></el-input>
                </div>
                <div class="add" @click="addPoint">+</div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="btnbox">
          <div class="ok" @click="confirmAllHandle">确定</div>
          <div class="fail" @click="backNotesTable">取消</div>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="chooseVisible"
      :show-close="false"
      custom-class="choosebox"
      class="choose_box"
    >
      <el-form :model="AidsList">
        <div class="item_top">
          <p class="title">设备列表</p>
          <el-input
            v-model="AidsList.search"
            class="seach_input"
            placeholder="请输入姓名或工号"
            @change="searchHandle"
          ></el-input>
        </div>
        <div class="Aid_table">
          <el-table
            :data="tableData"
            :header-cell-style="{ background: '#F3F4F8' }"
          >
            <el-table-column prop="pointName" label="名称">
              <template slot-scope="scope">
                <span class="NameColor">{{ scope.row.pointName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="pointAddress" label="地址"></el-table-column>
            <el-table-column
              prop="equipmentVo.cameraName"
              label="关联设备"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.checked"
                  @change="checkstatus(scope.row)"
                ></el-checkbox>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="btnbox">
          <div class="ok" @click="confirmHandle">确定</div>
          <div class="fail" @click="cancelHandle">取消</div>
        </div>
      </el-form>
      <pagination
        :total="totalLen"
        :pagesize="pageSize"
        :current="pageNo"
        @currentPageChange="changeCurrentPage($event)"
      ></pagination>
    </el-dialog>
  </div>
</template>

<script>
import { insertInspection, selectPointList } from "../../api/api";
import pagination from "../../components/Pagination";
export default {
  components: {
    pagination,
  },
  data() {
    return {
      AidForm: {
        Code: "",
        Name: "",
        timeRange: "00:00:00",
        origin: "",
        destination: "",
        originId: "",
        destinationId: "",
      },
      chooseVisible: false,
      AidsList: {
        search: "",
      },
      tableData: [],
      PointList: [],
      CopyPointList: [],
      filterTableData: [] /*查询后的表格数据*/,
      searchFlag: false /*是否进行过查询操作*/,
      totalLen: 0 /*表格总数据*/,
      pageSize: 10 /*每页展示的条数*/,
      pageNo: 1 /*当前页数*/,
      pointIds: [],
      origin: "",
      destination: "",
      CopyForm: {
        pointId: "",
        origin: "",
        destination: "",
        originId: "",
        destinationId: "",
      },
      status: "",
      arrNum:""
    };
  },
  methods: {
    // 返回按钮
    backNotesTable() {
      this.$router.go(-1);
    },
    //选择点位弹出框
    ChoosePoint(status, val, num) {
      this.chooseVisible = true;
      this.status = status;
      if (val == "") {
        this.tableData = this.tableData.map((item) => {
          item.checked = false;
          return item;
        });
      } else {
        this.tableData = this.tableData.map((item) => {
          if (item.pointName == val) {
            item.checked = true;
          } else {
            item.checked = false;
          }
          return item;
        });
      }
      if( this.status == '中间点'){
        this.arrNum = num
      }
    },
    //获取点位列表
    getPointList() {
      let param = {};
      selectPointList(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
          this.tableData = data.result.map((item) => {
            item.checked = false;
            return item;
          });
          this.totalLen = data.total;
        } else {
          this.$message({
            type: "error",
            message: head.message,
            showClose: true,
          });
        }
      });
    },
    //分页，改变当前页码
    changeCurrentPage(currentPage) {
      this.pageNo = currentPage;
      let param = {
        keyword: this.AidsList.search,
        pageNo: this.pageNo,
      };
      selectPointList(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
          this.tableData = data.result;
          this.totalLen = data.total;
        } else {
          this.$message({
            type: "error",
            message: head.message,
            showClose: true,
          });
        }
      });
    },
    //搜索事件
    searchHandle() {
      let param = {
        keyword: this.AidsList.search,
      };
      selectPointList(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
          this.tableData = data.result;
          this.totalLen = data.total;
        } else {
          this.$message({
            type: "error",
            message: head.message,
            showClose: true,
          });
        }
      });
    },
    //切换状态
    checkstatus(row) {
      this.tableData = this.tableData.map((item) => {
        if (item.pointId == row.pointId) {
          item.checked = true;
          this.CopyForm.origin = item.pointName;
          this.CopyForm.destination = item.pointName;
          this.CopyForm.originId = row.pointId;
          this.CopyForm.destinationId = row.pointId;
          if( this.status =='中间点'){
          this.CopyPointList[this.arrNum].Adress = item.pointName
          this.CopyPointList[this.arrNum].pointId = item.pointId
          }
        } else {
          item.checked = false;
        }
        return item;
      });
    },
    //添加点位
    addPoint() {
      this.PointList.push({ Adress: "", pointId:"" });
      this.CopyPointList.push({ Adress: "",pointId:""  });
      
    },
    //删除点位
    deletePoint(i) {
      this.PointList.splice(i, 1);
    },
    //弹出框确定
    confirmHandle() {
      if (this.status == "起点") {
        this.AidForm.origin = this.CopyForm.origin;
        this.AidForm.originId = this.CopyForm.originId;
      } else if (this.status == "终点") {
        this.AidForm.destination = this.CopyForm.destination;
        this.AidForm.destinationId = this.CopyForm.destinationId;
      } else if (this.status == "中间点") {
          this.PointList[this.arrNum].Adress = this.CopyPointList[this.arrNum].Adress
          this.PointList[this.arrNum].pointId = this.CopyPointList[this.arrNum].pointId
          console.log(this.PointList);
      }
      this.tableData = this.tableData.map((item) => {
        item.checked = false;
        return item;
      });
      this.chooseVisible = false;
    },
    //弹出框取消
    cancelHandle() {
      this.chooseVisible = false;
      this.tableData = this.tableData.map((item) => {
        item.checked = false;
        return item;
      });
    },
    //表单提交
    confirmAllHandle() {
      let  Newarr =  this.PointList.map((item) => {
          return  item.pointId
      })
      Newarr.unshift(this.AidForm.originId)
      Newarr.push(this.AidForm.destinationId)
       let param = {
        rouCode: this.AidForm.Code,
        rouName: this.AidForm.Name,
        useTime: this.AidForm.timeRange,
        pointIds: Newarr
      };
      if(this.AidForm.originId == '' || this.AidForm.destinationId == ''){
           this.$message({
            type: "error",
            message: "起点或终点不能为空",
            showClose: true,
          });
          return false
      }
      insertInspection(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
          this.$message({
            type: "success",
            message: '添加成功',
            showClose: true,
          });
          this.$router.push(`/TrackManage`)
        } else {
          this.$message({
            type: "error",
            message: head.message,
            showClose: true,
          });
        }
      });
    },
  },
  computed: {},
  mounted() {
    this.getPointList();
  },
};
</script>

<style lang="scss" scoped>
.container /deep/ .point2 .el-input__inner::placeholder {
  color: #0ec09c;
  font-weight: bold;
}
.container /deep/ .point2 .el-input__inner {
  width: 272px;
  height: 40px;
  cursor: pointer;
}
.container /deep/ .el-date-editor {
  width: 360px;
  height: 40px;
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
  width: 360px;
  height: 40px;
}
.container /deep/.item_time .el-input__inner {
  width: 100px;
  height: 40px;
}
.container /deep/ .el-form {
  margin: 0 auto;
}
.container /deep/ .el-form-item {
  text-align: center;
}
.container /deep/ .NameColor {
  margin-left: 30px;
}
//弹出框
.container /deep/ .choosebox .el-table th:first-child > .cell {
  margin-left: 30px;
}
.container /deep/ .choosebox {
  width: 960px;
  height: 790px;
  margin: auto;
  margin-top: 8vh !important;
}
.container /deep/ .seach_input .el-input__inner {
  width: 200px;
  height: 32px;
}
.container /deep/ .seach_input {
  width: 200px;
  height: 32px;
  margin-right: 40px;
}
.container {
  min-height: 830px;
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
          .Img_item {
            width: 360px;
            height: 200px;
          }

          .item_line {
            // border-left: 1px dashed #0ec09c;
            .item {
              display: flex;
              margin-bottom: 10px;
              .title {
                width: 30px;
                font-size: 12px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: #666666;
                margin-left: 6px;
              }
              .content {
                width: 273px;
                height: 40px;
                // background: #ffffff;
                // border: 1px solid #eeeeee;
                border-radius: 4px;
                text-align: left;
                padding-left: 20px;
                font-weight: 400;
                text-decoration: underline;
                color: #0ebf9c;
                cursor: pointer;
              }
            }
            .item_box {
              display: flex;
              margin-bottom: 10px;
              .close {
                width: 14px;
                height: 14px;
                background: #9a9a9a;
                color: #fff;
                border-radius: 50%;
                text-align: center;
                line-height: 14px;
                margin-right: 10px;
                margin-top: 10px;
                margin-left: 10px;
                cursor: pointer;
              }
              .content {
                width: 273px;
                height: 40px;
                background: #ffffff;
                border: 1px solid #eeeeee;
                border-radius: 4px;
                text-align: left;
                padding-left: 20px;
                font-weight: 400;
                text-decoration: underline;
                color: #0ebf9c;
                cursor: pointer;
              }
            }
            .add {
              position: relative;
              top: -70px;
              left: 340px;

              width: 22px;
              height: 22px;
              background: #fdbc56;
              // padding: 2px;
              text-align: center;
              line-height: 22px;
              color: #fff;
              font-size: 22px;
              cursor: pointer;
            }
          }
        }
      }
      .btnbox {
        display: flex;
        width: 258px;
        margin: 0 auto;
        margin-top: 48px;
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
  .choose_box {
    .item_top {
      display: flex;
      justify-content: space-between;
      width: 960px;
      .title {
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #343434;
      }
    }
    .Aid_table {
      margin-top: 20px;
    }
    .btnbox {
      display: flex;
      width: 258px;
      margin: 0 auto;
      margin-top: 30px;
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
</style>