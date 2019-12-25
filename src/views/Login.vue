<template>
	<div>
		
	<div style="width: 100%;position: relative;">
		<div id="head" style="width: 100px;height: 100px;background-color: #FFFFFF;border-radius:50% ;margin: 0 auto;position:relative;top:55px;box-shadow: rgba(10, 0, 0, 0.09) 0px 4px 40px 0px;z-index: 99;">
			<img src="../assets/new_york.png" alt="" width="100%" height="100%" style="border-radius:50%;opacity: 0.7;">
		</div>

		<div v-show="LoginShow" id="main" style="width: 96%;margin: 0 auto;height: 554px;border-radius:5px;background-color: rgb(255,255,255);box-shadow: rgba(0, 0, 0, 0.08) 0px 7px 25px 0px;margin-top:10px;position: relative;">
			<div style="width:86%;height: 344px;margin: 0 auto;position: relative;top: 80px;">
				<div style="width: 100%;height: 19px;color:#44a0b3;opacity:50.0%;font-size: 18px;text-align: center;line-height: 19px;margin-bottom: 20px;">欢迎登陆华夏社区</div>
				<div style="width: 100%;height: 19px;color:#44a0b3;opacity:50.0%;font-size: 14px;text-align: left;margin-bottom:15px;">账户</div>
				<input type="text" v-model="InputName" style="border: none;background-color:rgb(244,250,251);opacity:6.00%;border-radius:3px;width: 94%;height: 46px;margin-bottom: 25px;"
				 placeholder="名字与密码位2-18位之间">
				<div style="width: 15%;height: 19px;color:#44a0b3;opacity:50.0%;font-size: 14px;text-align: left;margin-bottom: 15px;float: left;">密码</div>
				<div style="width:23%;height: 19px;color:#44a0b3;font-size:14px;margin-bottom: 5px;float: right;font-weight: bold;line-height: 19px;"><span
					 style="border-bottom:1px solid #44a0b3;" class="RePwd" @click="inLostPwd">忘记密码</span></div>
				<input type="password" v-model="InputPwd" style="border: none;background-color:rgb(244,250,251);opacity:6.00%;border-radius:3px;width: 94%;height: 46px;margin-bottom: 25px;"
				 placeholder="不要输错噢">
				<div style="width: 100%;height: 19px;color:#44a0b3;opacity:50.0%;font-size: 14px;text-align: left;margin-bottom: 15px;">验证码</div>
				<input type="text" v-model="InputCode" style="border: none;background-color:rgb(244,250,251);opacity:6.00%;border-radius:3px;width:50%;height: 46px;margin-bottom: 25px;float: left;">
				<img :src='changeLogin' alt="" style="float: right;width: 40%;height: 46px;" @click="changeCode()">
				<input type="button" class="btnPwd" value="Enter" @click="login()">
				<div @click="InRegister" style="width: 100%;height: 39px;line-height: 39px;text-align: center;font-size: 14px;color: #44a0b3;opacity: 50%;">没有账号？
					<span style="" class="re">注册</span></div>
			</div>
		</div>

		<div v-show="RegisterShow" id="main1" style="width: 96%;margin: 0 auto;height: 554px;border-radius:5px;background-color: rgb(255,255,255);box-shadow: rgba(0, 0, 0, 0.08) 0px 7px 25px 0px;margin-top:10px;position: relative;">
			<div style="width:86%;height: 344px;margin: 0 auto;position: relative;top: 80px;">
				<div style="width: 100%;height: 19px;color:#44a0b3;opacity:50.0%;font-size: 18px;text-align: center;line-height: 19px;margin-bottom: 20px;">欢迎注册华夏社区</div>
				<div style="width: 100%;height: 19px;color:#44a0b3;opacity:50.0%;font-size: 14px;text-align: left;margin-bottom:15px;">账户</div>
				<input type="text" v-model="RegisterName " @change="testRegisterName()" style="border: none;background-color:rgb(244,250,251);opacity:6.00%;border-radius:3px;width: 94%;height: 46px;margin-bottom: 25px;"
				 placeholder="名字与密码位2-18位噢">
				<div style="width: 15%;height: 19px;color:#44a0b3;opacity:50.0%;font-size: 14px;text-align: left;margin-bottom: 15px;float: left;">密码</div>
				<div style="width:23%;height: 19px;color:#44a0b3;font-size:14px;margin-bottom: 5px;float: right;font-weight: bold;line-height: 19px;"></div>
				<input type="password" v-model=" RegisterPwd" style="border: none;background-color:rgb(244,250,251);opacity:6.00%;border-radius:3px;width: 94%;height: 46px;margin-bottom: 25px;"
				 placeholder="不要输错噢">
				<div style="width: 100%;height: 19px;color:#44a0b3;opacity:50.0%;font-size: 14px;text-align: left;margin-bottom:15px;">暗号</div>
				<input type="text" v-model=" anhao" style="border: none;background-color:rgb(244,250,251);opacity:6.00%;border-radius:3px;width: 94%;height: 46px;margin-bottom: 25px;"
				 placeholder="万一忘了密码呢">
				<input type="button" class="btnPwd" value="注册" @click="Register()">
				<div @click="InLogin" style="width: 100%;height: 39px;line-height: 39px;text-align: center;font-size: 14px;color: #44a0b3;opacity: 50%;">返回</div>
			</div>
		</div>

		<div v-show="LostPwd" id="main2" style="width: 96%;margin: 0 auto;height: 554px;border-radius:5px;background-color: rgb(255,255,255);box-shadow: rgba(0, 0, 0, 0.08) 0px 7px 25px 0px;margin-top:10px;position: relative;">
			<div style="width:86%;height: 344px;margin: 0 auto;position: relative;top: 80px;">
				<div style="width: 100%;height: 19px;color:#44a0b3;opacity:50.0%;font-size: 18px;text-align: center;line-height: 19px;margin-bottom: 20px;">找回密码</div>
				<div style="width: 100%;height: 19px;color:#44a0b3;opacity:50.0%;font-size: 14px;text-align: left;margin-bottom:15px;">账户</div>
				<input type="text" v-model="LostName" @change="testInputName()" style="border: none;background-color:rgb(244,250,251);opacity:6.00%;border-radius:3px;width: 94%;height: 46px;margin-bottom: 25px;">
				<div style="width: 20%;height: 19px;color:#44a0b3;opacity:50.0%;font-size: 14px;text-align: left;margin-bottom: 15px;float: left;">你的暗号</div>
				<div style="width:23%;height: 19px;color:#44a0b3;font-size:14px;margin-bottom: 5px;float: right;font-weight: bold;line-height: 19px;"></div>
				<input type="password" v-model=" Lostanhao" style="border: none;background-color:rgb(244,250,251);opacity:6.00%;border-radius:3px;width: 94%;height: 46px;margin-bottom: 25px;">
				<div style="width: 100%;height: 19px;color:#44a0b3;opacity:50.0%;font-size: 14px;text-align: left;margin-bottom:15px;">你的新密码</div>
				<input type="password" v-model=" LostNewPwd" style="border: none;background-color:rgb(244,250,251);opacity:6.00%;border-radius:3px;width: 94%;height: 46px;margin-bottom: 25px;">
				<input type="button" class="btnPwd" value="确定">
				<div @click="LostInLogin()" style="width: 100%;height: 39px;line-height: 39px;text-align: center;font-size: 14px;color: #44a0b3;opacity: 50%;">返回</div>
			</div>
		</div>

	</div>
	
	<div style="width: 100%;height: 200px;"></div>
	</div>
