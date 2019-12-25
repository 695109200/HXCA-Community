<template>
  <div>
    <div class="plateIndexBox">
      <div class="plateIndexBox">
        <div v-for="item in plate" style="width: 100%;">
          <router-link :to="{name:'plateHome',params:{platename:item.name,plateid1:item.id}  }" tag="li">
            <div style="width: 25%;height: 60px;float: left;text-align: center;line-height: 60px;margin-top: 20px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);margin-right: 10px;background-color: #FFFFFF;">
              {{item.name}}
            </div>
          </router-link>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: "plate",
    data: () => ({
      plate: []
    }),
    components: {},
    methods: {

    },
    created() {
      this.$axios.get('/api/get_plate.php')
        .then((response) => {
          if (response.data.code == 1) {
            this.plate = response.data.data
          } else {
            this.$message('暂时没有板块')
          }
        })
    }
  }
</script>

<style>
  body{
  }
  .plateIndexBox {
    width: 100%;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }


  .bg-purple-light {
    background: #e5e9f2;
  }


  .plateIndexBox {
    position: absolute;
    top: 0%;
    width: 100%;
    min-height: 680px;
  }
</style>
