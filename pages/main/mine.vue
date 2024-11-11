<template>
	<view>
		<topbar title="个人"></topbar>
		
		<view class="profile-img-box" @click="toEditProfile()">
			<image class="img" :src="$getImageUrl(userData.header)" mode="scaleToFill"></image>
		</view>
		<view class="profile-txt-box">
			<text class="name">{{userData.nickname}}</text>
			<text class="type">免费用户</text>
		</view>
		<view class="invitation-code-box">
			<view class="invitation-code">
				邀请码：#26584
			</view>
			<image src="/static/icon/copy.svg" mode="scaleToFill" @click="copyInvitationCode()"></image>
		</view>
		<view class="integral-box">
			<view class="total">
				<text>总积分：{{userData.skill+userData.financial+userData.emotional}}</text>
			</view>
			<view class="classify">
				<view class="class">
					<view class="box" style="background: #ff9439; boxShadow: 4px 4px 8px 4px rgba(255,148,57, 0.2)">
						<image class="icon" src="/static/icon/send.svg" mode="aspectFit"></image>
						<view class="num">{{userData.skill}}</view>
					</view>
					<view class="type" style="color: #ff9439">技能</view>
				</view>
				<view class="class">
					<view class="box" style="background: #6737bf; boxShadow: 4px 4px 8px 4px rgba(103,55,191, 0.2)">
						<image class="icon" src="/static/icon/send.svg" mode="aspectFit"></image>
						<view class="num">{{userData.financial}}</view>
					</view>
					<view class="type" style="color: #6737bf">财商</view>
				</view>
				<view class="class">
					<view class="box" style="background: #ff7339; boxShadow: 4px 4px 8px 4px rgba(255,115,57, 0.2)">
						<image class="icon" src="/static/icon/send.svg" mode="aspectFit"></image>
						<view class="num">{{userData.emotional}}</view>
					</view>
					<view class="type" style="color: #ff7339">情商</view>
				</view>
			</view>
		</view>
		<view class="finished-course-box">
			<view class="title">已学课程</view>
			<view class="list">
				<view class="finished-course" v-for="(item,index) in finishedCourseList" :key="index" :style="{background:item.color}">
					{{item.name}}
				</view>
			</view>
		</view>
		<view class="personal-reports-box">
			<view class="box-1">
				<view class="title">个人报告</view>
				<view class="see-all">查看全部</view>
			</view>
			<view class="box-2">
				<view class="txt-box">
					<view class="title">综合评估</view>
					<view class="content">
						核心胜任力报告<br />
						MIBTI报告<br />
						雷达图<br />
					</view>
				</view>
			</view>
		</view>
		<view class="upgrade-plan-box">
			<view class="title">升级计划</view>
			<view class="plan-list">
				<view class="plan-box">
					
				</view>
			</view>
		</view>
		
		<view class="ai-title">
			课程规划
		</view>
		<view class="ai-box">
			<view class="box-1">
				<view class="title-box">
					<view class="title">
						Best Seller
					</view>
				</view>
			</view>
			<view class="box-2">
				<view class="left-box">
					<view class="txt-1">
						当前规划
					</view>
					<view class="txt-2">
						游戏开发工程师
					</view>
					<view class="txt-3">
						By:职达AI
					</view>
					<view class="bottom-box">
						<view class="btn-box">
							<image src="/static/send.svg" mode="aspectFill"></image>
						</view>
						<view class="txt-4">
							AI规划
						</view>
					</view>
				</view>
				<view class="right-box">
					<image src="/static/34676.png" mode="scaleToFill"></image>
				</view>
			</view>
			<view class="box-3">
				<AttributeBox :showNum="false" color="#ff9439"></AttributeBox>
				<view class="progress-bar-box">
					<view class="progress-bar" :style="{width:(0.5*100)+'%'}" style="background-color: #ff9439;"></view>
				</view>
				<AttributeBox :showNum="false" color="#6737bf"></AttributeBox>
				<view class="progress-bar-box">
					<view class="progress-bar" :style="{width:(0.3*100)+'%'}" style="background-color: #6737bf;"></view>
				</view>
				<AttributeBox :showNum="false" color="#ff7339"></AttributeBox>
				<view class="progress-bar-box">
					<view class="progress-bar" :style="{width:(0.7*100)+'%'}" style="background-color: #ff7339;"></view>
				</view>
			</view>
		</view>
		
		<view class="study-time-box">
			<view class="title">
				学习时长
			</view>
			<view class="box-1">
				
			</view>
			<view class="box-2">
				<view class="tab-box-active">
					<text>Course Included</text>
				</view>
				<view class="tab-box">
					<text>Course Description</text>
				</view>
				<view class="tab-box">
					<text>What I Will Learn?</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import AttributeBox from "@/components/attribute-box/attribute-box.vue"
	export default {
		components:{
			AttributeBox,
		},
		data() {
			return {
				finishedCourseList:[
					{
						name:"UE5大师课",
						color:'#ff9439'
					},
					{
						name:"unity",
						color:'#ff7339'
					},
					{
						name:"计算机图形学",
						color:'#ff7339'
					},
					{
						name:"北大创业指导及生涯规划",
						color:'#ff9439'
					},
				],
				userData:[],
				a1:0.5,
				a2:0.3,
				a3:1.0
			}
		},
		methods: {
			copyInvitationCode(){
				uni.setClipboardData({
				  data: '26584',
				  success: function () {
					  uni.showToast({
					  	title:'复制成功',
						icon:'none'
					  })
				  }
				});
			},
			
			toEditProfile(){
				uni.navigateTo({
					url:'/pages/subpage/mine/edit-profile'
				})
			},
			
			loadMineData(){
				uni.request({
					url:this.$url+'/user/getUserInfo',
					header:{
						'token':uni.getStorageSync('token')
					},
					method:'POST',
					success: (res) => {
						this.userData=res.data.data
					}
				})
			}
		},
		mounted(){
			var that=this;
			uni.$on('reloadData',function(){
				that.loadMineData();
			});
		},
		
		beforeDestroy() {
			uni.$off('reloadData');
		}
	}
