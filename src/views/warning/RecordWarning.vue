<template>
  <div class="container">
    <div class="main">
      <div class="top">
        <div class="title_box">
          <img src="../../assets/images/icon_Warninglist.png" alt class="img_icon" />
          <p class="title_name">预警列表</p>
        </div>
        <div class="person_box">
          <img src="../../assets/images/icon_statistics.png" alt class="img_icon_2" />
          <p class="person_num">4</p>
        </div>
      </div>
      <div class="middle">
        <p
          class="activity__status_item"
          v-for="(item,index) of chooseStatusList"
          :key="index"
          :class="{status_active:isActive(index)}"
          @click="statusChangeHandle(item,index)"
        >{{item}}</p>
      </div>
      <div class="formTable">
        <el-table :data="tableData" :header-cell-style="{background:'#F3F4F8'}">
          <el-table-column prop="Code" label="序号">
            <template slot-scope="scope">
              <span class="NameColor">{{scope.row.Code}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="Name" label="设备名称"></el-table-column>
          <el-table-column prop="Time" label="时间"></el-table-column>
          <el-table-column prop="Msg" label="预警信息"></el-table-column>
          <el-table-column fixed="right" label="操作" class="handle">
            <template>
              <el-button type="text" size="small" class="detail" @click="checkHanlde">查看详情</el-button>
              <el-button type="text" size="small" class="compile" @click="CloseWarning">关闭预警</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :visible.sync="deleteVisible" custom-class="deletebox" class="deleteDialog">
      <div class="top">
        <img src="../../assets/images/icon_caveat.png" alt class="ImgIcon" />
        <p class="msg">确定关闭该预警？</p>
      </div>
      <div class="content">
        <div class="item">
          <p class="item_title">时间：</p>
          <p class="item_content">2020-08-05 14:15:36</p>
        </div>
          <div class="item">
          <p class="item_title">预警：</p>
          <p class="item_content">轨迹异常预警；内部员工：郝妍妍（轨迹巡 检）在巡检中轨迹异常，路线1中B点未捕捉 到人员图像！</p>
        </div>
      </div>
      <div class="btnbox">
        <div class="ok" @click="deletetRole">确定</div>
        <div class="fail" @click="deletePersonHandle">取消</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chooseStatusList: [
        "全部",
        "陌生人员预警",
        "劳保异常预警",
        "物联网设备预警",
        "轨迹预警",
      ], // 可筛选的状态
      currentInedx: 0, // 筛选状态的选中index
      tableData: [
        {
          Code: "001",
          Name: "红外感应温度测量仪  CTB-256402",
          Time: "2020-08-05  14:15:36",
          Msg:
            "设备温度预警；现场设备读数：196℃；A区油气净化 车间储存运输12号管道 温度过高！",
        },
        {
          Code: "001",
          Name: "红外感应温度测量仪  CTB-256402",
          Time: "2020-08-05  14:15:36",
          Msg:
            "设备温度预警；现场设备读数：196℃；A区油气净化 车间储存运输12号管道 温度过高！",
        },
        {
          Code: "001",
          Name: "红外感应温度测量仪  CTB-256402",
          Time: "2020-08-05  14:15:36",
          Msg:
            "设备温度预警；现场设备读数：196℃；A区油气净化 车间储存运输12号管道 温度过高！",
        },
        {
          Code: "001",
          Name: "红外感应温度测量仪  CTB-256402",
          Time: "2020-08-05  14:15:36",
          Msg:
            "设备温度预警；现场设备读数：196℃；A区油气净化 车间储存运输12号管道 温度过高！",
        },
      ],
      deleteVisible: false,
    };
  },
  methods: {
    isActive(i) {
      if (this.currentInedx === i) {
        return true;
      }
    },
    /*状态过滤（搜索）*/
    statusChangeHandle(status, i) {
      this.currentInedx = i;
    },
    checkHanlde() {
      // this.$router.push(`/TemperatureWarning`)
      // this.$router.push(`/PressureWarning`)
      // this.$router.push(`/StrangerWarning`)
      // this.$router.push(`/ProtectionWarning`)
      this.$router.push(`/TrajectoryWarning`);
    },
    deletetRole() {
      this.deleteVisible = false;
    },
    deletePersonHandle() {
      this.deleteVisible = false;

    },
    CloseWarning(){
      this.deleteVisible = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.container /deep/ .NameColor {
  margin-left: 30px;
}
.container /deep/ .el-table th:first-child > .cell {
  margin-left: 30px;
}
.container /deep/ .detail {
  color: #0ebf9c;
  margin-right: 30px;
}
.container /deep/ .compile {
  color: #febc56;
  margin-right: 30px;
}
.container /deep/ .deletebox {
  width: 500px;
  height: 450px;
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
    .top {
      display: flex;
      .title_box {
        display: flex;
        margin-right: 30px;
        .img_icon {
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
      text-align: center;
      display: flex;
      width: 900px;
      justify-content: space-between;
      margin: 0 auto;
      margin-top: 33px;
      .activity__status_item {
        cursor: pointer;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #343434;
        height: 24px;
        line-height: 24px;
        text-align: center;
        padding: 0px 10px;
        &.status_active {
          background: #0ec09c;
          border-radius: 4px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #ffffff;
        }
      }
    }
    .formTable {
      margin-top: 20px;
    }
  }
  .deleteDialog {
    .top {
      display: flex;
      margin-top: 15px;
      margin-left: 50px;
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
      margin-left: 50px;
      margin-top: 24px;
      width: 340px;
      height: 137px;
      background: #f3f4f8;
      border-radius: 10px;
      padding: 20px;
      .item {
        display: flex;
        .item_title {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #9a9a9a;
          margin-right: 24px;
        }
        .item_content {
          font-size: 14px;
          font-family: DIN;
          font-weight: 500;
          color: #9a9a9a;
          width: 266px;
        }
      }
      .item:first-child{
        margin-bottom: 24px;
      }
    }
    .btnbox {
      display: flex;
      justify-content: space-between;
      width: 224px;
      margin: 0 auto;
      margin-top: 80px;
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
        color: rgba(140, 140, 140, 1);
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
</style>