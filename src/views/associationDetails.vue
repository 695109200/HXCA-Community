<template>
	<div>
		<div class="assDetailsBox">
			<div class="assDetailsHeadImgBox">
				<router-link :to="{name:'associationHome'}" tag="li">
					<img src="../assets/icon/return.png" class="assDetailsHeadIconL">
				</router-link>
				<img src="../assets/icon/topRight.png" class="assDetailsHeadIcon">
			</div>
			<div class="assDetailsMainTopBox">
				<div class="assDetailsMainTopInBox">
					<div class="assDetailsMainTopHeadImg">
						<img src="../assets/images/计算机协会.png" width="50px" height="50px">
						<div class="assDetailsMainTopText">
							{{this.$route.params.assid}}
						</div>
					</div>
					<div class="assDetailsMainTopMain">
						<div class="assDetailsMainTopMain1">华夏学院认证</div>
						<div class="assDetailsMainTopMain2">性价比超高</div>
					</div>
					<div class="assDetailsMainTopBottom">
						<div class="assDetailsMainTopBottom1">#</div>
						<div class="assDetailsMainTopBottom2">21</div>
						<div class="assDetailsMainTopBottom3">人</div>
						<div class="assDetailsMainTopBottom4">会长:&nbsp;黄浩宇&nbsp;副会:&nbsp;许玉娜&nbsp;></div>
					</div>
				</div>
			</div>
			<div class="assDetailsMainBox">
				<div class="assDetailsMainHead">
					社团介绍
				</div>
				<div class="assDetailsMainName">
					社团名称:计算机协会
				</div>
				<div class="assDetailsMainText">
					社团简介:计算机协会是什么啊啊啊啊啊啊啊啊啊啊啊啊啊啊
				</div>
				<div class="assDetailsMainBottom">
					社团座右铭:始于学生&nbsp;赋予学生
				</div>
			</div>
			<div class="assDetailsArchivesBox">
				<div class="assDetailsArchivesHead">
					干部档案
				</div>
			</div>

			<div class="assArBox">

				<!-- 左 -->
				<div style="width: 20%;float: left;height: 100%;float: left;">
					<div v-for="n in 10" style="height:10%;width: 100%;text-align: center;font-weight:900;font-size:15px">
						会长
						<div style="height:40%;width: 100%;border-right: 2px solid #000000;margin-top: 9px;margin-left: 10px;">
						</div>
					</div>
				</div>
				<!-- 左标 -->
				<div style="width: 7%;float: left;height: 100%;float: left;">
					<div v-for="n in 10" style="height:10%;width: 100%;">
						<img src="../assets/blue.png" style="width: 20px;height:20px;margin-top: 3px;">
					</div>
				</div>
				<!-- 左 -->
				<div style="width: 20%;float: left;height: 100%;float: left;">
					<div v-for="n in 10" style="height:10%;width: 100%;text-align: center;font-weight:900;font-size:15px" @click="indexUser()">
						黄浩宇
					</div>
					<!-- 左1 -->
				</div>
				<div style="width: 20%;float: right;height: 100%;">
					<div v-for="n in 10" style="height:10%;width: 100%;text-align: center;font-weight:900;font-size:15px">
						黄浩宇
					</div>
				</div>
				<!-- 右标 -->
				<div style="width: 7%;float: right;height: 100%;">
					<div v-for="n in 10" style="height:10%;width: 100%;">
						<img src="../assets/blue.png" style="width: 20px;height:20px;margin-top: 3px;">
					</div>
				</div>
				<!-- 右1 -->
				<div style="width: 20%;float: right;height: 100%;">
					<div v-for="n in 10" style="height:10%;width: 100%;text-align: center;font-weight:900;font-size:15px">
						会长
						<div style="height:40%;width: 100%;border-right: 2px solid #000000;margin-top: 9px;margin-left: 10px;">
						</div>
					</div>
				</div>
				<div style="position: absolute; z-index: 2;background-color: #FFFFFF;width: 100%;height: 37px;bottom: 0;">
				</div>
			</div>
			<div class="assDetailsNewBox">
				<div class="assDetailsNewHead">
					社团活动消息
				</div>
				<div class="assDetailsNewMain">
					社团数据暂未完善
				</div>
				<div style="width: 100%;height: 30px;"></div>
			</div>
			<div class="assDetailsBottom">
			</div>
			<div class="clear"></div>
		</div>
	</div>
</template>

<script>
	export default {
		data: () => ({
			bglist: [{}]
		}),
		methods: {
			indexUser() {
				this.$router.push({
					name: 'AssUserHome'
				})
			}
		},
		components: {},
		created() {}
	}
</script>

