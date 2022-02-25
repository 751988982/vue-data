<template>
  <el-container class="login-container">
    <el-card class="animated flipInY">
      <div slot="header" class="el-card-header">
        <!-- <lang-select class="lang-select"></lang-select> -->
        <div style="clear: both" />
        <img src="@/assets/image/login-logo.png" alt="">
        <h2 class="login-title">后台管理系统</h2>
      </div>
      <el-form
        v-if="status == 0"
        ref="loginForm"
        :rules="rules"
        :model="loginForm"
      >
        <el-form-item prop="user_name" style="position: relative">
          <el-input
            v-model="loginForm.user_name"
            type="text"
            placeholder="请输入账号"
            @keyup.enter.native="goToPwdInput"
          />
          <span class="svg-container svg-container_user">
            <svg-icon icon-class="user" />
          </span>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            ref="password"
            v-model="loginForm.password"
            type="password"
            show-password
            placeholder="请输入密码"
            @keyup.enter.native="onLogin"
          />
          <span class="svg-container svg-container_password">
            <svg-icon icon-class="password" />
          </span>
        </el-form-item>
        <!-- <el-row>
          <el-link
            style="margin: 0 8px"
            @click="setstatus(1)"
          >使用手机验证码登录
          </el-link>
          <el-link style="margin: 0 8px" @click="setstatus(2)">找回密码</el-link>
          <el-link @click="setstatus(4)">注册</el-link>
        </el-row>
        <el-radio
          v-model="radio"
          fill="#ffffff"
          label="1"
          style="padding: 10px"
        >已阅读并同意<el-link type="primary">《知识付费服务协议》</el-link>和<el-link type="primary">《隐私协议》</el-link></el-radio> -->
        <el-button type="primary" @click="onLogin('loginForm')">登录</el-button>
      </el-form>
      <!-- <el-form
        v-if="status == 1"
        ref="loginForm"
        :rules="rules"
        :model="loginForm"
      >
        <el-form-item prop="user_name" style="position: relative">
          <el-input
            v-model="loginForm.user_name"
            type="text"
            placeholder="请输入手机号"
            @keyup.enter.native="goToPwdInput"
          />
          <span class="svg-container svg-container_user">
            <svg-icon icon-class="user" />
          </span>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginForm.verification" placeholder="请输入验证码">
            <el-button
              slot="append"
              @click="verification"
            >获取验证码</el-button>
          </el-input>
        </el-form-item>
        <el-row>
          <el-link
            style="margin: 0 8px"
            @click="setstatus(0)"
          >使用账号密码登录
          </el-link>
          <el-link @click="setstatus(2)">找回密码</el-link>
        </el-row>
        <el-radio
          v-model="radio"
          fill="#ffffff"
          label="1"
          style="padding: 10px"
        >已阅读并同意<el-link type="primary">《知识付费服务协议》</el-link>和<el-link type="primary">《隐私协议》</el-link></el-radio>
        <el-button type="primary" @click="onLogin('loginForm')">登录</el-button>
      </el-form>
      <el-form
        v-if="status == 2"
        ref="loginForm"
        :rules="rules"
        :model="updateForm"
      >
        <el-form-item prop="user_name" style="position: relative">
          <el-input
            v-model="updateForm.user_name"
            type="text"
            placeholder="请输入手机号"
            @keyup.enter.native="goToPwdInput"
          />
          <span class="svg-container svg-container_user">
            <svg-icon icon-class="user" />
          </span>
        </el-form-item>
        <el-form-item>
          <el-input v-model="updateForm.verification" placeholder="请输入验证码">
            <el-button
              slot="append"
              @click="verification"
            >获取验证码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            ref="password"
            v-model="updateForm.password1"
            type="password"
            show-password
            placeholder="请输入新密码"
            @keyup.enter.native="onLogin"
          />
          <span class="svg-container svg-container_password">
            <svg-icon icon-class="password" />
          </span>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            ref="password"
            v-model="updateForm.password2"
            type="password"
            show-password
            placeholder="请再次输入新密码"
            @keyup.enter.native="onLogin"
          />
          <span class="svg-container svg-container_password">
            <svg-icon icon-class="password" />
          </span>
        </el-form-item>
        <el-button type="primary" @click="upPassword">确定</el-button>
      </el-form>
      <el-form
        v-if="status == 4"
        :model="updateForm"
      >
        <el-form-item prop="user_name" style="position: relative">
          <el-input
            v-model="updateForm.user_name"
            type="text"
            placeholder="请输入手机号"
            @keyup.enter.native="goToPwdInput"
          />
          <span class="svg-container svg-container_user">
            <svg-icon icon-class="user" />
          </span>
        </el-form-item>
        <el-form-item>
          <el-input v-model="updateForm.verification" placeholder="请输入验证码">
            <el-button
              slot="append"
              @click="verification"
            >获取验证码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="updateForm.password1"
            type="password"
            show-password
            placeholder="请输入新密码"
          />
          <span class="svg-container svg-container_password">
            <svg-icon icon-class="password" />
          </span>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="updateForm.password2"
            type="password"
            show-password
            placeholder="请再次输入新密码"
          />
          <span class="svg-container svg-container_password">
            <svg-icon icon-class="password" />
          </span>
        </el-form-item>
        <el-row>
          <el-link
            style="margin: 0 8px"
            @click="setstatus(0)"
          >使用账户密码登录
          </el-link>
        </el-row>
        <el-button type="primary" @click="zhuce()">注册</el-button>
      </el-form> -->
    </el-card>
  </el-container>
