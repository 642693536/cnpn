<template>
  <div class="login">
    <div class="Login_box">
      <div class="left_box">
        <div class="logo"></div>
        <div class="left_background"></div>
      </div>
      <div class="right_box">
        <div class="title">登录账号</div>
        <div class="box-card content-card">
          <el-form :model="loginForm" status-icon ref="loginForm" :rules="LoginRules">
            <el-form-item prop="userName">
              <el-input
                type="text"
                v-model="loginForm.userName"
                placeholder="请输入用户名"
                @keyup.enter.native="loginHandle"
              >
                <i
                  slot="prefix"
                  style="font-size:24px; line-height:56px; margin-right:20px;"
                  class="el-icon-user"
                ></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="userPassword">
              <el-input
                type="password"
                v-model="loginForm.userPassword"
                autocomplete="off"
                placeholder="请输入密码"
                @keyup.enter.native="loginHandle"
                show-password
              >
                <i slot="prefix" style="font-size:24px; line-height:56px;" class="el-icon-lock"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input
                placeholder="输入验证码"
                v-model="loginForm.code"
                @keyup.enter.native="loginHandle"
              ></el-input>
              <div class="Img_box" @click="CreatCode">
                <img :src="this.CodeUrl"/>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="btn__login" @click="loginHandle">登录</div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Login, GetCode} from "../../api/api";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        userName: "",
        userPassword: "",
        code: "",
      },
      LoginRules: {
        userName: [{ required: true, message: "请输入账号", trigger: "blur" }],
        userPassword: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
        ],
      },
      MD5loginForm: {
        userName: "",
        password: "",
      },
      randomCode: "", //验证码
      CodeUrl:'',
      ImgUrl:''
    };
  },
  methods: {
    /*登录*/
    loginHandle() {
        this.$refs.loginForm.validate((valid) => {
        if (valid) {
		  let param = this.loginForm;
          Login(param).then((res) => {
            if (res.head.code == 200) {
              localStorage.setItem("Authorization", JSON.stringify(res.data.token));
              localStorage.setItem("UserName",res.data.userName)
              this.$router.push("/");
              //权限设置
            } else {
              this.$message({
                type: "error",
                message: res.head.message,
                showClose: true,
              });
            }
          });
        } else {
          this.$message({
            type: "error",
            message: "登录出错",
            showClose: true,
          });
          return false;
        }
      });
    },
    //动态码的刷新
    refreshCodeHandle() {
      //生成随机数
      this.randomCode = randomString(4); //  4位随机字符串
    },
    //动态码
    CreatCode() {
        var num = Math.ceil(Math.random() * 10)
         this.CodeUrl = 'http://120.24.4.16:30013/code/createCode?' + num
    },
   
  },
  mounted() {
      this.CreatCode()
  },
};
function randomString(len) {
  len = len || 4;
  var chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789";
  var maxPos = chars.length;
  var pwd = "";
  for (var i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/varible";
/* Safari浏览器line-height问题 */
.login /deep/ .el-input__inner {
  line-height: 0;
  vertical-align: middle;
  height: 56px;
  text-indent: 10px;
  border: none;
  border-bottom: 1px solid #eeeeee;
}
.login /deep/ .el-form .el-form-item:nth-child(3) .el-input__inner {
  text-indent: 0;
}
.login {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  height: auto;
  background: url("../../assets/images/background.png") no-repeat;
  background-size: cover;
  .Login_box {
    width: 1546px;
    height: 800px;
    margin: 60px auto;
    display: flex;
    background: url("../../assets/images/backround01.png");
    .left_box {
      width: 50%;
      min-height: 800px;
      background-size: cover;
      .logo {
        width: 164px;
        height: 64px;
        background: url("../../assets/images/logo.png") no-repeat;
        margin-top: 60px;
        margin-left: 75px;
      }
      .left_background {
        width: 702px;
        height: 461px;
        background: url("../../assets/images/picture.png") no-repeat;
        margin-left: 120px;
        margin-top: 110px;
      }
    }
    .right_box {
      width: 50%;
      .title {
        font-size: 36px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #0ebf9c;
        text-align: center;
        margin-top: 150px;
        // letter-spacing: 5px;
      }
      .content-card {
        margin: 0 auto;
        margin-top: 105px;
        width: 400px;
        height: 300px;
        .card-title {
          font-size: 20px;
          color: $themeColor;
          text-align: center;
          margin-bottom: 37px;
          word-break: break-all;
          font-weight: bold;
        }
        .btn__login {
          width: 357px;
          height: 50px;
          line-height: 50px;
          font-size: 16px;
          margin: 0 auto;
          margin-top: 82px;
          background-color: $themeColor;
          color: #fff;
          font-weight: bold;
          border-radius: 4px;
          text-align: center;
          cursor: pointer;
        }
        .verify-code {
          background: rgba(14, 191, 156, 1);
          border-radius: 6px;
          color: #fff;
          font-size: 18px;
          margin-top: 10px;
          min-width: 85px;
        }
        .Img_box {
          position: absolute;
          top: 10px;
          left: 250px;
        }
      }
    }
  }
}
</style>