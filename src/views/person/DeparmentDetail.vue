<template>
  <div class="container">
    <div class="main">
      <div class="top">
        <div class="title_box">
          <img src="../../assets/images/icon_employee.png" alt class="img_icon" />
        <p class="title_name">{{deptName}}</p>
          <img src="../../assets/images/icon_operating.png" alt class="img_icon_3" @click="CompileDeptDialog" v-clickoutside="handleClose"/>
        </div>
        <div class="person_box">
          <img src="../../assets/images/icon_statistics.png" alt class="img_icon_2" />
          <p class="person_num">{{total}}</p>
        </div>
        <div class="OutBox" v-show="OutBox">
          <div class="item" @click="CompileDialog">
            <img src="../../assets/images/icon_edit.png" alt class="item_img" />
            <p class="item_name">编辑名称</p>
          </div>
          <div class="item" @click="DeleteDeptDialog">
            <img src="../../assets/images/icon_delete.png" alt class="item_img" />
            <p class="item_name">删除部门</p>
          </div>
        </div>
      </div>
      <div class="search_box">
        <el-input v-model="SearchFrom.search" class="seach_input" placeholder="请输入姓名"></el-input>
        <div class="middle">
        <p
          class="activity__status_item"
          v-for="(item,index) of chooseStatusList"
          :key="index"
          :class="{status_active:isActive(index)}"
          @click="statusChangeHandle(item,index)"
        >{{item}}</p>
      </div>
        <div class="add_act" @click="addStaff">添加员工</div>
      </div>
      
      <div class="formTable" v-show="InsideStaff">
        <el-table :data="tableData" :header-cell-style="{background:'#F3F4F8'}">
          <el-table-column prop="Code" label="序号">
            <template slot-scope="scope">
              <span class="NameColor">{{scope.row.Code}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="Name" label="姓名"></el-table-column>
          <el-table-column prop="Code" label="工号"></el-table-column>
          <el-table-column
            prop="Department"
            label="部门"
            :filters="searchListStatus"
            :filter-method="filterStatus"
          ></el-table-column>
          <el-table-column prop="Phone" label="联系方式"></el-table-column>
          <el-table-column fixed="right" label="操作" class="handle">
            <template>
              <el-button type="text" size="small" class="detail" @click="CheckDetailHandle">查看详情</el-button>
              <el-button type="text" size="small" class="compile">编辑</el-button>
              <el-button type="text" size="small" class="delete" @click="deleteUser">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="formTable" v-show="EpibolyStaff">
        <el-table :data="itemData" :header-cell-style="{background:'#F3F4F8'}">
          <el-table-column prop="Code" label="序号">
            <template slot-scope="scope">
              <span class="NameColor">{{scope.row.Code}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="Name" label="姓名"></el-table-column>
          <el-table-column prop="Code" label="工号"></el-table-column>
          <el-table-column
            prop="Department"
            label="部门"
            :filters="EpibolyListStatus"
            :filter-method="filterStatus"
          ></el-table-column>
          <el-table-column prop="Phone" label="联系方式"></el-table-column>
          <el-table-column fixed="right" label="操作" class="handle">
            <template>
              <el-button type="text" size="small" class="detail" @click="CheckDetailHandle">查看详情</el-button>
              <el-button type="text" size="small" class="compile">编辑</el-button>
              <el-button type="text" size="small" class="delete" @click="deleteUser">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :visible.sync="creatVisible" class="addperson" custom-class="addRoleDialog">
      <p class="topname">添加员工</p>
      <el-form :model="StaffForm">
        <div class="FirstStep" v-show="TableShow">
          <el-form-item label="类型" label-width="80px">
            <el-select v-model="StaffForm.Type">
              <el-option
                v-for="(item,index) in StaffList"
                :key="index"
                :label="item.StaffName"
                :value="item.StaffId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" label-width="80px">
            <el-input v-model="StaffForm.Name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="工号" label-width="80px">
            <el-input v-model="StaffForm.Code" placeholder="请输入姓工号"></el-input>
          </el-form-item>
          <el-form-item label="部门" label-width="80px" class="Department">
            <el-select v-model="StaffForm.Department">
              <el-option
                v-for="(item,index) in DepartmentList"
                :key="index"
                :label="item.orgName"
                :value="item.orgIndexCode"
              ></el-option>
            </el-select>
            <span class="creatdet">创建部门</span>
          </el-form-item>
          <el-form-item label="联系方式" label-width="80px">
            <el-input v-model="StaffForm.Contact" placeholder="请输入联系方式"></el-input>
          </el-form-item>
          <div class="btnbox">
            <div class="ok" @click="nextstep">下一步</div>
            <div class="fail">取消</div>
          </div>
        </div>
        <div class="LastStep" v-show="ImgShow">
          <el-upload
            class="avatar-uploader"
            action="http://120.24.4.16:30013/equipment/field/uploadImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="StaffForm.imageUrl" :src="StaffForm.imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="btnbox">
            <div class="ok" @click="AddStaffHandle">确定</div>
            <div class="fail">取消</div>
          </div>
        </div>
      </el-form>
    </el-dialog>
    <!-- 删除员工 -->
    <el-dialog
      :visible.sync="deleteVisible"
      :show-close="false"
      custom-class="deletebox"
      class="deleteDialog"
    >
      <div class="topbox">
        <img src="../../assets/images/icon_caveat_red.png" alt class="ImgIcon" />
        <p class="msg">确定删除该员工信息？</p>
      </div>
      <p class="content">员工信息删除后，员工将无法正常进入厂区！</p>
      <div class="btnbox">
        <div class="ok" @click="deletetRole">删除</div>
        <div class="fail" @click="deletePersonHandle">取消</div>
      </div>
    </el-dialog>
    <!-- 编辑部门 -->
    <el-dialog :visible.sync="compileVisible" class="compileperson" custom-class="compileDialog">
         <p class="topname">编辑部门</p>
         <el-form :model="DeptForm">
               <el-form-item  label-width="80px">
            <el-input v-model="DeptForm.Name" placeholder="请输入部门名称"></el-input>
          </el-form-item>
         </el-form>
         <div class="btnbox">
            <div class="ok" @click="CompileDeptHandle">确定</div>
            <div class="fail"  @click="CompileDeptHandle">取消</div>
          </div>
    </el-dialog>
    <!-- 删除部门 -->
    <el-dialog
      :visible.sync="deleteDeptVisible"
      :show-close="false"
      custom-class="deletebox"
      class="deleteDialog"
    >
      <div class="topbox">
        <img src="../../assets/images/icon_caveat_red.png" alt class="ImgIcon" />
        <p class="msg">确定删除该岗位？</p>
      </div>
      <p class="content">岗位删除后，岗位列表内的所有员工请在员工管理列表查看！</p>
      <div class="btnbox">
        <div class="ok" @click="DeleteDeptHandle">删除</div>
        <div class="fail" @click="DeleteDeptHandle">取消</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener("click", documentHandler);
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener("click", el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  },
};
import { removeOrg , updateOrg, selectStaffList, addStaff, getOrgList, uploadImg} from '../../api/api'
export default {
  data() {
    return {
      SearchFrom: {
        search: "",
      },
      chooseStatusList: ["内部员工", "外包员工"], // 可筛选的状态
      currentInedx: 0, // 筛选状态的选中index
      tableData: [
        {
          Code: "001",
          Name: "李国斌",
          Code: "zgsy2003",
          Department: "机电工程部",
          Phone: "18988886666",
        },
        {
          Code: "001",
          Name: "李国斌",
          Code: "zgsy2003",
          Department: "机电工程部",
          Phone: "18988886666",
        },
        {
          Code: "001",
          Name: "李国斌",
          Code: "zgsy2003",
          Department: "轨迹巡检部",
          Phone: "18988886666",
        },
        {
          Code: "001",
          Name: "李国斌",
          Code: "zgsy2003",
          Department: "轨迹巡检部",
          Phone: "18988886666",
        },
      ],
      itemData: [
        {
          Code: "001",
          Name: "李国斌222",
          Code: "zgsy2003",
          Department: "轨迹巡检部",
          Phone: "18988886666",
        },
        {
          Code: "001",
          Name: "李国斌222",
          Code: "zgsy2003",
          Department: "轨迹巡检部",
          Phone: "18988886666",
        },
        {
          Code: "001",
          Name: "李国斌222",
          Code: "zgsy2003",
          Department: "机电工程部",
          Phone: "18988886666",
        },
        {
          Code: "001",
          Name: "李国斌222",
          Code: "zgsy2003",
          Department: "轨迹巡检部",
          Phone: "18988886666",
        },
      ],
      InsideStaff: true,
      EpibolyStaff: false,
      searchListStatus: [
        { text: "轨迹巡检部", value: "轨迹巡检部" },
        { text: "机电工程部", value: "机电工程部" },
      ],
      EpibolyListStatus: [
        { text: "轨迹巡检部", value: "轨迹巡检部" },
        { text: "机电工程部", value: "机电工程部" },
      ],
      creatVisible: false,
      deleteVisible: false,
      compileVisible:false,
      deleteDeptVisible:false,
      StaffForm: {
        Type: "",
        Name: "",
        Code: "",
        Department: "",
        Contact: "",
        imageUrl: "",
      },
      StaffList: [
        { StaffName: "内部员工", StaffId: "0" },
        { StaffName: "外包员工", StaffId: "1" },
      ],
      DepartmentList: [
        { DepartmentName: "轨迹巡检部", DepartmentfId: "1" },
        { DepartmentName: "电气工程部", DepartmentfId: "2" },
        { DepartmentName: "安全工程部", DepartmentfId: "3" },
        { DepartmentName: "质检工程部", DepartmentfId: "4" },
        { DepartmentName: "自动化工程部", DepartmentfId: "5" },
      ],
      TableShow: true,
      ImgShow: false,
      OutBox:false,
      DeptForm:{
        Name:''
      },
      id:[this.$route.params.id],
      deptName:'',
      total:'',
      staffType:'',/*员工类别*/
      staffName:'',/*员工姓名*/
      staffCode:'',/*员工工号*/
      orgIndexCode:'',/*员工部门*/
      phoneNo:'',/*员工联系方式*/
      staffImg:'',/*员工照片*/
      orgIndexCode:'',
      deptId:[]
    };
  },
  directives: { clickoutside },
  methods: {
    isActive(i) {
      if (this.currentInedx === i) {
        return true;
      }
    },
    /*状态过滤（搜索）*/
    statusChangeHandle(status, i) {
      this.currentInedx = i;
      if (status == "外包员工") {
        this.InsideStaff = false;
        this.EpibolyStaff = true;
        let param = {
        isDept:true,
        orgIds:this.id,
        staffType:1
      }
      selectStaffList(param).then((res) => {
        let {head, data} = res
        if(head.code == 200) {
        this.itemData = data.result
        }else{
          this.$message({
            type: "error",
            message: head.message,
            showClose: true,
          });
        }
      })

      } else if (status == "内部员工") {
        this.EpibolyStaff = false;
        this.InsideStaff = true;
         let param = {
        isDept:true,
        orgIds:this.id,
        staffType:0
      }
      selectStaffList(param).then((res) => {
        let {head, data} = res
        if(head.code == 200) {
        this.tableData = data.result
        }else{
          this.$message({
            type: "error",
            message: head.message,
            showClose: true,
          });
        }
      })
      }
    },
    // 订单状态筛选
    filterStatus(value, row) {
      //分页
      //this.totalLen = data.total;
      return row.Department === value;
    },
    //添加员工弹出框
    addStaff() {
      this.creatVisible = true;
      this.ImgShow = false;
      this.TableShow = true;
    },
    //下一步
    nextstep() {
      this.TableShow = false;
      this.ImgShow = true;
      this.staffType = this.StaffForm.Type
      this.staffName = this.StaffForm.Name
      this.staffCode = this.StaffForm.Code
      this.orgIndexCode = this.StaffForm.Department
      this.phoneNo = this.StaffForm.Contact
    },
    //添加员工确定
    AddStaffHandle(){
      let param = {
        staffType:this.staffType,
        staffName:this.staffName,
        staffCode:this.staffCode,
        orgIndexCode:this.orgIndexCode,
        phoneNo:this.phoneNo,
        staffImg:this.StaffForm.imageUrl
      }
      addStaff(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
          this.$message({
            type: "success",
            message: '添加成功',
            showClose: true,
          });
          this.getdatalist()
        } else {
          this.$message({
            type: "error",
            message: head.message,
            showClose: true,
          });
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.StaffForm.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 100 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 200KB!");
      }
      return isJPG && isLt2M;
    },
    //查看详情
    CheckDetailHandle() {
      this.$router.push(`/StaffDetail`);
    },
    //删除员工
    deletetRole() {
      this.deleteVisible = false;
    },
    //取消删除
    deletePersonHandle() {
      this.deleteVisible = false;
    },
    //删除监控弹出框
    deleteUser() {
      this.deleteVisible = true;
    },
    //编辑部门弹出框
    CompileDeptDialog(){
        this.OutBox = true;
    },
    handleClose(e){
        this.OutBox = false;
    },
     //编辑部门Dialog
    CompileDialog(){
        this.compileVisible = true;
        this.OutBox = false
    },
    //确定编辑部门
    CompileDeptHandle(){
        this.compileVisible =false;
        let param  = {
          orgName:this.DeptForm.Name,
          orgIndexCode:this.orgIndexCode,
        }
         updateOrg(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
          this.$message({
            type: "success",
            message: '修改成功',
            showClose: true,
          });
          this.getdatalist()
        } else {
          this.$message({
            type: "error",
            message: head.message,
            showClose: true,
          });
        }
      });
    },
    //删除部门Dialog
    DeleteDeptDialog(){
      this.deleteDeptVisible = true;
        this.OutBox = false;
    },
    //确定删除部门
    DeleteDeptHandle(){
      this.deleteDeptVisible = false;
      let param = {
        ids:this.deptId
      }
      removeOrg(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
          this.$message({
            type: "success",
            message: '删除成功',
            showClose: true,
          });
          this.$router.push(`/PostManage`)
        } else {
          this.$message({
            type: "error",
            message: head.message,
            showClose: true,
          });
        }
      });
    },
    //获取部门详情
    getdatalist(){
      let param = {
        isDept:true,
        orgIds:this.id,
        staffType:0
      }
      selectStaffList(param).then((res) => {
        let {head, data} = res
        if(head.code == 200) {
        this.tableData = data.result
        this.deptName = data.listName
        this.total = data.total
        }else{
          this.$message({
            type: "error",
            message: head.message,
            showClose: true,
          });
        }
      })
    },
    //获取所有部门
    gerdeptList(){
      let param = {
        pageSize:100
      }
      getOrgList(param).then((res) => {
        let { head, data } = res;
        if (head.code == 200) {
          this.DepartmentList = data.result
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
  mounted(){
    this.getdatalist();
    this.gerdeptList();
  }
};
</script>

<style lang="scss" scoped>
.container /deep/ .deletebox {
  width: 480px;
  height: 220px;
}
.container /deep/ .el-table th:first-child > .cell {
  margin-left: 30px;
}
.container /deep/ .NameColor {
  margin-left: 30px;
}
.container /deep/ .compile {
  color: #febc56;
  margin-right: 30px;
}
.container /deep/ .delete {
  color: #ff445e;
}
.container /deep/ .detail {
  color: #0ebf9c;
  margin-right: 30px;
}
.container /deep/ .addRoleDialog {
  width: 520px;
  height: 500px;
}
.container /deep/ .compileDialog {
  width: 480px;
  height: 235px;
}
.container /deep/ .compileDialog >.el-input__inner{
    width: 360px;
    height: 32px;
}
.container /deep/.compileDialog >.el-form-item__content{
    margin-left: 60px !important;
}
.container /deep/ .el-input__inner {
  width: 282px;
  height: 32px;
}
.container /deep/ .Department .el-input__inner {
  width: 223px;
  height: 32px;
}
.container /deep/ .el-upload {
  margin-left: 150px;
  margin-top: 30px;
}
.container /deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.container /deep/ .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.container /deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.container /deep/ .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.container {
  width: 1400px;
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
        .img_icon_3 {
          width: 16px;
          height: 16px;
          margin-left: 10px;
          margin-top: 5px;
          cursor: pointer;
        }
      }
      .person_box {
        display: flex;
        .img_icon_2 {
          width: 16px;
          height: 16px;
          margin-right: 11px;
          margin-top: 5px;
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
      .OutBox {
          position: absolute;
          left: 400px;
          top:20px;
        width: 160px;
        height: 80px;
        background:#fff;
        border-radius: 4px;
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
        z-index: 99;
        .item {
          width: 160px;
          height: 40px;
          display: flex;
          cursor: pointer;
          .item_img {
            display: block;
            width: 16px;
            height: 16px;
            margin-top: 11px;
            margin-left: 40px;
            margin-right: 10px;
          }
          .item_name {
            line-height: 40px;
          }
        }
      }
    }
    .search_box {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .seach_input {
        width: 240px;
        height: 40px;
      }
      .add_act {
        width: 128px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #0ebf9c;
        border-radius: 4px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #ffffff;
        cursor: pointer;
      }
       .middle {
      text-align: center;
      display: flex;
      width: 200px;
      justify-content: space-between;
      .activity__status_item {
        height: 25px;
        cursor: pointer;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #9a9a9a;
        &.status_active {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #101010;
          border-bottom: 2px solid #0ec09c;
        }
      }
    }
    }
   
    .formTable {
      margin-top: 20px;
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
      .FirstStep {
        width: 480px;
        margin-left: 40px;
        .msg {
          width: 359px;
          height: 27px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #febc56;
          margin-left: 30px;
        }
        .creatdet {
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #febc56;
          margin-left: 20px;
          cursor: pointer;
        }
        .btnbox {
          display: flex;
          justify-content: space-between;
          width: 224px;
          // margin: 0 auto;
          margin-left: 100px;
          margin-top: 30px;
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
      .LastStep {
        width: 450px;
        // height: 450px;
        .btnbox {
          display: flex;
          justify-content: space-between;
          width: 224px;
          margin: 0 auto;
          margin-top: 40px;
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
    .deleteDialog {
      .topbox {
        display: flex;
        margin-top: 15px;
        margin-left: 60px;
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
        margin-left: 104px;
        margin-top: 1px;
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
    .compileperson {
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
}
</style>