<style>
	.assArBox {
		position: relative;
		width: 100%;
		height: 600px;
		background-color: #FFFFFF;
	}

	.clear {
		clear: both;
	}

	.assDetailsHeadIconL {
		float: left;
		width: 40px;
		height: 40px;
		margin-top: 15px;
		margin-right: 17px;
	}

	.assDetailsNewMain {
		color: black;
		font-size: 25px;
		text-align: center;
		width: 80%;
		min-height: 600px;
		height: auto;
		background-color: rgb(237, 237, 237);
		margin: 0px auto;
	}

	.assDetailsArchivesMainR2 {
		width: 25%;
		float: right;
	}

	.assDetailsArchivesMainL1 {
		width: 25%;
		float: right;
	}

	.assDetailsArchivesMainR {
		float: left;
		width: 25%;
	}

	.assDetailsArchivesMainL {
		float: left;
		width: 25%;
	}

	.assDetailsArchivesMain {
		width: 90%;
		min-height: 400px;
		height: auto;
		margin: 0 auto;
	}

	.assDetailsMainBottom {
		float: right;
		font-size: 15px;
		font-weight: 900;
		margin-top: 10px;
		margin-right: 10px;
	}

	.assDetailsMainText {
		min-height: 20%;
		height: auto;
	}

	.assDetailsMainName,
	.assDetailsMainText {
		width: 90%;
		margin: 0 auto;
		font-size: 15px;
		font-weight: 400;
	}

	.assDetailsMainTopBottom3 {
		float: left;
		font-size: 10px;
		line-height: 25px;
		color: red;
		font-weight: 800;
	}

	.assDetailsMainTopBottom2 {
		float: left;
		line-height: 20px;
		font-size: 20px;
		color: red;
		font-weight: 800;
	}

	.assDetailsMainTopBottom4 {
		float: right;
		line-height: 30px;
		font-size: 10px;
		color: #475669;
	}

	.assDetailsMainTopBottom1 {
		float: left;
		font-size: 10px;
		line-height: 30px;
		color: red;
		font-weight: 800;
	}

	.assDetailsMainTopBottom {
		width: 90%;
		height: 35px;
		margin: 0 auto;
		margin-top: 4%;
	}

	.assDetailsMainTopMain1,
	.assDetailsMainTopMain2 {
		height: 100%;
		width: 30%;
		float: left;
		margin-right: 15px;
		background-color: rgb(243, 152, 0);
		font-size: 10px;
		border-radius: 5px;
		text-align: center;
		line-height: 20px;
	}

	.assDetailsMainTopMain {
		width: 90%;
		height: 20px;
		margin: 0 auto;
	}

	.assDetailsMainTopText {
		width: 70%;
		height: 58px;
		float: right;
		line-height: 58px;
		margin-right: 30px;
		font-weight: 900;
		font-size: 17px;
	}

	.assDetailsMainTopHeadImg {
		width: 90%;
		height: 58px;
		margin: 0 auto;
		padding-top: 3px;
	}

	.assDetailsNewHead {
		width: 90%;
		height: 50px;
		margin: 0 auto;
		font-weight: 900;
		line-height: 50px;
	}

	.assDetailsNewBox {
		width: 100%;
		min-height: 400px;
		height: auto;
		background-color: #FFFFFF;
		margin-top: 10px;
	}

	.assDetailsArchivesHead {
		width: 90%;
		height: 40px;
		margin: 0 auto;
		border-bottom: 1px solid #000000;
		line-height: 40px;
		font-weight: 900;
	}

	.assDetailsMainHead {
		width: 90%;
		height: 30px;
		margin: 0 auto;
		border-bottom: 1px solid #000000;
		line-height: 40px;
		font-weight: 900;
	}

	.assDetailsBottom {
		width: 100%;
		height: 59px;
		margin-top: 10px;
	}

	.assDetailsArchivesBox {
		width: 100%;
		height: 60px;
		margin-top: 10px;
		background-color: #FFFFFF;
	}

	.assDetailsMainTopInBox {
		position: relative;
		margin: 0 auto;
		width: 88%;
		height: 133px;
		background-color: rgb(238, 238, 238);
		border-radius: 10px;
		bottom: 38px;
	}

	.assDetailsMainBox {
		width: 100%;
		height: 130px;
		background-color: #FFFFFF;
		margin-top: 15px;
	}

	.assDetailsMainTopBox {
		width: 100%;
		height: 120px;
		background-color: #FFFFFF;
	}

	.assDetailsBox {
		position: relative;
		top: 0;
		width: 100%;
		background-color: rgb(241, 241, 241);
	}

	.assDetailsHeadIcon {
		width: 23px;
		height: 23px;
		float: right;
		margin-top: 15px;
		margin-right: 17px;
	}

	.assDetailsHeadImgBox {
		position: relative;
		width: 100%;
		height: 240px;
		background-image: url(../assets/images/计协合照.jpg);
		background-size: 100% 100%;
	}
</style>
