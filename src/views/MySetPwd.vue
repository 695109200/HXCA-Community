<template>
  <div>
    <div class="MySetPwdBox">
     <div class="MySetBoxHead">
       <router-link :to="{name:'MySet'}" tag="li">
       <div style="position: absolute;left: 0;">
       取消
       </div>
       </router-link>
       <div style="margin: 0 auto;">
         修改密码
       </div>
       <el-button type="primary" :disabled=" abutton =='1'?true:false" style="position: absolute;right: 0;top: 10px;" id="aa" @click="setpwd()">确定</el-button>
     </div>
      <div class="MySetPwdInputBox">
        <div class="MySetPwdInputText">请输入你的旧密码</div>
        <el-input placeholder="请输入密码" v-model="oldpwd" show-password></el-input>
        <div class="MySetPwdInputText">请输入你的新密码</div>
        <el-input placeholder="请输入密码" v-model="newpwd1" show-password></el-input>
        <div class="MySetPwdInputText">请再次输入你的新密码</div>
        <el-input placeholder="请输入密码" v-model="newpwd2" show-password></el-input>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MySetPwd",
    data: () => ({
      oldpwd: '',
      newpwd1: '',
      newpwd2: '',
      abutton:'1'
    }),
    watch:{
      oldpwd(val){
      var _this = this
        if(this.oldpwd != ''){
          _this.abutton = '0'
        }
      },
      newpwd1(val){

      },
      newpwd2(val){

      }
    },
    methods: {
    setpwd(){
      if(this.newpwd1 == this.newpwd2){

      var _this = this
      this.$axios.post('/api/change_password.php',{
        token: _this.$cookies.get('token'),
        old_password: _this.oldpwd,
        new_password: _this.newpwd1
      })
      .then(function (response){
          if(response.data.msg == '旧password参数不符合要求'){
            _this.$message("原密码错误");
          }
          if(response.data.msg == '新password参数不符合要求'){
            _this.$message("新密码格式错误，6-10位哦");
          }
      }).catch(function (Error){
      })
      }else{
        this.$message("新密码与旧密码不一致");
      }
    }
    }
  }
</script>
<style>
  .MySetPwdButtonBox {
    margin-top: 30%;
  }

  .MySetPwdInputBox {
    text-align: center;
  }

  .MySetPwdInputText {
    margin: 20px;
    font-size: 18px;
  }

  .MySetPwdHead {
    width: 100%;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 25px;
  }

  .MySetPwdBox {
    position: relative;
    top: 0%;
    width: 100%;
    height: 900px;
    background-color: #FFFFFF;
  }
</style>
