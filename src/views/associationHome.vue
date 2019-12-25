<template>
	<div>
		<div class="associationHomeBox">
			<div class="associationHomeHead">
				华夏社团
				<router-link :to="{name:'addPlate'}" tag="li">
					<div class="associationHomeHeadRigth">申请</div>
				</router-link>
			</div>
			<div v-for="item in associationHomeList">
				<router-link :to="{name:'associationDetails',params:{assid:item.name,assid2:item.id}}">
					<div class="associationHomeMainBox">
						<div class="associationHomeMainImgBox">
							<img :src="item.image" class="associationImg" />
						</div>
						<div class="associationHomeMainTitle">
							{{item.name}}
						</div>
						<div class="associationHomeMainText1">
							“ {{item.introduction}}
						</div>
						<div class="associationHomeMainText2">
							—— {{item.ters}}”
						</div>
					</div>
				</router-link>
			</div>
			<div>
				<router-link :to="{name:'Home'}" tag="li">
					<el-button round>返回</el-button>
				</router-link>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: "associationHome",
		data: () => ({
			associationHomeList: []
		}),
		methods: {},
		created() {
			this.$axios.get('/api/association/get_association_list.php').then((response) => {
				this.associationHomeList = response.data.data
			})
		}
	}
</script>

<style>
	a:link {
		color: black;
	}

	a:visited {
		color: black;
	}

	a:active {
		color: #000000;
	}

	* {
		list-style: none;
	}

	.associationImg {
		width: 100%;
		height: 100%;
	}

	.associationHomeMainText2 {
		width: 30%;
		height: 20px;
		left: 68%;
		top: 60%;
	}

	.associationHomeMainText1 {
		width: 66%;
		height: 20px;
		left: 28%;
		top: 40%;
	}

	.associationHomeMainText1,
	.associationHomeMainText2 {
		position: absolute;
		color: rgb(137, 132, 132);
		font-size: 13px;
		font-weight: 600;
	}

	.associationHomeHeadRigth {
		position: absolute;
		top: 1.5%;
		right: 5%;
		float: right;
		font-size: 15px;
	}

	.associationHomeMainTitle {
		position: absolute;
		width: 60%;
		height: 20px;
		left: 23%;
		top: 15%;
		font-size: 18px;
		font-family: "新宋体";
		font-weight: 900;
	}

	.associationHomeMainImgBox {
		position: absolute;
		width: 58px;
		height: 58px;
		top: 24%;
		left: 3%;
	}

	.associationHomeMainBox {
		position: relative;
		width: 92%;
		height: 113px;
		background-image: url(../assets/images/社团介绍背景1.png);
		margin: 0px 0px 0px 0px;
		background-size: 100% 100%;
		margin: 15px auto;
		border-radius: 10px;
	}

	.associationHomeBox {
		padding-top: 10px;
		position: relative;
		width: 100%;
		min-height: 880px;
		height: auto;
		background-color: #FFFFFF;
	}

	.associationHomeHead {
		width: 86%;
		height: 20px;
		margin: 0 auto;
		border-left: 6px solid rgb(101, 204, 141);
		font-size: 18px;
		font-weight: 600;
		line-height: 20px;
		padding-left: 10px;
	}
</style>
