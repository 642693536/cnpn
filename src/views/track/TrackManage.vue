<template>
  <div class="container">
    <div class="main">
      <div class="top">
        <div class="title_box">
          <img
            src="../../assets/images/icon_Point_list.png"
            alt
            class="img_icon"
          />
          <p class="title_name">轨迹列表</p>
        </div>
        <div class="person_box">
          <img
            src="../../assets/images/icon_statistics.png"
            alt
            class="img_icon_2"
          />
          <p class="person_num">{{PointNum}}</p>
        </div>
      </div>
      <div class="middle">
        <el-form :model="SearchFrom">
          <div class="search_box">
            <el-input
              v-model="SearchFrom.search"
              class="seach_input"
              placeholder="请输入轨迹名称"
              @change="searchHandle"
            ></el-input>
            <div class="add_act" @click="addacount">添加轨迹</div>
          </div>
          <div class="person_table">
            <el-table
              :data="tableData"
              :header-cell-style="{ background: '#F3F4F8' }"
            >
              <el-table-column prop="rouCode" label="编号">
                <template slot-scope="scope">
                  <span class="NameColor">{{ scope.row.rouCode }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="rouName" label="名称"></el-table-column>
              <el-table-column prop="useTime" label="标准用时"></el-table-column>
              <el-table-column prop="routePointVo" label="路线/点位" width="652px">
                <template slot-scope="scope">
                  <div class="item">
                    <el-popover
                      placement="top"
                      width="400"
                      trigger="click"
                      class="item_Outbox"
                    >
                      <img :src="ItemUrl" alt="" class="item_url" />
                      <div class="item_point" type="text" slot="reference">
                       {{scope.row.pointNames}}
                      </div>
                    </el-popover>
                    <div class="item_content">
                      <el-steps direction="vertical">
                        <el-step
                          v-for="(item, i) in scope.row.routePointVo"
                          :key="i"
                          :title="item.pointName + ':'"
                          :description="item.pointAddress"
                        ></el-step>
                      </el-steps>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" class="handle">
                <template slot-scope="scope">
                  <div class="BtnBox">
                    <img src="../../assets/images/icon_edit_yellow.png" alt />
                    <el-button 
                    type="text" 
                    size="small" 
                    class="compile"
                    @click="CompileHandle(scope.row)"
                      >编辑</el-button
                    >
                  </div>
                  <div class="BtnBox">
                    <img src="../../assets/images/icon_delete_red.png" alt />
                    <el-button 
                    type="text" 
                    size="small" 
                    class="delete"
                    @click="DeleteHandle(scope.row)"
                      >删除</el-button
                    >
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form>
      </div>
    </div>
    <pagination
      :total="totalLen"
      :pagesize="pageSize"
      :current="pageNo"
      @currentPageChange="changeCurrentPage($event)"
    ></pagination>
  </div>
</template>

<script>
import { selectInspection,removeInspection } from "../../api/api";
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
      filterTableData: [] /*查询后的表格数据*/,
      searchFlag: false /*是否进行过查询操作*/,
      totalLen: 0 /*表格总数据*/,
      pageSize: 10 /*每页展示的条数*/,
      pageNo: 1 /*当前页数*/,
      ItemUrl: require("../../assets/images/1.png"),
      PointNum:'',
      deleteId:[]
    };
  },
  methods: {
    addacount() {
      this.$router.push(`/AddTrack`);
    },
    //获取巡检列表
    getDataList(){
      let param = { }
       selectInspection(param).then((res) => {
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
      selectInspection(param).then((res) => {
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
        selectInspection(param).then((res) => {
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
      //编辑
      CompileHandle(row){
        this.$router.push(`/CompileTrack/${row.rouId}`)
      },
      //删除轨迹
      DeleteHandle(row){
        this.deleteId = []
        this.deleteId.push(row.rouId)
        let param = {
          ids:this.deleteId
        }
         this.$confirm("删除轨迹后将无法恢复，确定要删除么？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          removeInspection(param).then((res) => {
            let { head, data } = res;
            if (head.code == 200) {
              this.$message({
                message: "删除成功!",
                type: "success",
              });
              this.getDataList();
            } else {
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
      }
  },
  computed:{

  },
  mounted(){
    this.getDataList()
  }
};
</script>

<style lang="scss" scoped>
.container /deep/ .BtnBox {
  width: 50px;
  margin: auto;
  cursor: pointer;
  margin-bottom: 5px;
}
.container /deep/ .el-table th:last-child > .cell {
  // margin-left: 100px;
  text-align: center;
}
.container /deep/ .el-table th:first-child > .cell {
  margin-left: 30px;
}
.container /deep/ .NameColor {
  margin-left: 30px;
}
.container /deep/ .adressBtn {
  color: #343434;
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

//进度条
.container /deep/.el-step__icon-inner {
  display: none;
}
.container /deep/.el-step__icon.is-text {
  width: 8px;
  height: 8px;
  background: #56dab6;
  border-radius: 50%;
  border: none;
}
.container /deep/.el-step.is-vertical .el-step__line {
  top: 9px;
  bottom: -9px;
  left: 3px;
}
.container /deep/.el-step__line {
  border: 1px #56dab6 dashed;
}
.container /deep/.el-step__title.is-wait {
  color: #343434 !important;
}
.container /deep/.el-step__main {
  display: flex;
}
.container /deep/.el-step__description.is-wait {
  width: 350px;
  color: #343434 !important;
  font-size: 16px;
  height: 36px;
  line-height: 35px;
  margin-left: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
//弹出框
.container /deep/.item_Outbox {
  width: 125px;
  // display: block;
  margin: auto;
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
        .item_url {
          //   display: block;
          width: 220px;
          height: 146px;
          background: red;
        }
        .item {
          display: flex;
          .item_point {
            font-size: 16px;
            font-family: Helvetica Neue;
            font-weight: bold;
            text-decoration: underline;
            color: #0ebf9c;
            margin: auto;
            cursor: pointer;
          }
          .item_content {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>