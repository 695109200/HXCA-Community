<template>
  <div>
    <div class="MyReleaseBox" id="MyReleaseBox">
      <div class="Release-heard">
        <router-link :to="{name:'MyHome'}" tag="li">
          <img src="../assets/icon/back.png" class="return">
        </router-link>
        <div id="Release"><span id="Releasetxt" class="nav-bottom-1">我的收藏</span></div>
      </div>


      <div id="Collection-main">
        <el-table :data="CollectionList" style="width: 100%">
          <el-table-column prop="CollectionName" label="收藏的主题">
          </el-table-column>
          <el-table-column prop="ColleCtionText" label="内容">
          </el-table-column>
          <el-table-column prop="date" label="日期">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click.native.prevent="deleteRow(scope.$index, CollectionList)" type="text" size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      CollectionList: []
    }),
    methods: {
        deleteRow(index, rows) {
          for(var i = 0 ; i < this.CollectionList.length ; i++){
            if(this.CollectionList[i].id == index){
              index = this.CollectionList[i].collection_id
            }
          }
              var _this = this
              this.$axios.post('/api/delete_collect.php',{
                token: _this.$cookies.get('token'),
                invitation_id:index
              }).then((response)=>{
                _this.$message("删除成功")
                this.reload()
              })
        }

    },
    inject:['reload'],
    mounted() {
      var _this = this
      this.$axios.post('/api/my_collect.php', {
        token: _this.$cookies.get('token')
      }).then((response) => {
        for (var i = 0; i < response.data.data.length; i++) {
          _this.CollectionList.push({
            id: i,
            CollectionName: response.data.data[i].title,
            ColleCtionText: response.data.data[i].str,
            date: response.data.data[i].time,
            collection_id: response.data.data[i].id
          })
        }
      })
    }
  }
</script>

<style>
</style>
