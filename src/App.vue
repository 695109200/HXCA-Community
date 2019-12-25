<template>
	<div id="app">
		<keep-alive>
			<transition name="fade">
				<router-view v-if="isRouter" />
			</transition>
		</keep-alive>
		<div class="tabs">
			<ul>
				<router-link :to="{name:'Home'}" tag="li">
					<div><img src="http://39.107.87.97/icon/%E9%A6%96%E9%A1%B5.fea905e4.png" width="30px" height="30px" /></div>
					<div>主页</div>
				</router-link>
				<router-link :to="{name:'plate'}" tag="li">
					<div><img src="http://39.107.87.97/icon/%E8%B5%84%E8%AE%AF.6a5979b0.png" width="30px" height="30px" /></div>
					<div>板块</div>
				</router-link>
				<router-link :to="{name:'find'}" tag="li">
					<div><img src="http://39.107.87.97/icon/%E5%8F%91%E7%8E%B0.f9baa7f9.png" width="30px" height="30px" /></div>
					<div>发现</div>
				</router-link>
				<router-link :to="{name:'MyHome'}" tag="li">
					<div><img src="http://39.107.87.97/icon/%E6%88%91%E7%9A%84.489b07dd.png" width="30px" height="30px" /></div>
					<div>我的</div>
				</router-link>
			</ul>
		</div>
	</div>
</template>
<script>
	export default{
    name:'App',
    provide(){
      return{
        reload:this.reload
      }
    },
    data(){
      return{
        isRouter:true
      }
    },
    methods:{
      reload(){
        this.isRouter = false
        this.$nextTick(function(){
          this.isRouter = true
        })

      }
	}
  }
</script>

<style lang="less" type="text/less">
	/** iPad **/
	@media only screen and (min-width: 430px) and (max-width: 4024px) {
	.tabs {
	  position: fixed;
	  top: 0;
	  left: 0;
	  background-color: #FFFFFF;
	  box-shadow: 0 2px 4px #000;
	  width: 100%;
	  height: 50px;
	  z-index:9999;
	  color:rgba(255,255,255,0.1);
	  & > ul, & > ul > li {
	    margin: 0;
	    padding: 0;
	  }
	  ul {
	    display: table;
	    width: 100%;
	    & > li {
	      text-align: center;
	      font-size: 1px;
	      display: table-cell;
	      padding: 8px 12px;
	      &.router-link-active{
	        font-weight: 900;
	      }
	      & > div {
	        font-size: 1px;
	        & > i {
	          font-size: 1px;
	        }
	      }
	    }
	  }
	}
		
	}
	
	@media only screen and (min-width: 100px) and (max-width: 530px) {
	.tabs {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #FFFFFF;
    box-shadow: 0 2px 4px #000;
    width: 100%;
    z-index:9999;
    & > ul, & > ul > li {
      margin: 0;
      padding: 0;
    }
    ul {
      display: table;
      width: 100%;
      & > li {
        text-align: center;
        font-size: 16px;
        display: table-cell;
        padding: 8px 12px;
        &.router-link-active{
          color: #409EFF;
          background-color: #FFFFFF;
          font-weight: 900;
        }
        & > div {
          font-size: 14px;
          & > i {
            font-size: 30px;
          }
        }
      }
    }
  }
  .fade-enter-active,.fade-leave-active{
    transition: opacity .2s
  }
  .fade-enter,.fade-leave-active{
    opacity: 0;
  }
  }
</style>
