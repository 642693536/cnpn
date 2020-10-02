<template>
  <div class="container">
    <div class="main">
      <el-page-header @back="backNotesTable" content="物联网设备 > 设备详情" class="go-back"></el-page-header>
      <div class="Form_table">
        <p class="title">设备详情</p>
        <p class="time">创建时间：2020-08-30 16:15:45</p>
        <div class="item__body">
          <el-form class="form" :model="AidForm">
            <el-form-item label="名称" label-width="100px">
              <el-input v-model="AidForm.preName" :disabled='true'></el-input>
            </el-form-item>
            <el-form-item label="读数" label-width="100px">
              <el-input v-model="AidForm.recNum" :disabled='true'></el-input>
            </el-form-item>
            <el-form-item label="K值" label-width="100px">
              <el-input v-model="AidForm.opcItem" :disabled='true'></el-input>
            </el-form-item>
            <el-form-item label="下限" label-width="100px">
              <el-input v-model="AidForm.preMinNum" placeholder="请输入下限值"></el-input>
            </el-form-item>
            <el-form-item label="上限" label-width="100px">
              <el-input v-model="AidForm.preMaxNum" placeholder="请输入上限值"></el-input>
            </el-form-item>
            <el-form-item label="地址" label-width="100px">
              <el-input v-model="AidForm.preAddress" placeholder="请输入地址"></el-input>
            </el-form-item>
            <el-form-item label="监控设备" label-width="100px">
              <el-select 
              v-model="AidForm.cameraIndexCode" 
              placeholder="选择设备" 
              @change="getpresetsList" 
              class="point">
                <el-option 
                 v-for="(item,index) in AidsList"
              :key="index"
              :label="item.cameraName"
              :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设置预备点位" label-width="100px">
               <el-select v-model="AidForm.presetId" placeholder="选择点位" class="point">
            <el-option
              v-for="(item,index) in presetsList"
              :key="index"
              :label="item.presetPointName"
              :value="item.id"
            ></el-option>
          </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="btnbox">
          <div class="ok" @click="Setaidsdetail">确定</div>
          <div class="fail" @click="backNotesTable">返回</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {selectPressureList,getEquipmentList,perfectPressure,presetsLocalSearches} from '../../api/api'
export default {
  data() {
    return {
      AidForm: {
        preName: "",
        recNum: "",
        opcItem:"",
        preMinNum: "",
        preMaxNum: "",
        preAddress: "",
        cameraIndexCode: "",
        presetId:''
      },
      id:this.$route.params.id,
      AidsList:[],
      presetsList:[],
      cameraIndexCode:'',
      createTime:''
    };
  },
  methods: {
    // 返回按钮
    backNotesTable() {
      this.$router.go(-1);
    },
    //获取详情
    getDeatilInfo(){
      let param = {
        preId:this.id
      }
       selectPressureList(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
          this.AidForm.preName = data.result[0].preName;
          this.AidForm.opcItem = data.result[0].opcItem;
          this.AidForm.preMinNum = data.result[0].preMinNum;
          this.AidForm.preMaxNum = data.result[0].preMaxNum;
          this.AidForm.preAddress = data.result[0].preAddress;
          this.AidForm.cameraIndexCode = data.result[0].equipment.id;
          this.AidForm.presetId = data.result[0].pePreBase.id;
          this.AidForm.recNum = data.result[0].recNum;
          this.createTime = data.result[0].createTime
          console.log(this.createTime);
          let param = {
            cameraIndexCode: data.result[0].equipment.cameraIndexCode
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
    getAidsList(){
      let param = {}
      getEquipmentList(param).then((res) => {
        let {head, data} = res
        if(head.code == 200) {
        this.AidsList = data.result
        }else{
          this.$message({
            type: "error",
            message: head.message,
            showClose: true,
          });
        }
      })
    },
    //设置设备详情
    Setaidsdetail(){
      let param = {
        preAddress:this.AidForm.preAddress,
        preId:this.id,
        preMaxNum:this.AidForm.preMaxNum,
        preMinNum:this.AidForm.preMinNum,
        equId:this.AidForm.cameraIndexCode,
        presetId:this.AidForm.presetId
      }
        perfectPressure(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
           this.$message({
            type: "success",
            message: '修改成功',
            showClose: true,
          });
          this.$router.push(`/PressureAids`)
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
    getpresetsList(value){
      let obj = {};
      obj = this.AidsList.find((item) => {
        return item.id === value; // 筛选出匹配数据
      });
      this.cameraIndexCode = obj.cameraIndexCode;
      let param = {
        cameraIndexCode: this.cameraIndexCode,
      };
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
   
  },
  mounted(){
    this.getDeatilInfo();
    this.getAidsList();
  }
};
</script>

<style lang="scss" scoped>
.container /deep/ .el-page-header__content {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #9a9a9a;
}
 .container /deep/ .point .el-input__inner::placeholder {
        color:#0EC09C;
        font-weight: bold;
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
  font-weight: bold;
  color: #343434;
}
.container /deep/ .el-form {
  margin: 0 auto;
}
.container /deep/ .el-form-item {
  text-align: center;
}
.container {
  background: #fff;
  min-height: 830px;
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
        margin-top: 58px;
        width: 100%;
        .form {
          display: inline-block;
          text-align: center;
        }
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
  }
}
</style>