</template>
<script>
import { isString } from '@/utils/validate'

export default {
  data() {
    // user_name 验证
    const validateUsername = (rule, value, callback) => {
      if (!isString(value)) {
        callback(new Error('请输入正确的账号'))
      } else {
        callback()
      }
    }
    // password 验证
    const validatePwd = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        user_name: '',
        password: '',
        verification: ''
      },
      updateForm: {
        user_name: '',
        password1: '',
        password2: '',
        verification: ''
      },
      status: 0,
      radio: 0,
      remember: false,
      loading: false,
      rules: {
        user_name: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateUsername },
          { required: true, trigger: 'change', validator: validateUsername }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validatePwd },
          { required: true, trigger: 'change', validator: validatePwd }
        ]
      }
    }
  },
  created() {
    // // 初始化时读取localStorage用户信息
    // if (loadFromLocal("remember", false)) {
    //   this.loginForm.user_name = loadFromLocal("user_name", "");
    //   this.loginForm.password = loadFromLocal("password", "");
    // } else {
    this.loginForm.user_name = ''
    this.loginForm.password = ''
    // }
  },
  methods: {
    // 登录操作
    onLogin() {
      // if (!this.radio) return this.$message.error('请阅读并同意《知识付费服务协议》和《隐私协议》')
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then((res) => {
              if (res.code == 200) {
                this.$router.push({
                  path: this.redirect || '/',
                  query: this.otherQuery
                })
              } else {
                this.$message.error(res.msg)
                this.loading = false
              }
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    // // 发送验证码
    // verification() {
    //   const { user_name } = this.loginForm

    //   if (!user_name) {
    //     this.$message.warning('请输入手机号')
    //     return
    //   }
    //   const params = {
    //     user_name
    //   }
    //   this.listLoading = true
    //   verif(params).then((res) => {
    //     this.listLoading = false
    //     this.$message.success(res.msg)
    //   })
    // },
    // // 修改密码
    // upPassword() {
    //   const { user_name, verification, password1, password2 } = this.updateForm

    //   if (password1 != password2) {
    //     this.$message.warning('请输入正确的密码')
    //     return
    //   }
    //   const params = {
    //     user_name,
    //     verification,
    //     password: password1
    //   }
    //   this.listLoading = true
    //   updatePassword(params).then((res) => {
    //     this.listLoading = false
    //     this.$message.success(res.msg)
    //     if (res.code == 200) this.status = 1
    //   })
    // },
    // // 注册
    // zhuce() {
    //   const { user_name, verification, password1, password2 } = this.updateForm
    //   if (password1 != password2) {
    //     this.$message.warning('请输入正确的密码')
    //     return
    //   }
    //   const params = {
    //     user_name,
    //     verification,
    //     password: password1
    //   }
    //   this.listLoading = true
    //   register(params).then((res) => {
    //     this.listLoading = false
    //     this.$message.success(res.msg)
    //     if (res.code == 200) this.status = 1
    //   })
    // },
    // setstatus(val) {
    //   this.status = val
    //   this.loginForm = {
    //     user_name: '',
    //     password: '',
    //     verification: ''
    //   }
    //   this.updateForm = {
    //     user_name: '',
    //     password1: '',
    //     password2: '',
    //     verification: ''
    //   }
    // }
  }
}
</script>
<style scoped>
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../../assets/image/login-bg.jpg") center no-repeat;
  background-size: cover;
  overflow: hidden;
}
.el-card {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -300px 0 0 -200px;
  width: 400px;
  height: 400px;
  background: #fff;
}
.el-card-header {
  text-align: center;
}
.login-title {
  margin: 0;
  text-align: center;
}
.el-input /deep/ .el-input__inner {
  text-indent: 12px;
}
.show-account {
  position: absolute;
  left: 15px;
  bottom: 20px;
  color: red;
}
.lang-select {
  float: right;
}
.el-button--primary {
  width: 100%;
}
.svg-container {
  position: absolute;
  top: 0;
  left: 5px;
  color: #889aa4;
}
</style>
