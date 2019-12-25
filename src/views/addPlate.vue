<template>
	<div>
		<div class="addPlatBox">
			<div class="addPlatHead">
				申请添加
			</div>
			<div class="addPlatMainText">
				社团名字
			</div>
			<el-input v-model="addPlatName" placeholder="请输入名字"></el-input>
			<div class="addPlatMainText">
				社团简介
			</div>
			<el-input type="textarea" :rows="2" placeholder="" v-model="addPlatReason">
			</el-input>
			<div class="addPlateButtonBox">
				<el-button type="primary" style="float: left;" @click="addPlatTrue()">确定</el-button>
				<router-link :to="{name:'associationHome'}" tag="li">
					<el-button type="primary" style="float: right;">返回</el-button>
				</router-link>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		name: "addPlate",
		data: () => ({
			addPlatName: '',
			addPlatReason: ''
		}),
		methods: {
			addPlatTrue() {
				if (this.addPlatName != '' && this.addPlatReason != '') {

					this.$axios.post('/api/apply_association.php', {
						token: this.$cookies.get('token'),
						name: this.addPlatName,
						introduction: this.addPlatReason
					}).then((response) => {
						this.$message({
							message: "申请成功",
							duration: 1500
						})
					})
					this.$router.push({name:'associationHome'})
				} else {
					this.$message({
						message: "请不要留空",
						duration: 1500
					})
				}
			},
			check_token() {
				let _this = this
				if (!this.$cookies.get('token')) {
					_this.$message("请登录后再进行申请")
					_this.$router.push({
						name: 'Login'
					})
				} else {
					this.$axios.post('/api/check_token.php', {
							token: this.$cookies.get('token')
						})
						.then((response) => {
							if (response.data.code == 0) {
								_this.$message("请登录后再进行申请")
								_this.$router.push({
									name: 'Login'
								})
							}
						})
				}
			}
		},
		components: {

		},
		created() {
			this.check_token()
		}


	}
</script>

<style>
	.MySetPwdButton {
		margin-top: 1.875rem;
		float: right;
	}

	.addPlateButtonBox {
		margin-top: 30%;
	}

	.addPlatMainText {
		width: 100%;
		height: 90px;
		text-align: center;
		line-height: 90px;
		font-size: 20px;
	}

	.addPlatHead {
		width: 100%;
		height: 90px;
		text-align: center;
		line-height: 90px;
		font-size: 25px;
	}

	.addPlatBox {
		position: absolute;
		top: 0%;
		width: 100%;
		min-height: 880px;
		height: auto;
		background-color: #FFFFFF;
	}
</style>
