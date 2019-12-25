<template>
	<div>
		<div class="HomeBox">
			<div class="head">
				<div class="head-text">华夏社区</div>
				<div class="head-menu">
					<transition name="el-fade-in-linear">
						<router-link :to="{name:'HomeRelease'}">
							<el-button class="Release" size="medium" type="primary">发表</el-button>
						</router-link>
					</transition>
				</div>
			</div>
			<div class="LbtBox">
				
				
				<div class="LbtInBox">
					<el-carousel indicator-position="outside" class="carousel" height='90%'>
						<el-carousel-item v-for="item in imgList" :key="item.id">
							<img :src="item.idView" class="lb-img" />
						</el-carousel-item>
					</el-carousel>
				</div>
				<div style="width: 90%;height:70px; margin: 0 auto;position:relative;top: 45px;">
					<div class="LbtBoxBtoomBox1">
						<router-link :to="{name:'associationHome'}" tag="li">
							<img src="../assets/icon/assIcon.png" class="LbtBoxBtoomBoxIcon">
							社团
						</router-link>
					</div>
					<div class="LbtBoxBtoomBox2">
						<router-link :to="{name:'Lovewall'}" tag="li">
							<img src="http://39.107.87.97/icon/LoveIcon.f32fda87.png" class="LbtBoxBtoomBoxIcon2">
							表白墙
						</router-link>
					</div>
					<div class="LbtBoxBtoomBox3">
						<img src="../assets/icon/活动Icon.png" class="LbtBoxBtoomBoxIcon">
						更多活动
					</div>
				</div>
			</div>
				
			<div class="HotText">热帖</div>
			<div v-loading='loding' style="width: 100%;height: 80px;" v-if="loding"></div>
			<div class="HomeMainBox">
				<div v-for="(url,b) in urls" :key="url.id">
					<div class="HomeMainInBox" @click="inCheckPlate(url.id,url.HomePlate)" @touchstart='aa($event)' @touchend='cc($event)'>
						<div class="InHeadBox">
							<div style="width: 35px;height:35px;border-radius:50%;background-color: rgb(216, 216, 216);float: left;">
								<el-image :src="url.head_portrait" lazy style="width: 100%;height: 100%;border-radius:50% ;"></el-image>
							</div>
							<div style="width:90px;height:20px;margin-left: 46px;position: relative;top: -2px;color:rgb(148,148,148);">
								{{url.username}}
							</div>
							<div style="width:130px;height:20px;margin-left: 46px;position: relative;top: 2px;color:rgb(148,148,148);font-size: 6px;">
								{{url.time}}
							</div>
						</div>
						<div class="InMainTitle">{{url.title}}</div>

						<div v-if="url.view" style="width: 100%;height:70px;">
							<el-image :src="url.view" lazy class="InMainBoxImg1">
								<div slot="error" style="background-color: #FFFFFF;">
								</div>
							</el-image>
							<el-image :src="url.view1" lazy class="InMainBoxImg">
								<div slot="error" style="background-color: #FFFFFF;">
								</div>
							</el-image>
							<el-image :src="url.view2" lazy class="InMainBoxImg">
								<div slot="error" style="background-color: #FFFFFF;">
								</div>
							</el-image>
						</div>
						<div style="background-color: #FFFFFF;width: 100%;height: 30px;">
						</div>
					</div>
					<div class="InMainBottomBoxtest">
						<div style="width: 90%;margin: 0 auto;    border-top: 1px solid rgb(226, 226, 226);">
							<div class="BottomBotton1">
								<img :src="url.prIcon" @click="praise(url.id,b,$event)" style="width: 20px;height: 20px;position: absolute;left:19px;top:8px;">
								<div>
									{{url.prnumber}}
								</div>
							</div>
							<div class="BottomBotton1" @click="inCheckPlate(url.id,url.HomePlate)">
								<img src="../assets/icon/评论.png" style="width: 20px;height: 20px;position: absolute;left:19px;top:10px;">
								{{url.comnubmer}}</div>
							<div class="BottomBotton1">
								<img src="http://39.107.87.97/icon/%E7%82%B9%E5%87%BB%E9%87%8F.e252fd4a.png" style="width: 18px;height: 18px;position: absolute;left:19px;top:10px;">
								{{url.browse}}</div>
						</div>
					</div>
				</div>
			</div>
			<div style="width: 100%;height: 10px;"></div>
			<div class="main-bottom">
				<div @click="topFunction()">
					————没有了，点我上去————
				</div>
			</div>
		</div>
		<div class="noticeBox mask" id="notice">
			<div class="noticeInBox">
				{{NoticeText}}
				<div class="noticeButton">
					<el-button type="primary" round @click="noticeTrue()">好的</el-button>
				</div>
		</div>
		</div>
	</div>
