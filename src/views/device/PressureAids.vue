<template>
  <div class="container">
    <div class="main">
      <div class="top">
        <div class="title_box">
          <img src="../../assets/images/icon_pressure.png" alt class="img_icon" />
          <p class="title_name">物联网设备</p>
        </div>
        <div class="person_box">
          <img src="../../assets/images/icon_statistics.png" alt class="img_icon_2" />
          <p class="person_num">{{totalLen}}</p>
        </div>
      </div>
      <div class="middle">
        <el-form :model="SearchFrom">
          <div class="search_box">
            <el-input v-model="SearchFrom.search" 
            class="seach_input" 
            placeholder="请输入监控名称、编号"
             @change="searchHandle"></el-input>
          </div>
          <div class="person_table">
            <el-table :data="tableDataPage" :header-cell-style="{background:'#F3F4F8'}">
              <el-table-column prop="preName" label="名称">
                <template slot-scope="scope">
                  <span class="NameColor">{{scope.row.preName}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="opcItem" label="K值" ></el-table-column>
              <el-table-column prop="recNum" label="读数" ></el-table-column>

              <el-table-column prop="preMinNum" label="下限" >
                <template slot-scope="scope">
                  <span class="FloorColor">{{scope.row.preMinNum}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="preMaxNum" label="上限" >
                <template slot-scope="scope">
                  <span class="UpperColor">{{scope.row.preMaxNum}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="preAddress" label="地址" ></el-table-column>
              <el-table-column prop="preAddress" label="是否匹配监控点" ></el-table-column>
              <el-table-column fixed="right" label="操作" class="handle" width="100px">
                <template slot-scope="scope">
                  <el-button type="text" size="small" class="compile" @click="SetAids(scope.row)">设置</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form>
      </div>
      <pagination
        :total="totalLen"
        :pagesize="pageSize"
        :current="pageNo"
        @currentPageChange="changeCurrentPage($event)"
      ></pagination>
    </div>
  </div>
</template>

<script>
import { selectPressureList } from "../../api/api";
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
      websocketInfo:{}
    };
  },
  methods: {
    //设置
    SetAids(row) {
      this.$router.push(`/PressureAidsDetail/${row.preId}`);
    },
    //获取列表
    GettableList() {
      let param = {
        pageNo:this.pageNo
      };
      selectPressureList(param).then((res) => { 
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
    //分页，改变当前页码
			changeCurrentPage(currentPage) {
        this.pageNo = currentPage;
         let param = {
        keyword:this.SearchFrom.search,
        pageNo:this.pageNo
      };
      selectPressureList(param).then((res) => {
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
        selectPressureList(param).then((res) => {
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
      //websocket
      initWebSocket(){ //初始化weosocket
        const wsuri = "ws://192.168.0.162:30013/websocket/10";
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
        
      },
      websocketonopen(){ //连接建立之后执行send方法发送数据
        // let actions = {"test":"12345"};
        // this.websocketsend(JSON.stringify(actions));
      },
      websocketonerror(){//连接建立失败重连
        this.initWebSocket();
      },
      websocketonmessage(e){ //数据接收
        // const redata = JSON.parse(e.data);
        this.websocketInfo = JSON.parse(e.data) 
        let websockArr = this.websocketInfo.info
        this.tableData.map((item) => {
          if (item.preId == websockArr.preId) {
            item.recNum = websockArr.preNum
          }
        })
      },
      websocketsend(Data){//数据发送
        this.websock.send(Data);
      },
      websocketclose(e){  //关闭
        console.log('断开连接',e);
      },
      //匹配读数

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
  },
  created(){
    this.initWebSocket();
  },
  mounted() {
    this.GettableList();
  },
   destroyed() {
      this.websock.close() //离开路由之后断开websocket连接
    },
};
</script>

<style lang="scss" scoped>
.container /deep/ .compile {
  color: #0ebf9c;
}
.container /deep/ .FloorColor {
  color: #febc56;
}
.container /deep/ .UpperColor {
  color: #ff445e;
}
.container /deep/ .NameColor {
  margin-left: 30px;
}
.container /deep/ .el-table th:first-child > .cell:first-child {
  margin-left: 30px;
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
}
</style>