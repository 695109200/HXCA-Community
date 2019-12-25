<template>
	<div>
		<div class="checkPlateBox">
			<div class="plateHomeHead">
				<img src="../assets/icon/back.png" class="plateHomereturn" @click="returnHome(plateid)">
				<div style="position: absolute;top:0;left: 38%;font-weight: 900;">
					查看帖子
					<div style="position: absolute;right: -120px;top:-5px">
						<el-button plain @click="collect()" id="cc">收藏</el-button>
					</div>
				</div>
			</div>
			<div class="checkPlateMainBox">
				<div class="checkPlateBoxMainInBox">
					<div class="checkPlateMainBoxHead">
						<img :src="HeadUrl" class="checkPlateMainBoxHeadImg">
						<div class="checkPlateMainBoxHeadUser">
							{{Username}}
							<p>{{time}}</p>
						</div>
					</div>
					<div class="checkPlateMainBoxMainText">
						{{str}}
					</div>
					<div v-for="item1 in image">
						<div v-if="imgTrue">
							<img :src="item1" class="checkPlateMainBoxMainImg">
						</div>
					</div>
				</div>
				<div style="width: 100%;height: 30px;background-color: #FFFFFF;"></div>
			</div>

			<div class="checkPlateComment">
				<div style="width: 100%;height: 30px;"></div>
				<div v-for="item in CommentkList">
					<div class="CommentLi">
						<div style="float: left;width:20%;height: 100%;background-color: #FFFFFF;">
							<img :src="item.HeadUrl" style="width: 40px;height:40px;border-radius:50% ;margin-left:10px;margin-top: 10px;">
						</div>
						<div style="float: left;width: 80%;height: 100%;background-color: #FFFFFF;border-bottom: 1px solid #D3DCE6;">
							<div style="width: 90%;height: 20px;margin-top: 10px;">{{item.username}}</div>
							<div style="width: 90%;height: 15px;font-size: 10px;">{{item.time}}</div>
							<div style="max-width: 90%;min-height:15px;height: auto; margin-top: 20px;word-wrap:break-word">
								{{item.text}}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="checkPlateRelease" align="center">
				我也说两句
				<el-input placeholder="请输入内容" v-model="checkPlaterRelease" clearable class="checkPlateInput" maxlength="30">
				</el-input>
				<el-button type="primary" class="checkPlateButton" @click="outComment()">发布</el-button>
			</div>
			<div class="Bottom">
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "checkPlate",
		data: () => ({
			plateid3: '',
			id: '',
			checkPlateImg: '',
			title: '',
			str: '',
			time: '',
			Username: '',
			HeadUrl: '',
			checkPlateid: '',
			checkPlaterRelease: "",
			CommentkList: [],
			imgTrue: false,
			image: [],
			on: ''
		}),
		methods: {
			// 返回
			returnHome(id) {
				if (this.on) {
					this.$router.push({
						path: '/plateHome',
						query: {
							plateid3: this.$route.query.plateid2,
						},
					})
				} else {
					this.$router.push({
						path: '/Home'
					})
				}
			},
			//发表
			outComment() {
				var _this = this
				if (this.checkPlaterRelease != '') {
					this.$axios.post('/api/comment.php', {
						token: _this.$cookies.get('token'),
						invitation_id: this.checkPlateid,
						str: this.checkPlaterRelease
					}).then((response) => {
						console.log(response)
						if (response.data.code == 1) {
							_this.$message('发表成功')
							this.reload()
						} else if (response.data.code == 1013) {
							_this.$message('请先登录')
						}else if (response.data.code == 1068) {
							_this.$message('评论长度在6-18')
						}
					})
				} else {
					_this.$message('你还没有说话')
				}
			},
			//收藏按钮API
			collect() {
				var _this = this
				this.$axios.post('/api/collect.php', {
					token: _this.$cookies.get('token'),
					invitation_id: this.checkPlateid
				}).then((response) => {
					if (response.data.code == 1) {
						this.$message('收藏成功')
							$("#cc").css('background-color', '#409EFF')
							$("#cc").css('color', '#FFFFFF')
					} else if (response.data.code == 1013) {
						this.$message('请先登录')
					}
					if (response.data.code == 1066) {
						_this.$axios.post('/api/delete_collect.php', {
							token: _this.$cookies.get('token'),
							invitation_id: _this.checkPlateid
						}).then((response) => {
							$("#cc").css('background-color', '#FFFFFF')
							$("#cc").css('color', 'black')
						})
					}
					if (response.data.code == 1021) {
						this.$router.push({name:'Login'})
						}
				})
			},
			//获取帖子数据
			GetPlate() {
				var _this = this
				this.on = this.$route.query.on
				this.checkPlateid = this.$route.query.invitation_id
				//获取详情数据
				this.$axios.post('/api/invitation_data.php', {
						invitation_id: _this.checkPlateid
					})
					.then((response) => {
						_this.HeadUrl = response.data.data.head_portrait
						_this.Username = response.data.data.usernsme
						_this.time = response.data.data.time
						_this.str = response.data.data.str
						_this.plateid = response.data.data.id
						//判断有没有图片
						if (response.data.data.image != undefined) {
							_this.image = response.data.data.image
							_this.imgTrue = 'true'
						}
						//获得评论内容
						this.GetComm(response.data.data.id)
					})
			},
			//判断有没有收藏
			GetColl() {
				var _this = this
				if (_this.$cookies.get('token')) {
					this.$axios.post('/api/my_collect.php', {
						token: _this.$cookies.get('token')
					}).then((response) => {
						if (response.data.code == 1) {
							for (var i = 0; i < response.data.data.length; i++) {
								if (_this.checkPlateid == response.data.data[i].id) {
									$("#cc").css('background-color', '#409EFF')
									$("#cc").css('color', '#FFFFFF')
								}
							}
						}
					})
				}
			},
			// 判断日期
			GetTime(){
				var a = new Date()
				var date = new Date();
				var seperator1 = "-";
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				var currentdate = year + seperator1 + month + seperator1 + strDate;
				return currentdate
			},
			//获得评论内容
			GetComm(id){
				var _this = this
				_this.$axios.post('/api/get_invitation_comment.php', {
						invitation_id: id
					})
					.then((response) => {
						for (var i = 0; i < response.data.data.length; i++) {
							if( this.GetTime() == response.data.data[i].time.substring(0, 10)) {
								_this.CommentkList.push({
									id: response.data.data[i].floor,
									text: response.data.data[i].str,
									time: response.data.data[i].time.substring(10, 19),
									HeadUrl: response.data.data[i].head_portrait,
									username: response.data.data[i].username
								})
							} else {
								_this.CommentkList.push({
									id: response.data.data[i].floor,
									text: response.data.data[i].str,
									time: response.data.data[i].time,
									HeadUrl: response.data.data[i].head_portrait,
									username: response.data.data[i].username
								})
							}
						}
					})
			},
		},
		inject: ['reload'],
		created() {
			this.GetPlate()
			this.GetColl()
		}
	}
