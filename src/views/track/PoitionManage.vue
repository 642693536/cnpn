<template>
  <div class="container">
    <div class="main">
      <div class="top">
        <div class="title_box">
          <img src="../../assets/images/icon_Point_list.png" alt class="img_icon" />
          <p class="title_name">点位列表</p>
        </div>
        <div class="person_box">
          <img src="../../assets/images/icon_statistics.png" alt class="img_icon_2" />
          <p class="person_num">{{PointNum}}</p>
        </div>
      </div>
      <div class="middle">
        <el-form :model="SearchFrom">
          <div class="search_box">
            <el-input 
            v-model="SearchFrom.search" 
            class="seach_input" 
            placeholder="请输入点位名称"
            @change="searchHandle"></el-input>
            <div class="add_act" @click="addacount">添加点位</div>
          </div>
          <div class="person_table">
            <el-table :data="tableDataPage" :header-cell-style="{background:'#F3F4F8'}">
              <el-table-column prop="pointId" label="序号">
                   <template slot-scope="scope">
                  <span class="NameColor">{{scope.row.pointId}}</span>
                  <!-- <div class="radio"></div>
                  <div class="radio2"></div> -->
                </template>
              </el-table-column>
              <el-table-column prop="pointName" label="名称"></el-table-column>
              <el-table-column prop="pointAddress" label="地址" class="adress">
                  <template slot-scope="scope">
                      <el-popover placement="top-start" width="240" trigger="click">
                          <img :src="ItemUrl" alt="" class="item_url">
                      <el-button type="text" slot="reference" class="adressBtn">{{scope.row.pointAddress}}</el-button>
                      </el-popover>
                  </template>
              </el-table-column>
              <el-table-column prop="equipmentVo.cameraName" label="关联设备" width="400px"></el-table-column>
              <el-table-column fixed="right" label="操作" class="handle">
                <template slot-scope="scope">
                  <el-button type="text" size="small" class="compile" @click="CompileAids(scope.row)">编辑</el-button>
                  <el-button type="text" size="small" class="delete" @click="deleteAids(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form>
      </div>
    </div>
    
    

    <el-dialog
      :visible.sync="deleteVisible"
      :show-close="false"
      custom-class="deletebox"
      class="deleteDialog"
    >
      <div class="top">
        <img src="../../assets/images/icon_caveat_red.png" alt="" class="ImgIcon">
      <p class="msg">删除此点位，与之相关联的数据将全部移除！</p>
      </div>
      <div class="btnbox">
        <div class="ok" @click="deletetRole">删除</div>
        <div class="fail" @click="deletePersonHandle">取消</div>
      </div>
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
import {selectPointList,removePoint} from '../../api/api';
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
      tableData: [
      ],
      deleteVisible: false,
      AccountForm: {
        Code: "",
        Name: "",
        IP: "",
        Adress: "",
      },
      AidsForm: {
        Code: "",
        Name: "",
        IP: "",
        Adress: "",
      },
      ItemUrl:require('../../assets/images/1.png'),
       filterTableData: [] /*查询后的表格数据*/,
      searchFlag: false /*是否进行过查询操作*/,
      totalLen: 0 /*表格总数据*/,
      pageSize: 10 /*每页展示的条数*/,
      pageNo: 1 /*当前页数*/,
      PointNum:'',
      deleteId:[]
    };
  },
  methods: {
    //添加监控弹出框
    addacount() {
      this.$router.push(`/AddPoition`)
    },
    //编辑监控
    CompileAids(row) {
     this.$router.push(`/CompilePoint/${row.pointId}`)
    },
    //编辑确定
    compileRole() {
      this.AidsVisible = false;
    },
    //编辑取消
    compilePersonHandle() {
      this.AidsVisible = false;
    },
    //删除弹出框
    deleteAids(row){
      this.deleteId = []
      this.deleteVisible = true;
      this.deleteId.push(row.pointId)
      console.log(this.deleteId);
    },
    //删除点位确定
    deletetRole(){
      let param = {
        ids:this.deleteId
      }
         removePoint(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
          this.$message({
            type: "success",
            message: "删除成功！",
            showClose: true,
          });
          this.deleteVisible = false;
          this.getPointList();
        } else {
          this.$message({
            type: "error",
            message: head.message,
            showClose: true,
          });
        }
      });
    },
    deletePersonHandle(){
      this.deleteVisible = false;

    },
    //获取点位列表
    getPointList(){
     let param = {};
      selectPointList(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
          this.tableData = data.result;
          this.totalLen = data.total;
          this.PointNum = data.total
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
      searchHandle(){
        let param = {
          keyword:this.SearchFrom.search
        }
        selectPointList(param).then((res) => {
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
      },
  },
  computed:{
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
  mounted(){
    this.getPointList();
  }
};
</script>

<style lang="scss" scoped>
.container /deep/ .el-table th:first-child>.cell{
    margin-left: 30px;
}
.container /deep/ .NameColor {
 margin-left: 30px;
}
.container /deep/  .adressBtn{
    color:#343434;
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
  height: 450px;
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
        .img_icon_2{
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
         .item_url{
        //   display: block;
          width: 220px;
          height: 146px;
          background: red;
      }
      }
     
    }
  }
  
  .deleteDialog {
    .top{
      display: flex;
      margin-left: 60px;
      margin-top: 15px;
      .img_icon{
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