<template>
  <div class="container">
    <div class="infinite-list-wrapper">
       <ul class="List"
       v-infinite-scroll="load"
       infinite-scroll-disabled="disabled"
       >
      <li
        class="item"
        v-for="(item,index) in MenuList"
        :key="index"
        :class="{status_active:isActive(index)}"
        @click="statusChangeHandle(item,index);DetailHandle(item.clientId)"
      >
        <div class="radio"></div>
        <p class="content">{{item.orgName}}</p>
      </li>
    </ul>
     <el-row style="height: 60px" v-if="loading"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"></el-row>
            
    </div>
   
    <div class="creatDept" @click="CreatDialog">新建部门</div>
    <el-dialog :visible.sync="creatVisible" class="addperson" custom-class="addRoleDialog">
         <p class="topname">新建部门</p>
         <el-form :model="DeptForm">
               <el-form-item  label-width="80px">
            <el-input v-model="DeptForm.Name" placeholder="请输入部门名称"></el-input>
          </el-form-item>
         </el-form>
         <div class="btnbox">
            <div class="ok" @click=" CreatDeptHandle">确定</div>
            <div class="fail"  @click=" CreatDeptHandle">取消</div>
          </div>
    </el-dialog>
  </div>
</template>

<script>
import { getOrgList,createOrg } from '../../api/api'
export default {
  data() {
    return {
      MenuList: [],
      currentInedx: '', // 筛选状态的选中index
      creatVisible:false,
      DeptForm:{
        Name:''
      },
      loading: false,
      pages:1,
      total:'',
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
    //跳转部门详情
     DetailHandle(id){
        this.$router.push(`/DeparmentDetail/${id}`)
      },
    //新建部门Dialog
    CreatDialog(){
        this.creatVisible = true;
    },
    //确定新建部门
    CreatDeptHandle(){
        let param = {
          orgName:this.DeptForm.Name
        }
        createOrg(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
          this.$message({
            type: "success",
            message: '添加成功',
            showClose: true,
          });
          this.DeptForm.Name = ''
          this.MenuList = []
          this.pages = 1
          this.total = ''
          this.getOrgList(1)
        } else {
          this.$message({
            type: "error",
            message: head.message,
            showClose: true,
          });
        }
      });
        this.creatVisible =false;
    },
    //获取部门列表
    getOrgList(page){
      let param = { pageNo: page}
       getOrgList(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
          this.MenuList = data.result
          this.total = data.total
        } else {
          this.$message({
            type: "error",
            message: head.message,
            showClose: true,
          });
        }
      });
    },
    //滚动加载部门
    load(){
      this.loading = true;
      setTimeout(() => {
      let param = { pageNo: this.pages += 1 }
          getOrgList(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
          this.MenuList = [...this.MenuList,...data.result]
          this.loading = false;//原因就是这个你loading一直处于true当然加载不出来了，再教你一招系统启动的哈这样就不用npm了，可以直接启动打包就是下面那个
          console.log(this.MenuList);
           if(this.MenuList.length >= data.total){
           this.loading = false;
           } 
        } else {
          this.$message({
            type: "error",
            message: head.message,
            showClose: true,
          });
        }
      });
        }, 500);
    }
  },
  computed:{
    disabled() {
        return  this.MenuList.length >= this.total
      }
  },
  mounted(){
    this.getOrgList(this.pages)
  }
};
</script>

<style lang="scss" scoped>
.container /deep/ .addRoleDialog {
  width: 480px;
  height: 235px;
}
.container /deep/ .el-input__inner{
    width: 360px;
    height: 32px;
}
.container /deep/ .el-form-item__content{
    margin-left: 60px !important;
}
.container {
    width: 208px;
    background: #fff;
    .infinite-list-wrapper{
      width: 100%;
       .List {
    width: 208px;
    height: 700px;
    overflow-x: hidden;
    overflow-y: scroll;
    margin-top: 30px;
    .item {
      display: flex;
      height: 32px;
      line-height: 32px;
      width: 148px;
      margin: 0 auto;
      margin-bottom: 40px;
      font-size: 16px;
      cursor: pointer;
      &.status_active {
        background: #fdbc56;
        border-radius: 16px;
        color: #fff;
      }
      &.status_active .radio {
        background: #fff;
      }
      .radio {
        width: 6px;
        height: 6px;
        line-height: 6px;
        background: #666666;
        border-radius: 50%;
        margin-right: 10px;
        margin-left: 20px;
        margin-top: 15px;
      }
      .content {
        text-align: center;
      }
    }
  }
  .List::-webkit-scrollbar {
    display: none;
  }
    }
 
  .creatDept {
    width: 148px;
    height: 32px;
    background: #0ec09c;
    border-radius: 4px;
    margin: 0 auto;
    text-align: center;
    line-height: 32px;
    color: #fff;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    margin-top: 50px;
    cursor: pointer;
    margin-bottom: 30px;
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
     .btnbox {
        display: flex;
        justify-content: space-between;
        width: 224px;
        // margin: 0 auto;
        margin-left: 100px;
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
        }
        .fail {
          width: 64px;
          height: 32px;
          line-height: 32px;
          background: #F3F4F8;
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