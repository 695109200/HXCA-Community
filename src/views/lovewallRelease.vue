<template>
	<div>
		<div class="lovewall-release">
			<div class="transition-box">
				<div class="lovewallRelease-head">你想对谁说</div>
				<el-input type="textarea" autosize maxlength="6" placeholder="请输入1-6位字符" v-model="LoveWallReleaseAt">
				</el-input>
				<div class="lovewallRelease-head" style="margin-top: 30px;">说出你的心声</div>
				<el-input type="textarea" autosize maxlength="100" placeholder="请输入内容" v-model="LoveWallReleaseText">
				</el-input>
				<div class="lovewallRelease-button">
					<el-button @click="show1()" style="float: left;">发布</el-button>
					<router-link :to="{name:'Lovewall'}" tag="li">
						<el-button style="float: right;">取消</el-button>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'lovewallRelease',
		data: () => ({
			LoveWallReleaseAt: '',
			LoveWallReleaseText: ''
		}),
		methods: {
			show1() {
				if (this.LoveWallReleaseAt.length != 0 && this.LoveWallReleaseText.length != 0) {
					var _this = this
					this.$axios.post('/api/release_invitation.php', {
							token: this.$cookies.get('token'),
							plate_id: 1,
							title: this.LoveWallReleaseAt,
							str: this.LoveWallReleaseText
						})
						.then(function(response) {
							console.log(response)
							if (response.data.code == 1) {
								_this.$message({
									message: '他/她已经收到你的心声',
									duration: 1500
								})
								_this.$router.push({
									name: 'Lovewall'
								})
							}
							if(response.data.code == 1092){
								_this.$message({
									message: '三分钟内只能发一次',
									duration: 1500
								})
							}
						})
				} else {
					this.$message('你都没说话')
				}
			},
			check_token() {
				let _this = this
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
		},
		created() {
			this.check_token()
		}
	}
</script>
<style>
	* {
		list-style: none;
	}

	.lovewallRelease-button {
		margin-top: 20%;
	}

	.lovewallRelease-head {
		font-size: 1.25rem;
		font-weight: 500;
		margin: 0px auto;
		margin-bottom: 30px;
	}

	.lovewall-release {
		position: relative;
		top: 0%;
		width: 100%;
		height: 750px;
		background-color: #FFFFFF;
	}

	.transition-box {
		padding-top: 30px;
		margin-bottom: 10px;
		width: 100%;
		border-radius: 4px;
		text-align: center;
		color: black;
		box-sizing: border-box;
	}
</style>
