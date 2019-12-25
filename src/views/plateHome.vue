<template>
	<div>
		<div class="plateHomeBox">
			<div class="plateHomeHead">
				<router-link :to="{name:'plate'}" tag="li">
					<img src="../assets/icon/back.png" class="plateHomereturn">
					{{platename1}}
				</router-link>
			</div>
			<div class="plateHomeMain">
				<div v-for="item in contentList" :key="item.id">
					<div class="plateHomeMainBox">
						<div class="plateHomeBoxMainInBox" @click="inCheckPlate(item.id)">
							<div class="plateHomeMainBoxHead">
								<img :src="item.head_portrait" class="plateHomeMainBoxHeadImg">
								<div class="plateHomeMainBoxHeadUser">
									{{item.username}}
									<p>{{item.time}}</p>
								</div>
							</div>
							<div class="plateHomeMainBoxMainText">
								{{item.title}}
							</div>
							<div v-if="item.image1">
								<img :src="item.image1" class="plateHomeMainBoxMainImg">
							</div>
							<div class="plateHomeMainBoxBottom">
								<div class="plateHomeMainBoxBottomIcon1">
									<i class="el-icon-view "></i>
									{{item.browse}}
								</div>
								<div class="plateHomeMainBoxBottomIcon2">
									<i class="el-icon-chat-line-round "></i>
									{{item.comment_number}}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="plateHomeBottom">
					————没啦————
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "plateHome",
		data: () => ({
			plate_id: '',
			platename1: '33',
			contentList: []
		}),
		components: {},
		methods: {
			plateData() {
				if (this.$route.params.plateid1 != undefined) {
					this.plate_id = this.$route.params.plateid1
				}
				if (this.$route.query.plateid3 != undefined) {
					this.plate_id = this.$route.query.plateid3
				}
				this.$axios.post('/api/plate_data.php', {
					plate_id: this.plate_id
				}).then((response) => {
					if (response.data.code == 0) {
						this.$message(response.data.msg)
					}
					this.platename1 = response.data.plate_name
					this.contentList = response.data.data
				})
			},
			inCheckPlate(id) {
				this.$router.push({
					path: '/checkPlate',
					query: {
						invitation_id: id,
						plateid2: this.plate_id,
						on: 1
					}
				})
			}
		},
		created() {
			if (this.$route.params.platename == '买卖') {
				this.plate_id == 1
			}
			this.plateData()
		}
	}
</script>
<style>
	.plateHomeBottom {
		margin-bottom: 90px;
		text-align: center;
		width: 100%;
		padding-top: 30px;
		color: #99A9BF;
	}

	.plateHomeMainBoxBottomIcon2,
	.plateHomeMainBoxBottomIcon1 {
		width: 40%;
		height: 100%;
		font-size: 17px;
		float: right;
	}

	.plateHomeMainBoxBottom {
		position: absolute;
		width: 50%;
		height: 30px;
		bottom: 1%;
		right: 0%;

	}

	.plateHomeBoxMainInBox {
		position: relative;
		width: 94%;
		min-height: 140px;
		height: auto;
		margin: 10px;
	}

	.plateHomeMainBoxMainImg {
		width: 50%;
		height: 140px;
		margin: 0 auto;
		margin-bottom: 40px;
	}

	.plateHomeMainBoxMainText {
		width: 94%;
		height: 20px;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.plateHomeMainBoxHeadUser>p {
		font-size: 10px;
	}

	.plateHomeMainBoxHeadUser {
		position: absolute;
		top: 5%;
		left: 18%;
		width: 70%;
		height: 50px;
		font-size: 15px;
	}

	.plateHomeMainBoxHeadImg {
		width: 45px;
		height: 45px;
		padding-top: 5px;
		border-radius: 50%;
	}

	.plateHomeMainBoxHead {
		width: 94%;
		height: 50px;

	}

	.plateHomeMainBox {
		width: 100%;
		background-color: #FFFFFF;
		margin-bottom: 7px;
	}

	.plateHomereturn {
		position: absolute;
		left: 3%;
		width: 40px;
		height: 40px;
		margin-left: 1px;
		margin-top: 7px;
	}

	.plateHomeMain {
		width: 100%;
		margin-top: 7px;
	}

	.plateHomeHead {
		width: 100%;
		height: 60px;
		text-align: center;
		line-height: 60px;
		font-size: 25px;
		background-color: #FFFFFF;
	}

	.plateHomeBox {
		position: relative;
		top: 0%;
		width: 100%;
	}
</style>
