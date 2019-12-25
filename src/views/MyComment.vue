<template>
	<div>
		<div class="MyCommentBox">
			<div class="MyCommentHead">
				<router-link :to="{name:'MyHome'}" tag="li">
					<i class="el-icon-arrow-left MyCommentHeadIcon"></i>
				</router-link>
				我的评论
			</div>
			<div class="MyCommentMain">
				<el-table :data="CommentList" style="width: 100%">
					<el-table-column prop="MainText" label="主题">
					</el-table-column>
					<el-table-column prop="CommnentText" label="评论内容">
					</el-table-column>
					<el-table-column prop="Time" label="日期">
					</el-table-column>
					<el-table-column fixed="right" label="操作">
						<template slot-scope="scope">
							<el-button @click.native.prevent="deleteRow(scope.$index, CommentList)" type="text" size="small">
								删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>


			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "MyComment",
		data: () => ({
			CommentList: [

			]
		}),
		methods: {

			deleteRow(index, rows) {
				for (var i = 0; i < this.CommentList.length; i++) {
					if (this.CommentList[i].id == index) {
						index = this.CommentList[i].comment_id
					}
				}
				var _this = this
				this.$axios.post('/api/delete_comment.php', {
					token: _this.$cookies.get('token'),
					comment_id: index
				}).then((response) => {
					this.reload()
				})
			},
			// 获取评论信息
			GetCommet() {
				var _this = this
				this.$axios.post('/api/my_comment.php', {
					token: _this.$cookies.get('token')
				}).then((response) => {
					for (var i = 0; i < response.data.data.length; i++) {
						_this.CommentList.push({
							id: i,
							CommnentText: response.data.data[i].str,
							date: response.data.data[i].time,
							comment_id: response.data.data[i].id,
							Time: response.data.data[i].time,
							MainText: response.data.data[i].str
						})
					}
				})
			}
		},
		inject: ['reload'],
		mounted() {
			this.GetCommet()
		}


	}
</script>

<style>
	.MyCommentMain {
		margin-left: 5%;
	}

	.MyCommentHeadIcon {
		position: absolute;
		left: 5%;
		top: 2%;
		font-size: 2.4rem;
	}

	.MyCommentHead {
		width: 100%;
		height: 70px;
		text-align: center;
		line-height: 70px;
		font-size: 24px;
	}

	.MyCommentBox {
		position: absolute;
		top: 0%;
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		margin-bottom: 100px;


	}
</style>
