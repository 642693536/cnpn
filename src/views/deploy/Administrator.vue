<template>
  <div class="container">
    <div class="main">
      <div class="top">
        <div class="title_box">
          <img src="../../assets/images/icon_employee.png" alt class="img_icon" />
          <p class="title_name">账号列表</p>
        </div>
        <div class="person_box">
          <img src="../../assets/images/icon_statistics.png" alt class="img_icon_2" />
          <p class="person_num">{{UserNum}}</p>
        </div>
      </div>
      <div class="middle">
        <el-form :model="SearchFrom">
          <div class="search_box">
            <el-input 
            v-model="SearchFrom.search" 
            class="seach_input" 
            placeholder="请输入姓名或工号" 
            @change="searchHandle"></el-input>
            <div class="add_act" @click="addacount">添加账号</div>
          </div>
          <div class="person_table">
            <el-table :data="tableDataPage" :header-cell-style="{background:'#F3F4F8'}">
              <el-table-column prop="userName" label="姓名">
                <template slot-scope="scope">
                  <span class="NameColor">{{scope.row.userName}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="jobNum" label="工号"></el-table-column>
              <el-table-column prop="phoneNumber" label="联系方式"></el-table-column>
              <el-table-column label="权限">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.isDisabled"
                    active-color="#56DAB6"
                    inactive-color="#EEEEEE"
                    active-text="ON"
                    inactive-text="OFF"
                    class="demo"
                    @change="ChangeState(scope.row)"
                  ></el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="DeleteUser(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form>
      </div>
    </div>
    <!-- 创建账号 -->
    <el-dialog :visible.sync="creatVisible" custom-class="addRole" class="addperson">
      <p class="topname">添加账号</p>
      <el-form :model="AccountForm">
        <el-form-item label="姓名" label-width="80px">
          <el-input v-model="AccountForm.userName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="工号" label-width="80px">
          <el-input v-model="AccountForm.jobNum" placeholder="请输入工号"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" label-width="80px">
          <el-input v-model="AccountForm.phoneNumber" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <p class="msg">管理员账户权限默认为开启，如需关闭权限，请在创建账号后在账户列表中操作关闭权限！</p>
        <div class="btnbox">
          <div class="ok" @click="creatRole">确定</div>
          <div class="fail" @click="cancelPersonHandle">取消</div>
        </div>
      </el-form>
    </el-dialog>
    <!-- 创建成功 -->
    <el-dialog
      :visible.sync="successVisible"
      :show-close="false"
      custom-class="sucessbox"
      class="send_box"
    >
      <p class="successmsg">创建成功！</p>
      <p class="msg">账号初始密码为手机后六位</p>
      <div class="successbox" @click="successPersonHandle">完成</div>
    </el-dialog>
    <!-- 创建失败 -->
    <el-dialog
      :visible.sync="failVisible"
      :show-close="false"
      custom-class="failbox"
      class="fail_box"
    >
      <img src="../../assets/images/icon_failure_red.png" alt class="item_img" />
      <p class="title">添加失败</p>
      <p class="msg">系统账户管理权限只限于内部员工账号!</p>
      <div class="btnbox">
        <div class="ok" @click="repeatAdd">重新添加</div>
        <div class="fail" @click="repeatAdd">取消</div>
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
import pagination from "../../components/Pagination";
import {
  selectUserList,
  addCreateUser,
  addJurisdiction,
  RemoveUser,
} from "../../api/api";
export default {
  name: "Administrator",
  components: {
    pagination,
  },
  data() {
    return {
      SearchFrom: {
        search: "",
      },
      value: true,
      tableData: [],
      creatVisible: false,
      successVisible: false,
      failVisible: false,
      AccountForm: {
        userName: "",
        jobNum: "",
        phoneNumber: "",
      },
      UserList: [],
      DeleteUserId: [],
      UserNum:'',
      filterTableData: [] /*查询后的表格数据*/,
      searchFlag: false /*是否进行过查询操作*/,
      totalLen: 0 /*表格总数据*/,
      pageSize: 10 /*每页展示的条数*/,
      pageNo: 1 /*当前页数*/,
    };
  },
  methods: {
    //创建账号弹出框
    addacount() {
      this.creatVisible = true;
    },
    //创建账号
    creatRole() {
      let param = this.AccountForm;
      addCreateUser(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
          this.creatVisible = false;
          this.successVisible = true;
        } else {
          this.$message({
            type: "error",
            message: head.message,
            showClose: true,
          });
        }
      });
    },
    //关闭弹窗
    cancelPersonHandle() {
      this.creatVisible = false;
    },
    //创建成功
    successPersonHandle() {
      this.successVisible = false;
      this.GetUserList();
    },
    repeatAdd() {
      this.failVisible = false;
    },
    //获取列表
    GetUserList() {
      let param = {};
      selectUserList(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
          this.tableData = data.result;
          this.totalLen = data.total
          this.UserNum = this.tableData.length
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
        pageNo:this.pageNo
      };
      selectUserList(param).then((res) => {
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
      //搜索事件
      searchHandle(){
        let param = {
          keyword:this.SearchFrom.search
        }
        selectUserList(param).then((res) => {
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
    //权限开启、关闭
    ChangeState(row) {
      this.UserList.push(row.userId);
      let param = {
        userId: this.UserList,
        jurisdiction: row.isDisabled,
      };
      addJurisdiction(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
          this.UserList = [];
        } else {
          this.UserList = [];
          this.$message({
            type: "error",
            message: head.message,
            showClose: true,
          });
        }
      });
    },
    //删除账号
    DeleteUser(row) {
      this.DeleteUserId.push(row.userId);
      let param = {
        userId: this.DeleteUserId,
      };
      this.$confirm("删除账号后将无法恢复，确定要删除么？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          RemoveUser(param).then((res) => {
            let { head, data } = res;
            if (head.code == 200) {
              this.DeleteUserId = [];
              this.$message({
                message: "删除成功!",
                type: "success",
              });
              this.GetUserList();
            } else {
              this.DeleteUserId = [];
              this.$message({
                type: "error",
                message: head.message,
                showClose: true,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.GetUserList();
  },
  computed:{
tableDataPage() {
      let start= 0 * this.pageSize,
					end= 1 * this.pageSize;
				let pages=[];
				/*搜索过*/
				if(this.flag) {
					/*搜索结果分页*/
					pages=this.filterListData.slice(start,end);
				}else {
					/*没有搜索过*/
					pages=this.tableData.slice(start,end);
				}
				return pages;
			}
  }
};
</script>

<style lang="scss" scoped>
.container /deep/ .el-table th:first-child > .cell {
  margin-left: 30px;
}
.container /deep/ .NameColor {
  margin-left: 30px;
}
.el-button--text {
  color: #ff445e;
}
.container /deep/ .el-table__row {
  height: 75px;
}
.container /deep/ .el-switch__core {
  width: 50px !important;
}
.container /deep/ .addRole {
  width: 480px;
  height: 450px;
}
.container /deep/ .sucessbox {
  width: 480px;
  height: 332px;
}
.container /deep/ .failbox {
  width: 480px;
  height: 332px;
}
.demo /deep/ .el-switch__label {
  position: absolute;
  display: none;
  color: #fff;
}
/*打开时文字位置设置*/
.demo /deep/.el-switch__label--right {
  z-index: 1;
  right: 19px;
}
.demo /deep/ .el-switch__label.is-active span {
  font-size: 10px;
}
/*关闭时文字位置设置*/
.demo /deep/ .el-switch__label--left {
  z-index: 1;
  left: 17px;
}
.demo /deep/ .el-switch__label--left span {
  font-size: 10px;
  color: #9a9a9a;
}
/*显示文字*/
.demo /deep/ .el-switch__label.is-active {
  display: block;
}

.demo /deep/.el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 50px !important;
}
.container /deep/ .el-input__inner {
  width: 282px;
  height: 32px;
}
.container /deep/ .el-form-item {
  margin-left: 20px;
}
.container {
  background: #fff;
  min-height: 830px;
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
  .send_box {
    .successmsg {
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(14, 191, 156, 1);
      text-align: center;
      margin-top: 24px;
      margin-bottom: 20px;
    }
    .msg {
      text-align: center;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #343434;
    }
    .successbox {
      width: 80px;
      height: 32px;
      line-height: 32px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(14, 191, 156, 1);
      border-radius: 4px;
      text-align: center;
      margin: 0 auto;
      margin-top: 30px;
      font-weight: 400;
      color: rgba(14, 191, 156, 1);
      cursor: pointer;
    }
  }
  .fail_box {
    .item_img {
      display: block;
      width: 56px;
      height: 56px;
      margin: 0 auto;
    }
    .title {
      margin-top: 32px;
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #fdbc56;
      text-align: center;
    }
    .msg {
      margin-top: 20px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #343434;
      text-align: center;
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
        background: #fdbc56;
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
        color: #9a9a9a;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
</style>