</script>

<style>
	.plateHomereturn {
		position: relative;
		height: 40px;
		width: 40px;
		left: 0;
		top: 5px;
	}

	.plateHomeHead {
		width: 100%;
		height: 50px;
		line-height: 50px;
	}

	.checkPlateButton {
		margin-bottom: 10%;
	}

	.checkPlateInput {
		margin-top: 10%;
		margin-bottom: 10%;
	}

	.checkPlateRelease {
		margin-top: 10%;
		width: 100%;
		height: 90px;
	}

	.Bottom {
		width: 100%;
		height: 200px;
	}

	.CommentUserName {
		position: absolute;
		top: 36%;
		left: 5%;
		font-size: 10px;
	}

	.CommentUserTime {
		position: absolute;
		top: 30%;
		right: 10%;
		font-size: 10px;
	}

	.CommentUserHeadImg {
		width: 60%;
		height: 60%;
		border-radius: 50%;
		margin-top: 10%;
	}

	.CommentUserHead {
		float: left;
		height: 100%;
		width: 20%;
		margin-right: 10%;
	}

	.CommentLi {
		width: 100%;
		height: 140px;

	}

	.checkPlateComment {
		width: 100%;
		min-height: 300px;
		height: auto;
		background-color: #FFFFFF;
		border-top: 2px solid rgb(226, 226, 226);
	}

	.checkPlateBoxMainInBox {
		position: relative;
		width: 94%;
		min-height: 140px;
		height: auto;
		padding: 10px;
	}

	.checkPlateMainBoxMainImg {
		width: 150px;
		height: 150px;
		margin: 0 auto;
	}

	.checkPlateMainBoxMainText {
		width: 94%;
		height: 20px;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.checkPlateMainBoxHeadUser>p {
		font-size: 10px;
	}

	.checkPlateMainBoxHeadUser {
		position: absolute;
		top: 5%;
		left: 18%;
		width: 70%;
		height: 50px;
		font-size: 15px;
	}

	.checkPlateMainBoxHeadImg {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.checkPlateMainBoxHead {
		width: 90%;
		height: 50px;
	}

	.checkPlateMainBox {
		width: 100%;
		background-color: #FFFFFF;
		margin-bottom: 7px;
	}

	.checkPlateBox {
		position: relative;
		top: 0%;
		width: 100%;
		min-height: 600px;

		z-index: 997;
		background-color: #FFFFFF;
	}
</style>
