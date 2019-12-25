<template>
	<div>
		<div class="UserHomeBox">
			<div class="HomeBgBox">
				<router-link :to="{name:'associationDetails'}" tag="li">
					<img src="../assets/icon/back.png" width="50px" height="50px" style="position: relative;top: 60px;" @click="ReturnDetails">
				</router-link>
				<div class="HomeHeadBox">
					<div class="HomeHeadTxt">
						<div class="HeadTxtL">干部资料></div>
						<div class="HeadTxtR">{{userdata[0].id}}</div>
					</div>
					<div class="HeadMainBox">
						<div style="position: absolute;
            width: 60px;
            height: 30px;
            right: 0;
            font-size: 10px;
            color: #FFFFFF;
            background-color:rgb(147,136,202);
            text-align: center;
            line-height: 30px;
            border-radius:0 10px 0px 10px;
            font-weight: 900;" class="WX">添加微信</div>
						<img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" width="50px" height="100%" style="    float: left;border: 2px solid rgb(107,100,204);border-radius:50% ;">
						<div class="HeadMainUserName">{{userdata[0].username}}</div>
						<img src="../assets/icon/boyIcon.png" width="21px" height="40%" style="margin-top: 14px;margin-left: 10px;">
						<div style="position: absolute; top: 40px;left: 75px; font-size: 0.8125rem;color: rgb(81,67,177);font-weight: 400;">{{userdata[0].association}}</div>
					</div>
					<div class="HeadBottomBox">
						<div class="BottomBox1">
							<div class="BottomBoxText1">{{userdata[0].height}}</div>
							<div class="BottomBoxText2">身高</div>
						</div>
						<div class="BottomBox2">
							<div class="BottomBoxText1">{{userdata[0].weight}}kg</div>
							<div class="BottomBoxText2">体重</div>
						</div>
						<div class="BottomBox3">
							<div class="BottomBoxText1">{{userdata[0].association_department}}</div>
							<div class="BottomBoxText2">部门</div>
						</div>
					</div>
				</div>
			</div>
			<div style="width: 100%;height: 130px;background-color: #FFFFFF;"></div>
			<div class="careerBox">
				<div class="careerHeadBox">生涯</div>
				<div class="careerMainBox">
					<div class="careerBoxHead">
						<img src="../assets/icon/华夏学院logo.png" height="100%" width="30px" style="float: left;">
						<div style="float: left;line-height: 30px;font-size: 15px;margin-left: 10px;color: rgb(176,171,232);font-weight: 900;">信息工程学院</div>
					</div>
					<div class="careerBoxMainTxt1">
						<div style="float: left; font-weight:900;color:rgb(191,191,191)">班级</div>
						<div style="float: right;font-weight:900;color:#FFFFFF">职务</div>
					</div>
					<div class="careerBoxMainTxt2">
						<div style=" position: absolute; top: 0;line-height: 30px;color: rgb(170,170,170);font-weight: 900;font-size: 20px;">{{userdata[0].class}}</div>
						<div style="position: absolute;top: 0;line-height: 35px;left:78px ;color: rgb(170,170,170);">18级</div>
						<div style="position: absolute; top: 0;left:58%;line-height: 30px;color: #FFFFFF;font-weight: 900;font-weight: 900;font-size: 20px;">{{userdata[0].class_department}}</div>
					</div>
				</div>
				<div class="careerMainBox">
					<div class="careerBoxHead">
						<img src="../assets/icon/华夏学院logo.png" height="100%" width="30px" style="float: left;">
						<div style="float: left;line-height: 30px;font-size: 15px;margin-left: 10px;color: rgb(176,171,232);font-weight: 900;">广州华夏学院</div>
					</div>
					<div class="careerBoxMainTxt1">
						<div style="float: left; font-weight:900;color:rgb(191,191,191)">社团</div>
						<div style="float: right;font-weight:900;color:#FFFFFF">职务</div>
					</div>
					<div class="careerBoxMainTxt2">
						<div style=" position: absolute; top: 0;line-height: 30px;color: rgb(170,170,170);font-weight: 900;font-size: 20px;">Hey摄会</div>
						<div style="position: absolute; top: 0;left:58%;line-height: 30px;color: #FFFFFF;font-weight: 900;font-weight: 900;font-size: 20px;">技术部长</div>
					</div>
				</div>
			</div>
			<div class="ideaBox">
				<div class="ideaHeadTxt">想法</div>
				<div class="ideaBtoomBox">
					<div class="ideaBtoomBox1">

						<div class="ideaBoxHead">
							<img src="../assets/icon/love3.png" height="50%" width="30px" style="position: relative; top: 5px;left: 5px;">
							工作理论
						</div>
						<div class="ideaBoxTxt">
								{{userdata[0].work}}
						</div>

					</div>
					<div class="ideaBtoomBox2">

						<div class="ideaBoxHead">
							<img src="../assets/icon/love3.png" height="50%" width="30px" style="position: relative; top: 5px;left: 5px;">
							座右铭
						</div>
						<div class="ideaBoxTxt">
							{{userdata[0].motto}}
						</div>
					</div>
				</div>
			</div>
			<div class="UserBottom"></div>
			<div class="clear"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "AssUserHome",
		data: () => ({
			userdata: []

		}),
		methods: {
			ReturnDetails() {
				this.$parent.assDetailsBoxShow = true
				this.$parent.AssUserHomeShow = false
			}
		},
		components: {

		},
		created() {
			var _this = this
			this.$axios.post('/api/get_associtaion_member_data.php',{
				id:1
			}).then((response)=>{
				_this.userdata = response.data.data
			})
		}
	}