</template>
<script>
	import {
		TweenMax,
		Power2,
		TimelineLite
	} from "gsap"
	export default {
		name: "Home",
		data: () => ({
			msg: '',
			NoticeText: '',
			imgList: [],
			urls: [],
			imgTrue: true,
			loding: false,
			fang: 0,
			an: 0,
			urlnull: []
		}),
		methods: {
			// 触摸前的坐标
			aa(e) {
				this.an = e.changedTouches[0].pageY
			},
			// 触摸结束的坐标
			cc(e) {
				var _this = this
				this.fang = e.changedTouches[0].pageY
				if (this.an > 440 && this.an < 540 && this.fang < 850 && this.fang > 750) {
					TweenMax.to('.HomeMainBox', 0.6, {
						y: 100,
						repeat: 1,
						yoyo: true,
					})
					this.loding = true
					this.GetHot()
				}
			},
			//点赞API
			praise(id, b, e) {
				TweenMax.to(e.target, 0.2, {
					scale: 1.5,
					repeat: 1,
					yoyo: true,
				})
				//判断是否登陆
				if (this.$cookies.get('token')) {
					this.$axios.post('/api/praise.php', {
						token: this.$cookies.get('token'),
						invitation_id: id
					}).then((response) => {
						if (response.data.code == 1) {
							this.urls[b].prnumber++
							this.urls[b].prIcon = 'http://39.107.87.97/icon/赞点.png'
						} else if (response.data.code == 1013) {
							this.$message("请先登陆噢");
							this.$router.push({
								path: '/MyHome'
							})
						}
						//判断有没有点赞过/删除点赞
						if (response.data.code == 1055) {
							this.$axios.post('/api/delete_praise.php', {
								token: this.$cookies.get('token'),
								invitation_id: id
							}).then((response) => {
								if (this.urls[b].prnumber != 0) {
									this.urls[b].prnumber--
								}
								this.urls[b].prIcon = 'http://39.107.87.97/icon/赞.png'
							})
						}
					})
				} else {
					this.$message("请先登陆噢");
					this.$router.push({
						path: '/MyHome'
					})
				}
			},
			//点击热帖进入详情
			inCheckPlate(id, HomePlate) {
				let plateid
				this.$router.push({
					path: '/checkPlate',
					query: {
						invitation_id: id,
						plateid2: HomePlate,
						on: 0
					}
				})
			},
			// 时间
			timeR() {
				var a = new Date()
				var date = new Date();
				var seperator1 = "-";
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				var currentdate = year + seperator1 + month + seperator1 + strDate;
				return currentdate
			},
			//弹窗告示API
			noticeTrue() {
				$("#notice").removeClass("mask");
				$(".noticeBox").css("display", "none");
			},
			//点击返回顶部函数
			topFunction() {
				document.body.scrollTop = 0
				document.documentElement.scrollTop = 0
			},
			hot(response) {
				let _this = this
				this.timeR()
				//for 判断有没有图片，日期是否为今天
				for (var i = 0; i < response.data.data.length; i++) {
					if (response.data.data[i].image1 == undefined) {
						if (_this.timeR() == response.data.data[i].time.substring(0, 10)) {
							_this.urlnull.push({
								HomePlate: response.data.data[i].plate_id,
								id: response.data.data[i].id,
								text: response.data.data[i].str,
								title: response.data.data[i].title,
								username: response.data.data[i].username,
								head_portrait: response.data.data[i].head_portrait,
								time: response.data.data[i].time.substring(10, 19),
								comnubmer: response.data.data[i].comment_number,
								browse: response.data.data[i].browse,
								prnumber: response.data.data[i].praise_number,
								prIcon: response.data.data[i].parise
							})
						} else {
							_this.urlnull.push({
								HomePlate: response.data.data[i].plate_id,
								id: response.data.data[i].id,
								text: response.data.data[i].str,
								title: response.data.data[i].title,
								username: response.data.data[i].username,
								head_portrait: response.data.data[i].head_portrait,
								time: response.data.data[i].time,
								comnubmer: response.data.data[i].comment_number,
								browse: response.data.data[i].browse,
								prnumber: response.data.data[i].praise_number,
								prIcon: response.data.data[i].parise
							})
						}
					} else {
						if (_this.timeR() == response.data.data[i].time.substring(0, 10)) {
							_this.urlnull.push({
								HomePlate: response.data.data[i].plate_id,
								id: response.data.data[i].id,
								text: response.data.data[i].str,
								title: response.data.data[i].title,
								username: response.data.data[i].username,
								head_portrait: response.data.data[i].head_portrait,
								view: response.data.data[i].image1,
								view1: response.data.data[i].image2,
								view2: response.data.data[i].image3,
								browse: response.data.data[i].browse,
								comnubmer: response.data.data[i].comment_number,
								time: response.data.data[i].time.substring(10, 19),
								prnumber: response.data.data[i].praise_number,
								prIcon: response.data.data[i].parise
							})
						} else {
							_this.urlnull.push({
								HomePlate: response.data.data[i].plate_id,
								id: response.data.data[i].id,
								text: response.data.data[i].str,
								title: response.data.data[i].title,
								username: response.data.data[i].username,
								head_portrait: response.data.data[i].head_portrait,
								view: response.data.data[i].image1,
								view1: response.data.data[i].image2,
								view2: response.data.data[i].image3,
								browse: response.data.data[i].browse,
								comnubmer: response.data.data[i].comment_number,
								time: response.data.data[i].time,
								prnumber: response.data.data[i].praise_number,
								prIcon: response.data.data[i].parise
							})
						}
					}
				}
				this.urls = this.urlnull
				this.urlnull = []
			},
			//轮播图
			wiper() {
				var _this = this
				this.$axios.get('/api/swiper.php')
					.then((response) => {
						for (var i = 0; i < response.data.image_data.length; i++) {
							_this.imgList.push({
								id: i,
								idView: response.data.image_data[i]
							})
						}
					})
			},
			// 告示
			notice() {
				if (this.$cookies.get('notice') == "a") {
					$(document).ready(function() {
						$("#notice").removeClass("mask");
						$(".noticeBox").css("display", "none");
					});
				} else {
					this.$cookies.set('notice', 'a', 60 * 60 * 24)
					var top = 0;
					$(document).scroll(function() {
						if ($(".mask").is(":visible")) {
							$(document).scrollTop(top);
						}
					});
					//获取告示API
					let _this = this
					this.$axios.get('/api/notice.php').then((response) => {
						this.NoticeText = response.data.notice
					})
				}
			},
			// 获取热帖
			GetHot() {
				var _this = this
				if (!this.$cookies.get('token')) {
					this.$axios.get('/api/hot.php')
						.then((response) => {
							setTimeout(() => {
								_this.loding = false
								this.$cookies.set('loading', 'a', "5min")
								this.hot(response)
							}, 1500);
						})
				} else {
					this.$axios.post('/api/check_token.php', {
						token: this.$cookies.get('token')
					}).then((response) => {
						if (response.data.code == 0) {
							_this.$message('请重新登陆')
							_this.$router.push({
								name: 'Login'
							})
						} else {
							_this.$axios.post('/api/hot.php', {
									token: _this.$cookies.get('token')
								})
								.then((response) => {
									setTimeout(() => {
										_this.loding = false
										_this.$cookies.set('loading', 'a', "5min")
										_this.hot(response)
									}, 1500);
								})

						}
					})

				}
			}
			// checkToken() {
			// 	var _this = this
			// 	this.$axios.post('/api/check_token.php', {
			// 		token: this.$cookies.get('token')
			// 	}).then((response) => {
			// 		if(response.data.code == 0){
			// 					_this.$message('请重新登陆')
			// 					_this.$router.push({
			// 						name: 'Login'
			// 					})
			// 		}else{
			// 			this.GetHot()
			// 		}
			// 	})
			// }
		},
		created() {
			this.wiper()
			this.notice()
			this.GetHot()
		}
	}
