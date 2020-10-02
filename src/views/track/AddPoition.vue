<template>
  <div class="container">
    <div class="main">
      <el-page-header
        @back="backNotesTable"
        content="点位管理 > 添加点位"
        class="go-back"
      ></el-page-header>
      <div class="Form_table">
        <p class="title">添加点位</p>
        <div class="item__body">
          <el-form class="form" :model="AidForm">
            <el-form-item label="点位名称" label-width="100px">
              <el-input
                v-model="AidForm.Name"
                placeholder="请输入点位名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="点位地址" label-width="100px">
              <el-input v-model="AidForm.Adress"></el-input>
            </el-form-item>
            <el-form-item label="关联监控设备" label-width="100px">
              <el-input
                v-model="AidForm.equId"
                placeholder="选择设备"
                @focus="ChooseAids"
                class="point2"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="设置预置点位" label-width="100px">
              <el-select
                v-model="AidForm.presetId"
                placeholder="选择点位"
                class="point"
              >
                <el-option
                  v-for="(item, index) in presetsList"
                  :key="index"
                  :label="item.presetPointName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="btnbox">
          <div class="ok" @click="confirmAllHandle">确定</div>
          <div class="fail" @click="backNotesTable">返回</div>
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
            placeholder="请输入编号或名称"
            @change="searchHandle"
          ></el-input>
        </div>
        <div class="Aid_table">
          <el-table
            ref="multipleTable"
            :data="tableDataPage"
            :header-cell-style="{ background: '#F3F4F8' }"
          >
            <el-table-column prop="equName" label="编号">
              <template slot-scope="scope">
                <span class="NameColor">{{ scope.row.equName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="cameraName" label="名称"></el-table-column>
            <el-table-column >
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.checked" @change="checkstatus(scope.row.id)"></el-checkbox>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="btnbox">
          <div class="ok" @click="confirmHandle">确定</div>
          <div class="fail" @click="cancelHandle">取消</div>
        </div>
        <pagination
          :total="totalLen"
          :pagesize="pageSize"
          :current="pageNo"
          @currentPageChange="changeCurrentPage($event)"
        ></pagination>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  insertPoint,
  presetsLocalSearches,
  getEquipmentList,
} from "../../api/api";
import pagination from "../../components/Pagination";
export default {
   components: {
    pagination,
  },
  data() {
    return {
      AidForm: {
        Name: "",
        Adress: "",
        Aids: "",
        Adress: "",
        ImgUrl: "",
        equId: "",
        presetId: "",
      },
      chooseVisible: false,
      AidsList: {
        search: "",
      },
      tableData: [],
      AidsList: {},
      presetsList: {},
      filterTableData: [] /*查询后的表格数据*/,
      searchFlag: false /*是否进行过查询操作*/,
      totalLen: 0 /*表格总数据*/,
      pageSize: 10 /*每页展示的条数*/,
      pageNo: 1 /*当前页数*/,
      multipleSelection:[]/*table选中数据*/,
      MonitorId:'',
      cameraIndexCode:''
    };
  },
  methods: {
    // 返回按钮
    backNotesTable() {
      this.$router.go(-1);
    },
    ChooseAids() {
      this.chooseVisible = true;
    },
    //获取监控列表
    getMonitorList() {
      let param = {};
      getEquipmentList(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
           this.tableData = data.result.map(item =>{
            item.checked = false;
            return item
        })
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
      getEquipmentList(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
          this.tableData = data.result.map(item =>{
            item.checked = false;
            return item
        })
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
        keyword: this.SearchFrom.search,
      };
      getEquipmentList(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
         this.tableData = data.result.map(item =>{
            item.checked = false;
            return item
        })
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
    //切换单选状态
    checkstatus(row){
      this.tableData = this.tableData.map(item => {
           if(item.id == row){
               item.checked = true
              this.AidForm.equId = item.cameraName
              this.MonitorId = item.id
              this.cameraIndexCode = item.cameraIndexCode
           }else{
               item.checked = false
           }
            return item
        })
    },
    //确定选择监控设备
    confirmHandle(){
      this.chooseVisible = false
      let param = {
        cameraIndexCode:this.cameraIndexCode
      }
      presetsLocalSearches(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
          this.presetsList = data.result;
        } else {
          this.$message({
            type: "error",
            message: head.message,
            showClose: true,
          });
        }
      });
    },
    //取消选择监控设备
    cancelHandle(){
      this.chooseVisible = false
      this.AidForm.equId = ''
    },
    //提交表单
    confirmAllHandle(){
      let param = {
        equId:this.MonitorId,
        pointAddress:this.AidForm.Adress,
        pointName:this.AidForm.Name,
        presetId:this.AidForm.presetId
      }
      insertPoint(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
          this.$message({
            type: "success",
            message: '添加成功',
            showClose: true,
          });
          this.$router.push(`/PoitionManage`)
        } else {
          this.$message({
            type: "error",
            message: head.message,
            showClose: true,
          });
        }
      });
    }

  },
  computed: {
    tableDataPage() {
      let start = 0 * this.pageSize,
        end = 1 * this.pageSize;
      let pages = [];
      /*搜索过*/
      if (this.flag) {
        /*搜索结果分页*/
        pages = this.filterListData.slice(start,end);
      } else {
        /*没有搜索过*/
        pages = this.tableData.slice(start, end);
      }
      return pages;
    },
  },
  mounted() {
    this.getMonitorList();
  },
};
</script>

<style lang="scss" scoped>
.container /deep/ .point .el-input__inner::placeholder {
  color: #0ec09c;
  font-weight: bold;
}
.container /deep/ .point2 .el-input__inner::placeholder {
  color: #0ec09c;
  font-weight: bold;
}
.container /deep/ .point2 .el-input__inner {
  cursor: pointer;
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
.container /deep/ .aids .el-input__inner {
  width: 254px;
  height: 40px;
}
.container /deep/ .aids .el-input {
  width: 254px;
  height: 40px;
}
.container /deep/ .aids .el-form-item__content {
  display: flex;
}
.container /deep/ .aids .ChooseAids {
  margin-left: 10px;
  width: 96px;
  height: 40px;
  background: #30cca7;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}

.container /deep/ .el-form {
  margin: 0 auto;
}
.container /deep/ .el-form-item {
  text-align: center;
}

//弹出框
.container /deep/ .choosebox {
  width: 960px;
  height: 790px;
  margin: auto;
  margin-top: 8vh !important;
}
.container /deep/ .choosebox .el-table th:first-child > .cell {
  margin-left: 30px;
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
.container /deep/ .NameColor {
  margin-left: 30px;
}
.container {
  min-height: 830px;
  background: #fff;
  .main {
    padding: 30px;
    .Form_table {
      width: 465px;
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
        }
      }
      .sendmsg {
        width: 180px;
        height: 32px;
        background: #fdbc56;
        border-radius: 4px;
        line-height: 32px;
        text-align: center;
        font-weight: 400;
        color: #ffffff;
        margin-left: 80px;
        cursor: pointer;
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