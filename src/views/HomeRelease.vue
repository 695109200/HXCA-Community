<template>
	<div>
		<div class="HomeRelease-Box">
			<div class="HomeRelease-inBox">
				<div class="HomeRelease-Box-Head">
					你的主题
				</div>
				<el-input v-model="ReleaseTheme" maxlength="18" show-word-limit placeholder="请输入三个字以上" @change="judgeReleaseTheme()"></el-input>
				</el-input>
				<div class="HomeRelease-Box-Head">
					说说你想说的话吧
				</div>
				<div class="HomeRelease-Box-Input">
					<el-input type="textarea" placeholder="请输入内容" v-model="HomeReleaseInput" maxlength="200" show-word-limit>
					</el-input>
				</div>
				<div class="HomeRelease-Box-main">
					选择你的图片吧
				</div>
				<el-upload :action="API()" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
				 :http-request=" uploadFileMethod" ref="upload" :limit="9">
					<i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
				<div align="center" class="choosePlate">
					发布到
					<el-select v-model="value" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="HomeRelease-button">
					<transition name="el-fade-in-linear">
						<el-button @click="submitUpload()">发布</el-button>
					</transition>
					<router-link :to="{name:'Home'}">
						<el-button>取消</el-button>
					</router-link>
				</div>
				<div style="width: 100%;height:200px;"></div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'HomeRelease',
		data: () => ({
			dialogImageUrl: '',
			dialogVisible: false,
			imgBox: '',
			length: '',
			value: '2',
			ReleaseTheme: '',
			HomeReleaseInput: '',
			param: new FormData(),
			options: [{
				value: '2',
				label: '买卖'
			}, {
				value: '3',
				label: '打听'
			}]
		}),
		methods: {
			//预览照片
			API() {
				return "/api/release_invitation.php";
			},
			//移除图片钩子
			handleRemove(file, fileList) {},
			//点击图片钩子
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			// 选择图片后的函数
			uploadFileMethod(file) {
				var _this = this
				let reader = new FileReader();
				reader.readAsDataURL(file.file);
				reader.onload = function(e) {
					_this.imgBox += this.result + ',,'
				}
			},
			///提交
			judgeReleaseTheme(){
				if(this.ReleaseTheme.length < 3 ){
					this.$message("主题请输入三个字以上")
				}
			},
			submitUpload() {
				if (this.ReleaseTheme != '' && this.HomeReleaseInput != '') {
					var _this = this
					this.imgBox = this.imgBox.substr(0, _this.imgBox.length - 2)
					this.param.append('image', this.imgBox)
					this.param.append('token', this.$cookies.get('token'))
					this.param.append('plate_id', this.value)
					this.param.append('str', this.HomeReleaseInput)
					this.param.append('title', this.ReleaseTheme)
					if (this.param.get('image')) {
						this.$axios.post('/api/release_invitation.php', {
								token: _this.param.get('token'),
								image: _this.param.get('image'),
								plate_id: _this.param.get('plate_id'),
								str: _this.param.get('str'),
								title: _this.param.get('title')
							})
							.then((response) => {
								alert(response.data.msg)
								if (response.data.code == 1) {
									_this.$message("发布成功")
									_this.$router.push({
										name: 'Home'
									})
								}
							})
					} else {
						this.$axios.post('/api/release_invitation.php', {
								token: _this.param.get('token'),
								plate_id: _this.param.get('plate_id'),
								str: _this.param.get('str'),
								title: _this.param.get('title')
							})
							.then((response) => {
								alert(response.data.msg)
								if (response.data.code == 1) {
									_this.$message("发布成功")
									_this.$router.push({
										name: 'Home'
									})
								}
							})
					}
				} else {
					this.$message({
						message: '请输入内容',
						duration: 1500
					})
				}
			}
		},
		created() {
			let _this = this
			if (!this.$cookies.get('token')) {
				_this.$message("你还没有登陆哦")
				_this.$router.push({
					name: 'Login'
				})
			} else {
				this.$axios.post('/api/check_token.php', {
						token: this.$cookies.get('token')
					})
					.then((response) => {
						if (response.data.code == 0) {
							_this.$message("你还没有登陆哦")
							_this.$router.push({
								name: 'Login'
							})
						}
					})
			}
		}
	}
</script>

<style>
	.HomeRelease-inBox {
		padding: 20px;
	}

	.choosePlate {
		margin-top: 20px;
	}

	.HomeRelease-Box-main-text {
		width: 100%;
		text-align: center;
		margin-top: 30px;
	}

	.HomeRelease-Box-upload {
		margin: 20px;
		margin-top: 10px;
		margin-left: 17%;
	}

	.HomeRelease-button {
		position: absolute;
		margin-top: 20px;
		margin-left: 28%;
	}

	.HomeRelease-Box-main {
		margin: 20px;
		text-align: center;
		font-size: 25px;
	}

	.HomeRelease-Box-Input {
		margin-top: 30px;
	}

	.HomeRelease-Box-Head {
		margin: 20px;
		text-align: center;
		font-size: 25px;
	}

	.HomeRelease-Box {
		position: relative;
		top: 0%;
		width: 100%;
		min-height: 900px;
		height: auto;
		background-color: #FFFFFF;
	}
</style>