</template>
<script>
	import {
		TweenMax,
		Power2,
		TimelineLite
	} from "gsap"
	export default {
		name: "",
		data: () => ({
			InputName: "",
			InputCode: "",
			InputPwd: "",
			changeLogin: "http://39.107.87.97/api/code.php?code_classif=0",
			LoginShow: true,
			RegisterName: "",
			RegisterPwd: "",
			anhao: "",
			LostPwd: false,
			RegisterShow: false,
			LostName: '',
			Lostanhao: '',
			LostNewPwd: ''
		}),
		methods: {
			//注册按钮
			Register() {
				var _this = this
				this.$axios.post('/api/register.php', {
						username: this.RegisterName,
						password: this.RegisterPwd,
						safe: this.anhao
					})
					.then(function(response) {
						_this.$message(response.data.msg)
						if (response.data.code == 1) {
							_this.$axios.post('/api/login.php', {
									username: _this.RegisterName,
									password: _this.RegisterPwd
								})
								.then(function(response) {
									if (response.data.code == 1) {
										_this.$cookies.set('token', response.data.data.token, -1)
										_this.$router.push({
											name: 'MyHome',
											
										})
										alert()
									}
								})
						}
					})
			},
			//忘记密码界面返回登陆
			LostInLogin() {
				var _this = this
				$("#main2").addClass('moveY'),
					TweenMax.to('#head', 0.5, {
						y: -100,
						repeat: 1,
						yoyo: true,
						onComplete: function() {
							$("#main2").removeClass('moveY')
							_this.RegisterShow = false
							_this.LoginShow = true
							_this.LostPwd = false
						}
					})
			},
			//进入忘记密码界面
			inLostPwd() {
				var _this = this
				$("#main").addClass('moveY'),
					TweenMax.to('#head', 0.5, {
						y: -100,
						repeat: 1,
						yoyo: true,
						onComplete: function() {
							$("#main").removeClass('moveY')
							_this.RegisterShow = false
							_this.LoginShow = false
							_this.LostPwd = true
						}
					})
			},
			//注册界面返回登陆界面
			InLogin() {
				var _this = this
				$("#main1").addClass('moveY'),
					TweenMax.to('#head', 0.5, {
						y: -100,
						repeat: 1,
						yoyo: true,
						onComplete: function() {
							$("#main1").removeClass('moveY')
							_this.RegisterShow = false
							_this.LoginShow = true
						}
					})
			},
			//进入注册界面
			InRegister() {
				var _this = this
				$("#main").addClass('moveY'),
					TweenMax.to('#head', 0.5, {
						y: -100,
						repeat: 1,
						yoyo: true,
						onComplete: function() {
							$("#main").removeClass('moveY')
							_this.RegisterShow = true
							_this.LoginShow = false
						}
					})
			},
			//判断登陆界面输入字符数量
			testInputName() {
				if (this.InputName.length < 2 || this.InputPwd.length > 18) {
					this.$message({
						message: '名字与密码为2-18位的字符',
						type: 'warning'
					});
				}
			},
			//判断注册输入字符是否小于六位
			testRegisterName() {
				if (this.RegisterName.length < 2) {
					this.$message({
						message: '名字密码暗号请输入大于2位小于18位的字母加数字',
						type: 'warning'
					});
				}
			},
			//改变验证码
			changeCode() {
				this.changeLogin = "http://39.107.87.97/api/code.php?code_classif=1?d=" + Math.random();
			},
			//检查验证码
			checkCode() {
				var _this = this
				this.testInputName()
				const url = '/api/code.php';
				let params = new URLSearchParams();
				params.append('code', this.InputCode);
				this.$axios({
					method: 'get',
					url: url,
					params: params,
				}).then((response) => {
					if (response.data.code == 1) {
						this.login()
					} else {
						_this.$message(response.data.msg)
					}
				}).catch((error) => {
					alert(error)
				})
			},
			//登陆
			login() {
				var _this = this
				if(this.InputName.length > 2 && this.InputName.length < 18 && this.InputPwd.length > 6 && this.InputPwd.length <18){
					
				this.$axios.post('/api/login.php', {
						username: this.InputName,
						password: this.InputPwd
					})
					.then(function(response) {
						console.log(response)
						if (response.data.code == 1) {
							_this.$cookies.set('token', response.data.data.token, -1)
							_this.$router.push({
								name: 'MyHome'
							})
						}
						if(response.data.code == 1014){
							_this.$message({
								message: "用户名不存在",
								type: 'warning'
							})
							}
							if (response.data.code == 1005) {
								_this.$message({
									message: "密码长度在6-18之间",
									type: 'warning'
								})
							}
						if (response.data.code == 1009) {
							_this.$message({
								message: "请检查账号或密码",
								type: 'warning'
							})
						}
					})
					}else{
						_this.$message({
							message: "请检查账号或密码长度",
							type: 'warning'
						})
					}

			}
		},
		components: {},
	}
