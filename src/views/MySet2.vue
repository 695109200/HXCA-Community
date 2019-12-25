<template>
  <div>
    <div class="MySetBoxHead">
      <router-link :to="{name:'MySet'}" tag="li">
      <div style="position: absolute;left: 0;">
      取消
      </div>
      </router-link>
      <div style="margin: 0 auto;">
        设置签名
      </div>
      <el-button type="primary" :disabled=" abutton =='1'?true:false" style="position: absolute;right: 0;top: 10px;" id="aa" @click="SetUserInfo()">确定</el-button>
    </div>
    <div style="width: 90%;margin: 0 auto;">
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="sign"
        maxlength="10"
        show-word-limit
        style='margin: 0 auto;'
      >
      </el-input>
    </div>
    <div class="InputBox">

    </div>
  </div>
</template>

<script>
  export default {
    name: "MySet1",
    data: () => ({
      sign: "",
      abutton:'1'
    }),
    watch:{
      sign(val){
        var _this = this
         if(this.sign == _this.$store.state.Sign){
           this.abutton = 1
         }
         if(this.sign != _this.$store.state.Sign){
           this.abutton = 0
         }
      }
    },
    methods: {
      SetUserInfo() {
        var _this = this
                this.$axios.post('/api/set_user_info.php',{
                    token: _this.$cookies.get('token'),
                    sign: _this.sign
                  }
                )
                  .then(function(response) {
					  if(response.data.code == 1){
						  _this.$store.state.Sign = _this.sign
                      _this.$router.push({name:'MySet'})
					  }
                  })
      }
    },
    components: {},
    mounted() {
    this.sign = this.$store.state.Sign
    }
  }
</script>

<style>
.MySetBoxHead{
  position: relative;
  width: 90%;
  height: 60px;
  margin-top: 10px;
  line-height: 60px;
}
</style>