</script>

<style lang="scss">
	.profile-img-box{
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		width: 100%;
		height: 120px;
		padding: 10px 0px;
		.img{
			width: 100px;
			height: 100px;
			border-radius: 100%;
		}
	}
	.profile-txt-box{
		display: flex;
		flex-direction: column;
		align-items: center;
		.name{
			font-size: 18px;
			font-weight: bold;
			margin-bottom: 10px;
		}
		.type{
			font-size: 12px;
			color: #888;
		}
	}
	.invitation-code-box{
		margin-top: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		.invitation-code{
			font-size: 14px;
			color: #ff7339;
			font-weight: bold;
		}
		image{
			margin-left: 5px;
			width: 12px;
			height: 12px;
		}
	}
	.integral-box{
		display: flex;
		flex-direction: column;
		align-items: center;
		.total{
			margin: 20px 0 10px 0;
			font-size: 14px;
			font-weight: bold;
			color: #ff7339;
		}
		.classify{
			display: flex;
			flex-direction: row;
			.class{
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 100px;
				height: auto;
				.box{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-evenly;
					width: 60px;
					height: 60px;
					border-radius: 20px;
					.icon{
						width: 30px;
						height: 30px;
					}
					.num{
						color: #fff;
						font-size: 14px;
						font-weight: bold;
					}
				}
				.type{
					margin-top: 10px;
					font-size: 14px;
				}
			}
		}
	}
	.finished-course-box{
		margin: 30px 20px;
		.title{
			font-size: 18px;
			font-weight: bold;
		}
		.list{
			display: flex;
			flex-wrap: wrap;
			margin-top: 10px;
			.finished-course{
				padding: 5px 10px;
				margin: 0 10px 10px 0;
				border-radius: 20px;
				color: #fff;
			}
		}
	}
	.personal-reports-box{
		.box-1{
			display: flex;
			margin: 0 20px;
			.title{
				flex-grow: 1;
				font-size: 18px;
				font-weight: bold;
			}
			.see-all{
				font-size: 14px;
			}
		}
		.box-2{
			background: url('/static/logo.png') no-repeat center center / 100% auto;
			height: 280px;
			.txt-box{
				padding: 80px 0 0 240px;
				.title{
					font-size: 18px;
					color: #fff;
					font-weight: bold;
				}
				.content{
					color: #eee;
					margin-top: 10px;
					font-size: 8px;
					line-height: 16px;
				}
			}
		}
	}
	.upgrade-plan-box{
		margin: 20px 20px;
		.title{
			font-size: 18px;
			font-weight: bold;
		}
		.plan-list{
			margin-top: 20px;
			.plan-box{
				height: 80px;
				border-radius: 20px;
				box-shadow: 0 0 10px 5px rgba(240, 240, 255, 0.7);
			}
		}
	}
	.ai-title{
		margin-left: 20px;
		font-size: 18px;
		font-weight: bold;
	}
	.ai-box{
		margin: 20px 20px 0 20px;
		padding: 20px;
		background-color: #fff;
		box-shadow: 0 0 30px 20px rgba(240,240,255,0.7);
		border-radius: 20px;
		.box-1{
			display: flex;
			.title-box{
				background-color: #6737bf;
				border-radius: 10px;
				padding: 5px 10px;
				.title{
					font-size: 10px;
					color: #fff;
				}
			}
		}
		.box-2{
			display: flex;
			margin-top: 20px;
			.left-box{
				display: flex;
				flex-direction: column;
				.txt-1{
					margin-top: 10px;
					font-size: 14px;
				}
				.txt-2{
					font-size: 16px;
					font-weight: bold;
				}
				.txt-3{
					margin-top: 10px;
					font-size: 10px;
					color: #888;
				}
				.bottom-box{
					display: flex;
					align-items: center;
					margin-top: 50px;
					.btn-box{
						display: flex;
						align-items: center;
						justify-content: center;
						width: 40px;
						height: 40px;
						background: linear-gradient(to bottom,#ff9c39,#ff6a39);
						box-shadow: 2px 2px 5px 1px rgba(255, 146, 57, 0.5);
						border-radius: 100%;
						image{
							width: 50%;
							height: 50%;
						}
					}
					.txt-4{
						margin-left: 10px;
						color: #888;
					}
				}
			}
			.right-box{
				flex-grow: 1;
				padding-bottom: 10px;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.box-3{
			margin-top: 20px;
			display: flex;
			align-items: center;
			.progress-bar-box{
				margin-right: 10px;
				width: 40px;
				height: 10px;
				.progress-bar{
					height: 100%;
					border-radius: 5px;
				}
			}
		}
	}
	
	.study-time-box{
		margin: 40px 20px 0 20px;
		.title{
			font-size: 18px;
			font-weight: bold;
		}
		.box-1{
			margin-top: 20px;
			width: 100%;
			height: 80px;
			border-radius: 20px;
			box-shadow: 0 0 20px 10px rgba(240,240,255,0.7);
		}
		.box-2{
			margin-top: 20px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.tab-box-active{
				display: flex;
				align-items: center;
				justify-content: center;
				text-align: center;
				width: 80px;
				height: 40px;
				padding: 5px 10px;
				background-color: #6737bf;
				border-radius: 15px;
				color: #fff;
				font-size: 12px;
			}
			.tab-box{
				display: flex;
				align-items: center;
				justify-content: center;
				text-align: center;
				width: 80px;
				height: 40px;
				padding: 5px 10px;
				background-color: #fff;
				border-radius: 15px;
				color: #000;
				font-size: 12px;
			}
		}
	}
</style>