</script>
<style>
	/** iPad **/
	@media only screen and (min-width: 768px) and (max-width: 1024px) {
	
		
	}
	
	@media only screen and (min-width: 300px) and (max-width: 430px) {
	
	.moveY {
		transition: 1s;
		-webkit-transform: rotateY(360deg);
	}

	.RePwd:active {
		opacity: 0.4;
	}

	.re {
		color: rgb(68, 160, 179);
		font-weight: bold;
		border-bottom: 1px solid rgb(68, 160, 179);
	}

	.re:active {
		opacity: 0.5;
	}

	body {
		background-color: rgb(251, 251, 251);
	}

	input {
		outline: none;
		color: #44a0b3;
		opacity: 6.00%;
		font-size: 13px;
		padding-left: 15px;
	}

	input::-webkit-input-placeholder {
		color: #44a0b3;
		opacity: 6.00%;
	}

	input::-moz-placeholder {
		color: #44a0b3;
		opacity: 6.00%;
	}

	input:-moz-placeholder {
		color: #44a0b3;
		opacity: 6.00%;
	}

	input:-ms-input-placeholder {
		color: #44a0b3;
		opacity: 6.00%;
	}

	.btnPwd {
		border: none;
		width: 100%;
		height: 48px;
		background-color: #44a0b3;
		box-shadow: rgba(68, 160, 179, 0.5) 0px 2px 7px 0px;
		border-radius: 3px;
		text-align: center;
		color: #FFFFFF;
		font-size: 16px;
		font-family: arial;
		font-weight: bold;
		margin-top: 20px;
	}

	.btnPwd:active {
		background-color: #44a0b3;
		opacity: 0.5;
	}
	}
</style>
