<template>
	<div>
		<div class="MyHomeBox">
			<!-- 头部 -->
			<div class="MyHomeHeadBox">
				<div class="MyHomeHeadSet">
				</div>
				<div class="MyHomeHead">
					<img :src='head_image' class="MyHomeHeadImg">
				</div>
				<div class="MyHomeHeadName">
					{{username}}
					<img :src='sex' class="MyHomeHeadNameIcon">
				</div>
				<div class="MyHomeHeadTxt">
					{{sign}}
				</div>
			</div>
			<!-- 中间 -->
			<div style="width: 100%;height: 500px;border-radius:18px 18px 0px 0px;margin-top: -15px;background-color: #FFFFFF;position: absolute;z-index: 99;">
				<div class="MyHomeMainBox">
					<!-- 中间选项 -->
					<div class="MyHomeMainOptionBox MyHomeMainOptionBox1">
						<img src="../assets/icon/ReleaseIcon.png" class="MyHomeMainOptionIcon">
						<router-link :to="{name:'MyRelease'}" tag="li">
							<div class="MyHomeMainOptionText1">
								我的发布
							</div>
						</router-link>
					</div>
					<div class="MyHomeMainOptionBox">
						<img src="../assets/icon/scIcon.png" class="MyHomeMainOptionIcon">
						<router-link :to="{name:'MyCollection'}" tag="li">
							<div class="MyHomeMainOptionText">
								我的收藏
							</div>
						</router-link>
					</div>
					<div class="MyHomeMainOptionBox">
						<img src="../assets/icon/CommentIcon.png" class="MyHomeMainOptionIcon">
						<router-link :to="{name:'MyComment'}" tag="li">
							<div class="MyHomeMainOptionText">
								我的评论
							</div>
						</router-link>
					</div>
					<div class="MyHomeMainOptionBox">
						<img src="../assets/icon/aboutIcon.png" class="MyHomeMainOptionIcon">
						<router-link :to="{name:'about'}" tag="li">
							<div class="MyHomeMainOptionText">
								关于我们
							</div>
						</router-link>
					</div>
					<div class="MyHomeMainOptionBox">
						<img src="../assets/icon/设置.png" class="MyHomeMainOptionIcon1">
						<router-link :to="{name:'MySet'}" tag="li">
							<div class="MyHomeMainOptionText">
								个人设置
							</div>
						</router-link>
					</div>
					<div class="MyHomeMainOptionBox">
						<div class="MyHomeMainOptionText" @click="exit()">
							退出登陆
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
	export default {
		name: "MyHome",
		data: () => ({
			sign: "",
			username: '',
			head_image: 'http://39.107.87.97/images/head.png',
			sex: ''
		}),
		methods: {
			set() {
				this.head_image = this.$store.state.HeadImg
				this.username = this.$store.state.Name
				this.sign = this.$store.state.Sign
				if (this.$store.state.sex ==1 || this.$store.state.sex == "女") {
					this.sex = 'http://39.107.87.97/icon/girlIcon.png'
				} else if (this.$store.state.sex == 0 || this.$store.state.sex == "男") {
					this.sex = 'http://39.107.87.97/icon/boyIcon.png'
				}
			},
			exit() {
				this.$cookies.remove('token')
				this.$router.push({
					name: 'Login'
				})
			},
			getUser() {
				var _this = this
				if (this.$cookies.isKey('token')) {
					//判断状态管理有没有数据
					if (this.$store.state.HeadImg) {
						_this.set()
					} else {
						_this.$axios.post('/api/user_info.php', {
								token: _this.$cookies.get('token')
							})
							.then(function(response) {
								if (response.data.code == 1) {
									_this.$store.commit("setHeadImg", response.data.data.head_portrait)
									_this.$store.commit("setName", response.data.data.username)
									_this.$store.commit("setSign", response.data.data.sign)
									_this.$store.commit("setsex", response.data.data.sex)
									_this.set()
								} else {
									_this.$router.push({
										name: 'Login'
									})
								}
							})
					}
				} else {
					_this.$router.push({
						name: 'Login'
					})
				}
			}
		},
		created() {
			this.getUser()
		}
	}
</script>

<style>
	* {
		list-style: none;
	}

	.MyHomeMainOptionText1 {
		position: absolute;
		top: 30%;
		left: 16%;
		font-weight: 700;
		letter-spacing: 2px;
	}

	.MyHomeMainOptionBox1 {
		margin-left: 1%;
	}

	.MyHomeMainOptionIcon1 {
		width: 27px;
		height: 27px;
		margin-left: 12px;
		margin-top: 18px;
	}

	.MyHomeMainOptionIcon {
		width: 50px;
		height: 50px;
		padding-top: 2.5%;
	}

	.MyHomeHeadNameIcon {
		position: absolute;
		width: 5.5%;
		height: 60%;
		top: 0%;
		left: 28%;
	}

	.MyHomeHeadImg {
		position: absolute;
		top: 110px;
		width: 60px;
		height: 60px;
	}

	.MyHomeHeadSetIcon {
		width: 80px;
		height: 130%;
		float: right;
	}

	.MyHomeHeadRelease {
		width: 90%;
		height: 10%;
		margin-left: 5%;
		color: #FFFFFF;
		font-size: 15px;
		margin-bottom: 10px;
	}

	.MyHomeHeadTxt {
		width: 90%;
		height: 10%;
		margin-left: 5%;
		color: #FFFFFF;
		font-size: 10px;
	}

	.MyHomeHeadName {
		position: relative;
		width: 90%;
		height: 12%;
		margin-left: 5%;
		color: #FFFFFF;
		font-weight: 600;
	}

	.MyHomeHead {
		margin-top: 65px;
		width: 250px;
		height: 50px;
		margin-left: 5%;
		margin-bottom: 3%;
	}

	.MyHomeHeadSet {
		width: 100%;
		height: 20%;
		font-size: 40px;
	}

	.MyHomeMainOptionText {
		position: absolute;
		top: 30%;
		left: 17%;
		font-weight: 700;
		letter-spacing: 2px;
	}

	.MyHomeBottomButton,
	.MyHomeBottomButton2 {
		width: 51%;
		height: 50%;
		text-align: center;
		float: left;

		padding-top: 4%;
		font-weight: 600;
		letter-spacing: 2px;
	}

	.MyHomeMainOptionBox:active {
		color: rgb(226, 226, 226);
	}

	.MyHomeMainOptionBox {
		position: relative;
		width: 100%;
		height: 20%;
	}

	.MyHomeBottomBox {
		width: 100%;
		height: 25%;
	}

	.MyHomeMainBox {
		width: 90%;
		height: 330px;
		margin-left: 1%;
	}

	.MyHomeHeadBox {
		position: relative;
		width: 100%;
		height: 250px;
		background-image: url(../assets/images/MeMainBg.png);
		margin: 0px 0px 0px 0px;
		background-size: 100% 100%;
	}

	.MyHomeBox {
		top: 0%;
		width: 100%;
		height: 800px;
	}
</style>