</script>

<style>
	.WX:active{
		background-color: #000000;
	}
	.ideaBoxTxt {
		margin-top: 5px;
		width: 100%;
		height: 30px;
		font-size: 13px;
		color: #FFFFFF;
		text-align: center;
		font-weight: 900;
	}

	.ideaBoxHead {
		width: 100%;
		height: 40px;
		line-height: 40px;
		color: #FFFFFF;
		font-weight: 900;
	}

	.careerBoxMainTxt2 {
		position: relative;
		top: 20px;
		left: 50px;
		width: 85%;
		height: 35px;
	}

	.careerBoxMainTxt1 {
		position: relative;
		top: 12px;
		left: 50px;
		width: 60%;
		height: 20px;
	}

	.careerBoxHead {
		position: relative;
		top: 10px;
		left: 10px;
		width: 60%;
		height: 30px;
	}

	.BottomBoxText2 {
		font-size: 10px;
		line-height: 35px;
	}

	.BottomBoxText1 {
		font-size: 18px;
	}

	.BottomBoxText1,
	.BottomBoxText2 {
		color: #E4E7ED;
		-webkit-mask-image: -webkit-gradient(linear, 0 10, 0 bottom, from(yellow), to(rgba(0, 0, 255, 0)));
		text-align: center;
		font-weight: 600;
	}

	.BottomBox3 {
		width: 30%;
		height: 100%;
		position: absolute;
		right: 0;
		top: 0;
	}

	.BottomBox2 {
		margin: 0 auto;
	}

	.BottomBox1 {
		position: absolute;
		left: 0;
		top: 0;
	}

	.BottomBox1,
	.BottomBox2 {
		width: 24%;
		height: 100%;
	}

	.HeadMainUserName {
		line-height: 50px;
		float: left;
		margin-left: 20px;
		color: #FFFFFF;
		font-weight: 900;
		font-size: 20px;
	}

	.HeadTxtR {
		float: right;
		line-height: 20px;
		color: #E4E7ED;
		-webkit-mask-image: -webkit-gradient(linear, 0 10, 0 bottom, from(yellow), to(rgba(0, 0, 255, 0)));
	}

	.HeadTxtL {
		float: left;
		font-size: 10px;
		line-height: 20px;
		font-weight: 900;
		letter-spacing: 2px;
		font-family: "宋体";
	}

	.ideaBtoomBox2 {
		float: right;
	}

	.ideaBtoomBox1 {
		float: left;
	}

	.ideaBtoomBox1,
	.ideaBtoomBox2 {
		width: 110px;
		height: 100%;
		background-color: #D3DCE6;
		border-radius: 7px;
	}

	.ideaBtoomBox {
		position: relative;
		width: 94%;
		height: 80px;
		margin: 0 auto;
		top: 5px;
	}

	.ideaHeadTxt {
		width: 14%;
		height: 30px;
		margin-bottom: 10px;
		line-height: 40px;
		border-bottom: 1px solid #D3DCE6;
		color: rgb(176, 171, 231);
		font-weight: 900;
		font-size: 17px;
	}

	.careerMainBox {
		width: 100%;
		height: 110px;
		border-radius: 7px;
		margin-bottom: 20px;
		background-image: url(../assets/images/社团介绍背景1.png);
		background-size: 100% 100%;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
	}

	.careerHeadBox {
		width: 14%;
		height: 30px;
		margin-bottom: 10px;
		line-height: 40px;
		border-bottom: 1px solid #D3DCE6;
		color: rgb(176, 171, 231);
		font-weight: 900;
		font-size: 17px;
	}

	.HeadBottomBox {
		position: relative;
		top: 40px;
		width: 80%;
		height: 50px;
		margin: 0 auto;
	}

	.HeadMainBox {
		position: relative;
		top: 15px;
		width: 90%;
		height: 50px;
		margin: 0 auto;
	}

	.HomeHeadTxt {
		position: relative;
		top: 5px;
		width: 90%;
		height: 20px;
		margin: 0 auto;
	}

	.UserBottom {
		width: 100%;
		height: 100px;
	}

	.ideaBox {
		position: relative;
		top: -15px;
		width: 84%;
		min-height: 150px;
		height: auto;
		margin: 0 auto;
		background-color: #FFFFFF;
		border-radius: 7px;
	}

	.careerBox {
		width: 84%;
		min-height: 300px;
		height: auto;
		margin: 0 auto;
		border-radius: 7px;
	}

	.HomeHeadBox {
		position: relative;
		width: 84%;
		height: 170px;
		margin: 0 auto;
		background-color: rgb(175, 171, 241);
		top: 160px;
		border-radius: 7px;
		box-shadow: 0 10px 12px 0 rgba(0, 0, 0, 0.1)
	}

	.HomeBgBox {
		width: 100%;
		height: 270px;
		background-color: #FFFFFF;
		background-image: url(../assets/images/7.jpg);
		margin: 0px 0px 0px 0px;
		background-size: 100%;
	}

	.clear {
		clear: both;
	}

	.UserHomeBox {
		position: relative;
		top: 0;
		width: 100%;
		min-height: 780px;
		height: auto;
		/* background-color: rgb(242,242,242); */
		background-color: #FFFFFF;
	}
</style>
