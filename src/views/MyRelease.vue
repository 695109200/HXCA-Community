<template>
	<div>
		<div class="MyReleaseBox" id="MyReleaseBox">
			<div class="Release-heard">
				<router-link :to="{name:'MyHome'}" tag="li">
					<img src="../assets/icon/back.png" class="return">
				</router-link>
				<div id="Release"><span id="Releasetxt" class="nav-bottom-1">我的发布</span></div>
			</div>
			<div id="remain">
				<transition name="el-fade-in-linear">
					<div id="Release-main">

						<el-table :data="tableData" style="width: 100%" >
							<el-table-column prop="province" flexd="left" label="发布标题" @click='cc'>
							</el-table-column>
							<el-table-column prop="ReleaseText" label="内容">
							</el-table-column>
							<el-table-column prop="date" label="日期">
							</el-table-column>
							<el-table-column fixed="right" label="操作">
								<template slot-scope="scope">
									<el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
										删除
									</el-button>
								</template>
							</el-table-column>
						</el-table>

					</div>
				</transition>
				<transition name="el-fade-in-linear">
				</transition>
			</div>
		</div>
		<div class="MyReleaseBoxButtom">
		</div>
	</div>
</template>

<script>
	export default {
		data: () => ({
			activeName: 'first',
			
			tableData: [],

		}),
		methods: {
			cc(){
				alert('a')
			},
			deleteRow(index, rows) {
				for (var i = 0; i < this.tableData.length; i++) {
					if (this.tableData[i].id == index) {
						index = this.tableData[i].plate_id
					}
				}
				var _this = this
				this.$axios.post('/api/delete_invitation.php', {
					token: _this.$cookies.get('token'),
					invitation_id: index
				}).then((response) => {
					_this.$message("删除成功")
					this.reload()
				})
			}
		},
		inject: ['reload'],
		mounted() {
			var _this = this
			this.$axios.post('/api/my_release.php', {
				token: _this.$cookies.get('token')
			}).then((response) => {
				for (var i = 0; i < response.data.data.length; i++) {
					_this.tableData.push({
						id: i,
						province: response.data.data[i].title,
						ReleaseText: response.data.data[i].str,
						date: response.data.data[i].time,
						plate_id: response.data.data[i].id,
						indexPlate:response.data.data[i].plate_id
					})
				}
			})
		}
	}
</script>

<style>
	.nav-bottom-1 {
		position: absolute;
		top: 18px;
		font-weight: 900;
		font-size: 25px;
		left: 35%;
	}

	.MyReleaseBox {
		position: absolute;
		top: 0%;
		width: 100%;
		min-height: 900px;
		height: auto;
		background-color: #FFFFFF;
		margin-bottom: 100px;
	}

	a {
		-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
		-webkit-user-select: none;
		-moz-user-focus: none;
		-moz-user-select: none;
	}

	#remain {
		width: 100%;
		margin-bottom: 100px;
	}

	.Release-heard {
		display: flex;
		flex-direction: row;
		width: 100%;
		font-size: 20px;
		margin-top: 15px;
	}

	.return {
		width: 40px;
		height: 40px;
		float: left;
		margin-left: 5px;
	}

	#Release {
		flex: 1;
		display: inline;
		text-align: center;
		margin-top: 10px;
	}
</style>
