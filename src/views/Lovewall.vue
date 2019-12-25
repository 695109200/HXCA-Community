<template>
  <div>
    <div class="LovewallBox">
      <div class="lovewall-head">
        <router-link :to="{name:'Home'}" tag="li">
          <i class="el-icon-arrow-left lovewall-head-icon"></i>
        </router-link>
        <div class="lovewall-head-text">表白墙</div>
        <router-link :to="{name:'lovewallRelease'}" tag="li">
          <el-button plain class="lovewall-head-button">发表</el-button>
        </router-link>
      </div>
      <div class="lovewall-main">
        <div v-for="item in list">
          <div class="lovemain">
            <div class="lovewall-heard-love"><img src="../assets/icon/love3.png" class="lovewall-box-icon"></div>
            <div class="lovewall-box-title">
              <span>{{item.title}}</span>
            </div>
            <div class="lovewall-box-text">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>{{item.str}}</span>
            </div>
            <div class="lovewall-box-bottom">

              <div class="lovewall-box-bottom-user">
                {{item.username}}
              </div>
              <img :src="item.head_portrait" class="lovewall-box-bottom-head" />
            </div>
          </div>
        </div>
      </div>
      <div class="lovewall-bottom">
        ————没有了————
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input: '',
        list: []
      }
    },
    methods: {
      getLovewallData() {
      var _this = this
        this.$axios.post('/api/plate_data.php', {
            plate_id:1
          })
          .then(function(response) {
              _this.list = response.data.data
              if(response.data.code == 0 ){
                _this.$message("暂时没人表达心意哦")
              }
            })
          }
      },
      components: {},
      created() {
        this.getLovewallData()
      }
    }
</script>
<style>
  .lovewall-box-bottom-Time {
    position: absolute;
right: 0;
    font-size: 10px;
    line-height: 50px;
  }

  .LovewallBox {
    position: relative;
    top: 0;
    width: 100%;
    background-color: #FFFFFF;
  }

  .lovewall-bottom {
    width: 100%;
    height: 150px;
    text-align: center;
    line-height: 100px;
    color: #99A9BF;
  }

  .lovewall-box-bottom-user {
    float:right;
    text-align: center;
    line-height: 40px;
    margin-right: 5%;
  }

  .lovewall-box-bottom-head {
    float:right;
    width: 40px;
    height: 40px;
    margin-right: 5%;
    border-radius:50% ;
  }

  .lovewall-box-bottom {
    width: 100%;
    height: 40px;
    margin-top: 19%;
  }

  .lovewall-box-text {
    margin-left: 2px;
    margin: 10px;
  }

  .lovewall-box-title {
    text-align: center;
    font-size: 20px;
  }

  .lovewall-box-icon {
    left: 1%;
    top: 11%;
    width: 2.5rem;
    height: 1.875rem;
    transform: rotate(-35deg);
  }

  .lovewall-main {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 20px;
  }

  .lovemain {
    width: 100%;
    height: 210px;
    background-color: #FFFFFF;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }

  .lovewall-head {
    width: 100%;
    height: 50px;
    margin-bottom: 30px;
  }

  .lovewall-head-icon {
    position: absolute;
    font-size: 3rem;
    left: 2%;
    top: 0.5%;
  }

  .lovewall-head-text {
    text-align: center;
    line-height: 50px;
    font-size: 1.75rem;
    font-weight: 500;
  }

  .lovewall-head-button {
    position: absolute;
    top: 1%;
    right: 2%;
  }

  .lovewall-server {
    width: 80%;
    margin-bottom: 10px;
  }

  .lovewall-server-botton {
    position: absolute;
    width: 70px;
  }
</style>
