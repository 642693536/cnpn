<template>
  <div class="container">
    <div class="main">
      <div class="top">
        <div class="title_box">
          <img
            src="../../assets/images/icon_Monitoringequipment.png"
            alt
            class="img_icon"
          />
          <p class="title_name">监控列表</p>
        </div>
        <div class="person_box">
          <img
            src="../../assets/images/icon_statistics.png"
            alt
            class="img_icon_2"
          />
          <p class="person_num">{{ totalLen }}</p>
        </div>
      </div>
      <div class="middle">
        <el-form :model="SearchFrom">
          <div class="search_box">
            <el-input
              v-model="SearchFrom.search"
              class="seach_input"
              placeholder="请输入监控名称、编号"
              @change="searchHandle"
            ></el-input>
            <div class="add_act" @click="addacount">添加监控</div>
          </div>
          <div class="person_table">
            <el-table
              :data="tableData"
              :header-cell-style="{ background: '#F3F4F8' }"
            >
              <el-table-column prop="equName" label="编号">
                <template slot-scope="scope">
                  <span class="NameColor">{{ scope.row.equName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="cameraName" label="名称"></el-table-column>
              <el-table-column prop="presetId" label="预置点位"></el-table-column>
              <el-table-column
                prop="equAddress"
                label="厂区地址"
                width="400px"
              ></el-table-column>
              <el-table-column fixed="right" label="操作" class="handle">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    class="compile"
                    @click="CompileAids(scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    type="text"
                    size="small"
                    class="delete"
                    @click="deleteAids(scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form>
      </div>
    </div>
    <!-- 添加监控 -->
    <el-dialog
      :visible.sync="creatVisible"
      custom-class="addRole"
      class="addperson"
    >
      <p class="topname">添加监控</p>
      <el-form :model="AccountForm">
        <el-form-item label="编号" label-width="100px">
          <el-input
            v-model="AccountForm.equName"
            placeholder="请输入编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="名称" label-width="100px">
          <el-input
            v-model="AccountForm.cameraName"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="监控设备" label-width="100px" class="point">
          <el-select
            v-model="AccountForm.equId"
            placeholder="选择点位"
            @change="getpresetsList"
          >
            <el-option
              v-for="(item, index) in monitoringList"
              :key="index"
              :label="item.cameraName"
              :value="item.equId"
              :data-code="item.cameraIndexCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="巡检预置点" label-width="100px" class="point">
          <!-- <el-select v-model="AccountForm.presetId" placeholder="选择点位">
            <el-option
              v-for="(item,index) in presetsList"
              :key="index"
              :label="item.presetPointName"
              :value="item.presetPointIndex"
            ></el-option>
          </el-select> -->
          <el-checkbox-group v-model="AccountForm.presetId">
            <el-checkbox
              v-for="(item, index) in presetsList"
              :key="index"
              :label="item.presetPointIndex"
              :dataName="item.presetPointName"
              :dataCode="item.cameraIndexCode"
              ref="datapoint"
            >
              {{ item.presetPointName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="厂区地址" label-width="100px">
          <el-input
            v-model="AccountForm.equAddress"
            placeholder="请输入地址"
          ></el-input>
        </el-form-item>
        <div class="btnbox">
          <div class="ok" @click="creatRole">确定</div>
          <div class="fail" @click="cancelPersonHandle">取消</div>
        </div>
      </el-form>
    </el-dialog>
    <!-- 删除监控 -->
    <el-dialog
      :visible.sync="deleteVisible"
      :show-close="false"
      custom-class="deletebox"
      class="deleteDialog"
    >
      <div class="top">
        <img
          src="../../assets/images/icon_caveat_red.png"
          alt
          class="ImgIcon"
        />
        <p class="msg">删除此监控，与之相关联的数据将全部为空！</p>
      </div>
      <div class="btnbox">
        <div class="ok" @click="deletetRole">删除</div>
        <div class="fail" @click="deletePersonHandle">取消</div>
      </div>
    </el-dialog>
    <!-- 编辑监控 -->
    <el-dialog
      :visible.sync="AidsVisible"
      custom-class="addRole"
      class="addperson"
    >
      <p class="topname">编辑监控</p>
      <el-form :model="AidsForm">
        <el-form-item label="编号" label-width="100px">
          <el-input
            v-model="AidsForm.equName"
            placeholder="请输入编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="名称" label-width="100px">
          <el-input
            v-model="AidsForm.cameraName"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="监控设备" label-width="100px" class="point">
          <el-select
            v-model="AidsForm.equId"
            placeholder="选择点位"
            @change="getpresetsList"
          >
            <el-option
              v-for="(item, index) in monitoringList"
              :key="index"
              :label="item.cameraName"
              :value="item.equId"
              :data-code="item.cameraIndexCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="巡检预置点" label-width="100px" class="point">
          <el-checkbox-group v-model="AidsForm.presetId">
            <el-checkbox
              v-for="(item, index) in presetsList"
              :key="index"
              :label="item.presetPointIndex"
              :dataName="item.presetPointName"
              :dataCode="item.cameraIndexCode"
              ref="datapoint"
            >
              {{ item.presetPointName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="厂区地址" label-width="100px">
          <el-input
            v-model="AidsForm.equAddress"
            placeholder="请输入地址"
          ></el-input>
        </el-form-item>
        <div class="btnbox">
          <div class="ok" @click="compileRole">确定</div>
          <div class="fail" @click="compilePersonHandle">取消</div>
        </div>
      </el-form>
    </el-dialog>
    <pagination
      :total="totalLen"
      :pagesize="pageSize"
      :current="pageNo"
      @currentPageChange="changeCurrentPage($event)"
    ></pagination>
  </div>
</template>

<script>
import {
  getEquipmentList,
  getISCEquipmentList,
  addEquipment,
  presetsSearches,
  removeEquipment,
  getEquipmentInfo,
  updateEquipment,
} from "../../api/api";
import pagination from "../../components/Pagination";
export default {
  components: {
    pagination,
  },
  data() {
    return {
      SearchFrom: {
        search: "",
      },
      tableData: [],
      creatVisible: false,
      deleteVisible: false,
      AidsVisible: false,
      AccountForm: {
        equName: "",
        cameraName: "",
        equAddress: "",
        equId: "",
        presetId: [],
      },
      AidsForm: {
        equName: "",
        cameraName: "",
        equAddress: "",
        equId: "",
        presetId: [],
        ChooseId: [],
      },
      demoData: [],
      //监控设备列表
      monitoringList: [],
      //预置点列表
      presetsList: [],
      //预置点code
      cameraIndexCode: "",
      PointList: [
        { presetPointName: "预置点1", presetPointIndex: "1" },
        { presetPointName: "预置点2", presetPointIndex: "2" },
        { presetPointName: "预置点3", presetPointIndex: "3" },
      ],
      filterTableData: [] /*查询后的表格数据*/,
      searchFlag: false /*是否进行过查询操作*/,
      totalLen: 0 /*表格总数据*/,
      pageSize: 10 /*每页展示的条数*/,
      pageNo: 1 /*当前页数*/,
      //已选择的预置点列表
      CheckedPointList: [],
      //删除监控
      deleteCode: [],
      //编辑类的预置点列表
      CompilePointList: [],
    };
  },
  methods: {
    //添加监控弹出框
    addacount() {
      this.creatVisible = true;
    },
    //添加监控
    creatRole() {
      this.CheckedPointList = [];
      //获取到选择预置点的List
      for (var i = 0; i < this.presetsList.length; i++) {
        for (var v = 0; v < this.AccountForm.presetId.length; v++) {
          if (
            this.presetsList[i].presetPointIndex == this.AccountForm.presetId[v]
          ) {
            this.CheckedPointList.push(this.presetsList[i]);
          }
        }
      }
      let param = {
        equAddress: this.AccountForm.equAddress,
        equId: JSON.stringify(this.AccountForm.equId),
        equName: this.AccountForm.equName,
        presetId: this.CheckedPointList,
      };
      addEquipment(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
          this.$message({
            type: "success",
            message: "添加成功！",
            showClose: true,
          });
          this.AccountForm.equName = "";
          this.AccountForm.cameraName = "";
          this.AccountForm.equId = "";
          this.AccountForm.presetId = [];
          this.creatVisible = false;
          this.GetDataList();
        } else {
          this.$message({
            type: "error",
            message: head.message,
            showClose: true,
          });
        }
      });
    },
    //取消添加监控
    cancelPersonHandle() {
      this.AccountForm.equName = "";
      this.AccountForm.cameraName = "";
      this.AccountForm.equId = "";
      this.AccountForm.presetId = [];
      this.creatVisible = false;
    },
    //删除监控
    deletetRole() {
      let param = {
        ids: this.deleteCode,
      };
      removeEquipment(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
          this.$message({
            type: "success",
            message: "删除成功！",
            showClose: true,
          });
          this.deleteVisible = false;
          this.GetDataList();
        } else {
          this.$message({
            type: "error",
            message: head.message,
            showClose: true,
          });
        }
      });
    },
    //取消删除
    deletePersonHandle() {
      this.deleteCode = [];
      this.deleteVisible = false;
    },
    //删除监控弹出框
    deleteAids(row) {
      this.deleteCode = []
      this.deleteCode.push(row.id);
      this.deleteVisible = true;
    },
    //编辑监控
    CompileAids(row) {
      let param = {
        equId: row.equId,
      };
      //获取列表回显
      getEquipmentInfo(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
          this.AidsForm.equName = data.equName;
          this.AidsForm.cameraName = data.cameraName;
          this.AidsForm.equAddress = data.equAddress;
          this.AidsForm.equId = data.equId;
          this.AidsForm.ChooseId = JSON.parse(data.presetId);
          let param = {
            cameraIndexCode: data.cameraIndexCode,
          };
          //获取巡检点
          presetsSearches(param).then((res) => {
            let { head, data } = res;
            if (head.code == 200) {
              this.presetsList = data.result;
              //巡检点回显
              for (var i = 0; i < this.presetsList.length; i++) {
                for (var v = 0; v < this.AidsForm.ChooseId.length; v++) {
                  if (
                    this.presetsList[i].presetPointIndex ==
                    this.AidsForm.ChooseId[v].presetPointIndex
                  ) {
                    this.AidsForm.presetId.push(
                      this.presetsList[i].presetPointIndex
                    );
                  }
                }
              }
            } else {
              this.$message({
                type: "error",
                message: head.message,
                showClose: true,
              });
            }
          });
        } else {
          this.$message({
            type: "error",
            message: head.message,
            showClose: true,
          });
        }
      });
      this.AidsVisible = true;
    },
    //编辑确定
    compileRole() {
        this.CheckedPointList = [];
      //获取到选择预置点的List
      for (var i = 0; i < this.presetsList.length; i++) {
        for (var v = 0; v < this.AidsForm.presetId.length; v++) {
          if (
            this.presetsList[i].presetPointIndex == this.AidsForm.presetId[v]
          ) {
            this.CheckedPointList.push(this.presetsList[i]);
          }
        }
      }
      let param = {
        equAddress: this.AidsForm.equAddress,
        equId: JSON.stringify(this.AidsForm.equId),
        equName: this.AidsForm.equName,
        presetId: this.CheckedPointList,
      };
      updateEquipment(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
          this.$message({
            type: "success",
            message: "修改成功！",
            showClose: true,
          });
      this.AidsVisible = false;
          this.GetDataList();
        } else {
          this.$message({
            type: "error",
            message: head.message,
            showClose: true,
          });
        }
      });

    },
    //编辑取消
    compilePersonHandle() {
      this.AidsVisible = false;
    },
    //获取设备列表
    GetDataList() {
      let param = {};
      getEquipmentList(param).then((res) => {
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
    //获取监控列表
    getmonitoringList() {
      let param = {};
      getISCEquipmentList(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
          this.monitoringList = data.result;
        } else {
          this.$message({
            type: "error",
            message: head.message,
            showClose: true,
          });
        }
      });
    },
    //获取预置点列表
    getpresetsList(value) {
      let obj = {};
      obj = this.monitoringList.find((item) => {
        return item.equId === value; // 筛选出匹配数据
      });
      this.cameraIndexCode = obj.cameraIndexCode;
      let param = {
        cameraIndexCode: this.cameraIndexCode,
      };
      presetsSearches(param).then((res) => {
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
    //分页，改变当前页码
    changeCurrentPage(currentPage) {
      this.pageNo = currentPage;
      let param = {
        keyword:this.SearchFrom.search,
        pageNo: this.pageNo
      };
      getEquipmentList(param).then((res) => {
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
      searchHandle(){
        let param = {
          keyword:this.SearchFrom.search
        }
        getEquipmentList(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
          this.tableData = data.result;
          this.totalLen = data.total
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
        pages = this.filterListData.slice(start, end);
      } else {
        /*没有搜索过*/
        pages = this.tableData.slice(start, end);
      }
      return pages;
    },
  },
  mounted() {
    this.GetDataList();
    this.getmonitoringList();
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
}
.container /deep/ .delete {
  color: #ff445e;
}
.container /deep/ .handle {
  margin-left: 10px;
}
.container /deep/ .el-table__row {
  height: 75px;
}
.container /deep/ .addRole {
  width: 480px;
}
.container /deep/ .deletebox {
  width: 480px;
  height: 200px;
}
.container /deep/ .el-input__inner {
  width: 282px;
  height: 32px;
}
.container /deep/ .el-form-item {
  margin-left: 20px;
}
.container /deep/ .point .el-input__inner::placeholder {
  color: #0ec09c;
  font-weight: bold;
}
// 多选框
.container /deep/ .el-checkbox-group {
  width: 280px;
  min-height: 30px;
  border: 1px solid #eeeeee;
}
.container /deep/ .el-checkbox {
  margin-left: 20px;
}
.container {
  min-height: 830px;
  background: #fff;
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
    .msg {
      width: 359px;
      height: 27px;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #febc56;
      margin-left: 30px;
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
  .deleteDialog {
    .top {
      display: flex;
      margin-left: 60px;
      margin-top: 15px;
      .img_icon {
        display: block;
        width: 24px;
        height: 24px;
      }
      .msg {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #343434;
        text-align: center;
        margin-left: 20px;
      }
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