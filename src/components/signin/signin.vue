<template>
  <div class="signin">
    <el-form label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">洪泰智造工场后台管理系统</h3>
      <el-form-item>
        <el-input v-model="form.username" auto-complete="on" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="form.password" auto-complete="on" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.captcha" auto-complete="on" placeholder="验证码"></el-input>
      </el-form-item>
      <el-form-item style="margin-bottom: 10px;">
        <span id="getImg"><img :src="imgUrl" style="width:30%; height:100%;" @click="captcha"><label for="" @click="captcha">换一张</label></span>
      </el-form-item>
      <el-checkbox v-model="checked">记住帐号</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" class="submit" style="width:100%;" @click="signin" @keyup.enter="signin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import signin from './signin'
export default signin
</script>

<style lang="scss">
@import "./signin"
</style>
