<template>
	<view>
		<topbar title="课程" showBackBtn="true" />
		<view class="video-box">
			<video controls="true"></video>
		</view>
		<view class="box-1">
			<view class="box-1-1">
				<view class="title">
					{{courseData.courseTitle}}
				</view>
				<view class="cost">
					￥{{courseData.price}}
				</view>
			</view>
			<view class="box-1-2">
				<view class="attribute-box">
					<view class="attribute">
						技能:{{courseData.skill}}
					</view>
					<view class="attribute">
						财商:{{courseData.financial}}
					</view>
					<view class="attribute">
						情商:{{courseData.emotional}}
					</view>
				</view>
				<view class="add-box">
					<view class="toggle-box">
						<image src="/static/send.svg" mode="aspectFill"></image>
					</view>
					<view class="txt">
						添加至我的课程
					</view>
				</view>
			</view>
			<view class="box-1-3">
				<view class="time">
					{{courseData.updateTime.replace(new RegExp('T' + ".*"), '')}}
				</view>
				<view class="introduction">
					{{courseData.des}}
				</view>
				<view class="buy-btn-box">
					<view class="buy-btn" @click="toPay(courseData.price)">
						<text>立即购买</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="box-2">
			<view class="selection-bar">
				<view class="selection" @click="switchTab(1)">
					<view class="txt">
						合集
					</view>
					<view v-if="currentSelection==1" class="selected-mark"></view>
				</view>
				<view class="selection" @click="switchTab(2)">
					<view class="txt">
						更多
					</view>
					<view v-if="currentSelection==2" class="selected-mark"></view>
				</view>
			</view>
			
			<view v-if="currentSelection==1" class="selection-1">
				<view class="lesson">
					<view class="img">
						<image src="/static/logo.png" mode="aspectFill"></image>
					</view>
					<view class="title">
						第一集
					</view>
					<view class="icon">
						<image src="/static/icon/lock.svg" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
	
	<view style="height: 20px;"></view>
</template>

<script>
	export default {
		data() {
			return {
				currentSelection:1,
				courseData:'',
				lessonData:[]
			}
		},
		methods: {
			switchTab(i){
				this.currentSelection=i;
			},
			
			toPay(payment){
				uni.setStorageSync('payment',payment);
				uni.navigateTo({
					url:'/pages/util/pay'
				});
			}
		},
		mounted() {
			uni.request({
				url:this.$url+'/course/getCourseInfo/'+uni.getStorageSync('courseId'),
				header:{
					'token':uni.getStorageSync('token')
				},
				success: (res) => {
					console.log(res);
					this.courseData=res.data.data;
				}
			})
			
			uni.request({
				url:this.$url+'/course/getCourseLessons/'+uni.getStorageSync('courseId'),
				header:{
					'token':uni.getStorageSync('token')
				},
				success: (res) => {
					console.log(res);
					this.lessonData=res.data.data;
				}
			})
		}
	}
</script>

<style lang="scss">
	.video-box{
		video{
			width: 100%;
		}
	}
	
	.box-1{
		margin: 20px;
		.box-1-1{
			display: flex;
			.title{
				flex-grow: 1;
				font-size: 18px;
			}
			.cost{
				font-size: 18px;
				font-weight: bold;
				color: #ff6a39;
			}
		}
		.box-1-2{
			display: flex;
			margin-top: 5px;
			.attribute-box{
				display: flex;
				flex-grow: 1;
				.attribute{
					margin-right: 10px;
					font-size: 14px;
				}
			}
			.add-box{
				display: flex;
				font-size: 14px;
				align-items: center;
				justify-content: center;
				.toggle-box{
					display: flex;
					align-items: center;
					justify-content: center;
					width: 12px;
					height: 12px;
					margin-right: 5px;
					background-color: #ff6a39;
					image{
						width: 70%;
						height: 70%;
					}
				}
			}
		}
		.box-1-3{
			margin-top: 5px;
			.time{
				font-size: 12px;
			}
			.introduction{
				margin-top: 10px;
				font-size: 12px;
			}
			.buy-btn-box{
				display: flex;
				align-items: center;
				justify-content: center;
				.buy-btn{
					margin-top: 10px;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					height: 30px;
					background: linear-gradient(to bottom,#ff9c39,#ff6a39);
					box-shadow: 2px 2px 5px 1px rgba(255, 146, 57, 0.5);
					border-radius: 10px;
					text{
						font-size: 16px;
						color: #fff;
					}
				}
			}
		}
	}
	
	.box-2{
		margin: 0 20px;
		.selection-bar{
			display: flex;
			align-items: center;
			.selection{
				padding: 0 20px;
				.txt{
					font-size: 14px;
					color: #9900ff;
					padding: 2px;
				}
				.selected-mark{
					width: 100%;
					height: 2px;
					background-color: #ff6a39;
				}
			}
		}
		.selection-1{
			.lesson{
				margin-top: 20px;
				display: flex;
				align-items: center;
				.img{
					width: 100px;
					height: 80px;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.title{
					margin-left: 20px;
					font-size: 14px;
					flex-grow: 1;
				}
				.icon{
					width: 12px;
					height: 15px;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>
