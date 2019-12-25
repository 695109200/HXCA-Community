<template>
	<div>
		<div class="MySetBoxHead">
			<router-link :to="{name:'MyHome'}" tag="li">
				<img src="../assets/icon/return2.png" style="width: 40px;height: 30px;position: absolute;left: 0px;top: 16px;">
				个人信息
			</router-link>
		</div>
		<div class="MySetBoX">
			<div class="MySetInBox">
				<div class="InBoxoption InBoxoption1">
					头像
					<span style="float: right;font-weight: bold; color: rgb(178,178,178);font-size: 20px;line-height: 80px;">></span>
					<input type="file" style="filter:alpha(opacity:5);opacity:0;position:absolute;z-index: 88;width:100%;height: 80px;left: 0;top: 0;"
					 @change="changeHead(this)" id="input">
					<div class="optionHead">
						<img :src="head_image" width="100%" height="100%">
					</div>
				</div>
				<router-link :to="{name:'MySet1'}" tag="li">
					<div class="InBoxoption">名字
						<span style="float: right;font-weight: bold; color: rgb(178,178,178);font-size: 20px;line-height: 60px;">></span>
						<span style="float: right;font-weight: bold; color: rgb(127,127,127);font-size: 16px;line-height: 60px;margin-right: 10px;">{{username}}</span>
					</div>
				</router-link>
				<router-link :to="{name:'MySet2'}" tag="li">
					<div class="InBoxoption">签名
						<span style="float: right;font-weight: bold; color: rgb(178,178,178);font-size: 20px;line-height: 60px;">></span>
						<span style="float: right;font-weight: bold; color: rgb(127,127,127);font-size: 16px;line-height: 60px;margin-right: 10px;">{{sign}}</span>
					</div>
				</router-link>
				<router-link :to="{name:'MySet3'}" tag="li">
					<div class="InBoxoption">性别
						<span style="float: right;font-weight: bold; color: rgb(178,178,178);font-size: 20px;line-height: 60px;">></span>
						<span style="float: right;font-weight: bold; color: rgb(127,127,127);font-size: 16px;line-height: 60px;margin-right: 10px;">{{sex}}</span>
					</div>
				</router-link>
				<div class="InBoxoption" @click="inPwd()">修改密码
					<span style="float: right;font-weight: bold; color: rgb(178,178,178);font-size: 20px;line-height: 60px;">></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: '',
		data: () => ({
			head_image: '',
			username: '',
			sign: '',
			sex: ''
		}),
		methods: {
			inPwd() {
				this.$router.push({
					name: 'MySetPwd'
				})
			},
			changeHead(f) {
				let file = document.getElementById("input").files[0];
				let data = new FormData();
				var _this = this
				let reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function(e) {
					data.append('image', this.result);
					_this.$axios.post('/api/head_portrait.php', {
							token: _this.$cookies.get('token'),
							image: data.get("image")
						})
						.then((response) => {
							_this.$axios.post('/api/user_info.php', {
									token: _this.$cookies.get('token')
								})
								.then(function(response) {
									_this.setStore(response)
								})
						})
				}
			},
			setStore(response){
				this.$store.commit("setHeadImg", response.data.data.head_portrait)
				this.$store.commit("setName", response.data.data.username)
				this.$store.commit("setSign", response.data.data.sign)
				this.$store.commit("setsex", response.data.data.sex)
				this.head_image = this.$store.state.HeadImg
				this.username = this.$store.state.Name
				this.sign = this.$store.state.Sign
				this.sex = this.$store.state.sex
			},
			GetUser() {
				this.head_image = this.$store.state.HeadImg
				this.username = this.$store.state.Name
				this.sign = this.$store.state.Sign
				if(this.$store.state.sex == 1){
					this.sex = "女"
				}else{
				this.sex = "男"
				}
				
				var _this = this
				if (!this.$cookies.isKey('token')) {
					_this.$router.push({
						name: 'Login'
					})
				}
			}
		},
		created() {
				this.GetUser()
		}
	}
</script>

<style>
	.optionHead {
		position: absolute;
		right: 35px;
		top: 10px;
		width: 60px;
		height: 60px;
		float: right;
	}

	.MySetBoxHead {
		margin: 0 auto;
		width: 92%;
		height: 40px;
		line-height: 40px;
		font-weight: bold;
		font-size: 18px;
		text-align: center;
		margin-top: 20px;
		margin-bottom: 23px;
	}

	.MySetBoX {
		margin: 0 auto;
		width: 92%;
		height: 400px;
	}

	.MySetInBox {
		width: 92%;
		height: 400px;
	}

	.InBoxoption {
		height: 60px;
		width: 100%;
		line-height: 60px;
		padding: 0 10px;
		border-bottom: 1px solid rgb(226, 226, 226);
		font-size: 16px;
	}

	.InBoxoption1 {
		height: 80px;
		line-height: 80px;
		position: relative;
	}

	.InBoxoption:active {
		background-color: rgb(226, 226, 226);
	}
</style>