</script>
<style>
	@media only screen and (min-width: 300px) and (max-width: 4000px) {
		.carousel{
			width: 100%;
			height: 100%;
		}
		/* 
		.InMainTitle {
			width: 150px;
			height: 20px;
			margin-top: 23px;
			margin-bottom: 11px;
			margin-left: 40px;
		} */

		/* .BottomBotton1 {
			position: relative;
			text-align: center;
			line-height: 40px;
			width: 33%;
			height: 40px;
			float: left;
			font-weight: bold;
			font-size: 15px;
		}

		.InMainBottomBox {
			width: 35%;
			height: 20px;
			position: absolute;
			right: 0;
			bottom: 0;
			font-size: 10px;
			font-weight: bold;
			line-height: 20px;
			color: rgb(148, 148, 148);
			margin-top: 10px;
		} */

		/* 	.InMainBottomBoxtest {
			margin: 0 auto;
			width: 100%;
			height: 40px;
			background-color: #FFFFFF;
			margin-bottom: 10px;
		}

		.InMainBoxImg1 {
			margin-left: 25px;
		}

		.InMainBoxImg,
		.InMainBoxImg1 {
			width: 70px;
			height: 70px;
			float: left;
			margin-right: 15px;
			border-radius: 5px;
		} */
		/* 
		.InHeadBox {
			position: relative;
			top: 10px;
			width: 90%;
			margin: 0 auto;
			height: 30px;
		}

		.HomeMainInBox {
			width: 100%;
			min-height: 90px;
			height: auto;
			background-color: #FFFFFF;
		}

		a:active {
			color: #000000;
		} */

		/* a:visited {
			color: black;
		}

		.noticeButton {
			line-height: 120px;
		} */

		/* 	.noticeInBox {
			margin: 0 auto;
			width: 80%;
			height: 200px;
			margin-top: 70%;
			background-color: #FFFFFF;
			border-radius: 20px;
			text-align: center;
			line-height: 90px;
			font-weight: bold;
		} */

		/* .noticeBox {
			position: fixed;
			width: 100%;
			height: 780px;
			top: 0;
			background-color: rgba(245, 245, 245, 0.7);
			z-index: 99;
			display: block;
		} */



		/* .HomeMainBox {
			width: 100%;
			top: 10px;
			background-color: rgb(244, 244, 244);
		} */

			.LbtBoxBtoomBoxIcon2 {
			position: absolute;
			top: 15%;
			width: 40px;
			height: 30px;
		}

		.LbtBoxBtoomBoxIcon {
			position: absolute;
			top: 12px;
			width: 30px;
			height: 30px;
		}

		.LbtBoxBtoomBox3 {
			position: absolute;
			top: 0;
			right: 0;
		}

		.LbtBoxBtoomBox2 {
			position: relative;
			margin: 0 auto;
		}

		.LbtBoxBtoomBox1 {
			float: left;
		}

			.LbtBoxBtoomBox1,
		.LbtBoxBtoomBox2,
		.LbtBoxBtoomBox3 {
			width: 15%;
			height: 130%;
			background-color: #FFFFFF;
			border-radius: 7px;
			line-height: 115px;
			text-align: center;
			box-shadow: 2px 2px 0px 0 rgba(0, 0, 0, 0.1);
			font-weight: 900;
			font-size: 1rem;
		}

		.LbtInBox {
			/* position: relative; */
			/* top: 10px; */
			width: 100%;
			height: 700px;
			margin: 0 auto;
		}


		/* 	.HotText {
			margin-top: 20px;
			margin-bottom: 20px;
			margin-left: 15px;
			width: 10%;
			height: 23px;
			top: 10px;
			border-bottom: 2px solid rgb(226, 226, 226);
			font-weight: 900;
			font-size: 17px;
			line-height: 17px;

		} */

		* {
			margin: 0;
			padding: 0;
			list-style: none;
		} */

		a {
			text-decoration: none;

		}

		ul {
			list-style: none;
		}


		/* 	.head-text {
			text-align: center;
			line-height: 50px;
			font-size: 20px;
			font-weight: 900;
		}

		/* .Release {
			position: absolute;
			right: 10px;
			top: 7px;
			text-align: center;
		} */
		/* 
		.el-carousel__item h3 {
			color: #475669;
			font-size: 14px;
			opacity: 0.75;
			line-height: 150px;
			margin: 0;
		} */

		/* .el-carousel__item:nth-child(2n) {
			background-color: #99a9bf;
		} */

		/* 	.el-carousel__item:nth-child(2n+1) {
			background-color: #d3dce6;
		} */

		.lb-img {
			width: 100%;
			height: 90%;
		}
		/* 
		.lazy-box {
			position: relative;
			float: left;
			margin-top: 4%;
			margin-left: 2%;
			width: 47%;
			height: 230px;
			border-radius: 7px;
			box-shadow: 0px 5px 2px 0px rgba(0, 0, 0, 0.05);
			background-color: #FFFFFF;
		} */

		/* .lazy-img {
			width: 100%;
			height: 150px;
			background-color: #FFFFFF;
		} */

		/* 	.main-bottom {
			float: right;
			width: 100%;
			height: 150px;
			text-align: center;
			line-height: 100px;
			color: #99A9BF;
			font-size: 12px;
		} */
		.LbtBox {
			width: 100%;
			margin: 0 auto;
		}
			.head {
			width: 100%;
			height: 50px;
			position: relative;
			background-color: #FFFFFF;
			display: none;
		}
		
		.HomeBox {
			/* position: relative; */
			width: 70%;
			min-height: 780px;
			height: auto;
			margin: 0 auto;
			/* top: 50px; */
		}


	}

	@media only screen and (min-width: 300px) and (max-width: 450px) {
		.carousel {
			height: 180px;
		}

		.InMainTitle {
			width: 150px;
			height: 20px;
			margin-top: 23px;
			margin-bottom: 11px;
			margin-left: 40px;
		}

		.BottomBotton1 {
			position: relative;
			text-align: center;
			line-height: 40px;
			width: 33%;
			height: 40px;
			float: left;
			font-weight: bold;
			font-size: 15px;
		}

		.InMainBottomBox {
			width: 35%;
			height: 20px;
			position: absolute;
			right: 0;
			bottom: 0;
			font-size: 10px;
			font-weight: bold;
			line-height: 20px;
			color: rgb(148, 148, 148);
			margin-top: 10px;
		}

		.InMainBottomBoxtest {
			margin: 0 auto;
			width: 100%;
			height: 40px;
			background-color: #FFFFFF;
			margin-bottom: 10px;
		}

		.InMainBoxImg1 {
			margin-left: 25px;
		}

		.InMainBoxImg,
		.InMainBoxImg1 {
			width: 70px;
			height: 70px;
			float: left;
			margin-right: 15px;
			border-radius: 5px;
		}

		.InHeadBox {
			position: relative;
			top: 10px;
			width: 90%;
			margin: 0 auto;
			height: 30px;
		}

		.HomeMainInBox {
			width: 100%;
			min-height: 90px;
			height: auto;
			background-color: #FFFFFF;
		}

		a:active {
			color: #000000;
		}

		a:visited {
			color: black;
		}

		.noticeButton {
			line-height: 120px;
		}

		.noticeInBox {
			margin: 0 auto;
			width: 80%;
			height: 200px;
			margin-top: 70%;
			background-color: #FFFFFF;
			border-radius: 20px;
			text-align: center;
			line-height: 90px;
			font-weight: bold;
		}

		.noticeBox {
			position: fixed;
			width: 100%;
			height: 780px;
			top: 0;
			background-color: rgba(245, 245, 245, 0.7);
			z-index: 99;
			display: block;
		}



		.HomeMainBox {
			width: 100%;
			top: 10px;
			background-color: rgb(244, 244, 244);
		}

		.LbtBoxBtoomBoxIcon2 {
			position: absolute;
			top: 15%;
			left: 44%;
			width: 40px;
			height: 30px;
		}

		.LbtBoxBtoomBoxIcon {
			position: absolute;
			top: 12px;
			left: 25px;
			width: 30px;
			height: 30px;
		}

		.LbtBoxBtoomBox3 {
			position: absolute;
			top: 0;
			right: 0;
		}

		.LbtBoxBtoomBox2 {
			margin: 0 auto;
		}

		.LbtBoxBtoomBox1 {
			float: left;
		}

		.LbtBoxBtoomBox1,
		.LbtBoxBtoomBox2,
		.LbtBoxBtoomBox3 {
			width: 70px;
			height: 100%;
			background-color: #FFFFFF;
			border-radius: 7px;
			line-height: 115px;
			text-align: center;
			box-shadow: 2px 2px 0px 0 rgba(0, 0, 0, 0.1);
			font-weight: 900;
			font-size: 13px;
		}

		.LbtInBox {
			position: relative;
			top: 10px;
			width: 90%;
			height: 180px;
			margin: 0 auto;
			border-radius: 7px;
			box-shadow: 0 4px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		}

		.LbtBox {
			width: 100%;
			height: 295px;
			margin: 0 auto;
		}

		.HotText {
			margin-top: 20px;
			margin-bottom: 20px;
			margin-left: 15px;
			width: 10%;
			height: 23px;
			top: 10px;
			border-bottom: 2px solid rgb(226, 226, 226);
			font-weight: 900;
			font-size: 17px;
			line-height: 17px;

		}

		* {
			margin: 0;
			padding: 0;
			list-style: none;
		}

		a {
			text-decoration: none;

		}

		ul {
			list-style: none;
		}

		.head {
			width: 100%;
			height: 50px;
			position: relative;
			background-color: #FFFFFF;
		}

		.head-text {
			text-align: center;
			line-height: 50px;
			font-size: 20px;
			font-weight: 900;
		}

		.Release {
			position: absolute;
			right: 10px;
			top: 7px;
			text-align: center;
		}

		.el-carousel__item h3 {
			color: #475669;
			font-size: 14px;
			opacity: 0.75;
			line-height: 150px;
			margin: 0;
		}

		.el-carousel__item:nth-child(2n) {
			background-color: #99a9bf;
		}

		.el-carousel__item:nth-child(2n+1) {
			background-color: #d3dce6;
		}

		.lb-img {
			width: 100%;
			height: 100%;
			max-width: 100%;
			display: block;
			border-radius: 7px;
		}

		.lazy-box {
			position: relative;
			float: left;
			margin-top: 4%;
			margin-left: 2%;
			width: 47%;
			height: 230px;
			border-radius: 7px;
			box-shadow: 0px 5px 2px 0px rgba(0, 0, 0, 0.05);
			background-color: #FFFFFF;
		}

		.lazy-img {
			width: 100%;
			height: 150px;
			background-color: #FFFFFF;
		}

		.main-bottom {
			float: right;
			width: 100%;
			height: 150px;
			text-align: center;
			line-height: 100px;
			color: #99A9BF;
			font-size: 12px;
		}

		.HomeBox {
			position: relative;
			width: 100%;
			min-height: 780px;
			height: auto;
			top: 0;
		}
	}
</style>
