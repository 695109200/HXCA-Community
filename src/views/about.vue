<template>
  <div>
    <div class="aboutBox">
      <div class="aboutHead">关于我们</div>
      <div class="aboutText">{{aboutTxt}}</div>
      <div class="aboutButtonBox" align="center">
        <router-link :to="{name:'MyHome'}" tag="li">
          <el-button>知道了知道了</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "about",
    data: () => ({
      aboutTxt: ""
    }),
    methods: {

    },
    created() {
      this.$axios.get('/api/about.php')
        .then((response) => {
          this.aboutTxt = response.data.about
        })
    }
  }
</script>

<style>
  .aboutButtonBox {
    margin-top: 400px;
  }

  .aboutText {
    margin: 50px;
  }

  .aboutHead {
    width: 100%;
    height: 90px;
    text-align: center;
    line-height: 90px;
    font-size: 25px;
  }

  .aboutBox {
    top: 0%;
    width: 100%;
    height: 780px;
    background-color: #FFFFFF;
  }
</style>
