<template>
	<div>
		<div class="MySetBoxHead">
			<router-link :to="{name:'MySet'}" tag="li">
				<div style="position: absolute;left: 0;">
					取消
				</div>
			</router-link>
			<div style="margin: 0 auto;">
				设置性别
			</div>
			<el-button type="primary" :disabled=" abutton =='1'?true:false" style="position: absolute;right: 0;top: 10px;" id="aa"
			 @click="SetUserInfo()">确定</el-button>
		</div>
		<div style="width: 90%;margin: 0 auto;">
			<el-select v-model="sex" placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</div>
		<div class="InputBox">

		</div>
	</div>
</template>

<script>
	export default {
		name: "MySet1",
		data: () => ({
			sex: "0",
			abutton: '1',
			options: [{
				value: '0',
				label: '男'
			}, {
				value: '1',
				label: '女'
			}],
		}),
		watch: {
			sex(val) {
				var _this = this
				if (this.sex == _this.$store.state.sex) {
					this.abutton = 1
				}
				if (this.sex != _this.$store.state.sex) {
					this.abutton = 0
				}
			}
		},
		methods: {
			SetUserInfo() {
				var _this = this
				this.$axios.post('/api/set_user_info.php', {
						token: _this.$cookies.get('token'),
						sex: _this.sex
					})
					.then(function(response) {
						if (response.data.code == 1) {
							_this.$store.commit("setsex", _this.sex)
							_this.$message({
								message: response.data.msg,
								duration: 1000
							})
							_this.$router.push({
								name: 'MySet'
							})
						}
					})
			}
		},
		mounted() {
			this.sex = this.$store.state.sex
		}
	}
</script>

<style>
	.MySetBoxHead {
		position: relative;
		width: 90%;
		height: 60px;
		margin-top: 10px;
		line-height: 60px;
	}
</style>
