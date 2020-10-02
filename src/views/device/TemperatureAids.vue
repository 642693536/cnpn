<template>
  <div class="container">
    <div class="main">
      <div class="top">
        <div class="title_box">
          <img src="../../assets/images/icon_temperature.png" alt class="img_icon" />
          <p class="title_name">温度设备</p>
        </div>
        <div class="person_box">
          <img src="../../assets/images/icon_statistics.png" alt class="img_icon_2" />
          <p class="person_num">4</p>
        </div>
      </div>
      <div class="middle">
        <el-form :model="SearchFrom">
          <div class="search_box">
            <el-input v-model="SearchFrom.search" class="seach_input" placeholder="请输入监控名称、编号"></el-input>
          </div>
          <div class="person_table">
            <el-table
              :data="tableData"
              :header-cell-style="{background:'#F3F4F8'}"
            >
              <el-table-column prop="Name" label="名称">
                  <template slot-scope="scope">
                  <span class="NameColor">{{scope.row.Name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="Read" label="读数"></el-table-column>
              <el-table-column prop="Floor" label="下限">
                <template slot-scope="scope">
                  <span class="FloorColor">{{scope.row.Floor}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="Upper" label="上限">
                  <template slot-scope="scope">
                  <span class="UpperColor">{{scope.row.Upper}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="Adress" label="地址"></el-table-column>
              <el-table-column fixed="right" label="操作" class="handle">
                <template>
                  <el-button type="text" size="small" class="compile" @click="SetAids">设置</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form>
      </div>
    </div>
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
          Name: "红外测温仪  CTB-15006",
          Read: "78.3 ℃",
          Floor: "16.0",
          Upper: "22.5",
          Adress: "厂区A区油气乙丙烯炼化车间",
        },
        {
          Name: "红外测温仪  CTB-15006",
          Read: "78.3 ℃",
          Floor: "16.0",
          Upper: "22.5",
          Adress: "厂区A区油气乙丙烯炼化车间",
        },
        {
          Name: "红外测温仪  CTB-15006",
          Read: "78.3 ℃",
          Floor: "16.0",
          Upper: "22.5",
          Adress: "厂区A区油气乙丙烯炼化车间",
        },
        {
          Name: "丙烷压力表  YW-604",
          Read: "78.3 ℃",
          Floor: "16.0",
          Upper: "22.5",
          Adress: "厂区A区油气乙丙烯炼化车间",
        },
      ],
    };
  },
  methods: {
    SetAids() {
        this.$router.push(`/TemperatureAidsDetail`)
    },
  },
};
</script>

<style lang="scss" scoped>
.container /deep/ .compile {
  color: #0ebf9c;
}
.container /deep/ .FloorColor {
  color: #febc56 ;
}
.container /deep/ .UpperColor{
    color: #FF445E;
}
.container /deep/ .NameColor {
 margin-left: 30px; ;
}
.container /deep/ .el-table th:first-child>.cell:first-child{
    margin-left: 30px;
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
      }
    }
  }
}
</style>