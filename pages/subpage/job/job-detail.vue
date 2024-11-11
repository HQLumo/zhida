<template>
	<view>
		<topbar title="" showBackBtn="true" />
		
		<view style="margin: 0 40rpx;">
			<view class="top-box">
				<view class="title">
					{{jobData.jobName}}
				</view>
				<view class="company">
					{{jobData.companyName}}
				</view>
				<view class="location">
					{{jobData.companyLocation}}
				</view>
			</view>
			
			<view class="box-2">
				<view class="toggle" v-for="(tag,i) in jobData.jobTags" :key="i">
					{{tag}}
				</view>
			</view>
			
			<view class="content-title">
				岗位描述
			</view>
			<view class="content">
				{{jobData.jobDes}}
			</view>
			
			<view class="content-title">
				岗位要求
			</view>
			<view class="content">
				{{jobData.jobRequire}}
			</view>
			
			<view class="company-box">
				<image src="/static/logo.png" mode="aspectFill"></image>
				<view class="txt">
					<view class="name">
						{{jobData.companyName}}
					</view>
					<view class="description">
						1000-9999人互联网
					</view>
				</view>
			</view>
			
			<view class="invitation-txt">
				填写邀请码获得折扣{{jobData.price}}->{{jobData.invitePrice}}元
			</view>
			
			<view class="btn-1-box">
				<view class="btn-1" @click="toJobApply()">
					<text>立即网申</text>
				</view>
			</view>
			
			<view class="btn-1-box">
				<view class="btn-1">
					<text>联系客服</text>
				</view>
			</view>
			
			<view style="height: 20px;"></view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				jobData:''
			}
		},
		methods: {
			toJobApply(){
				uni.navigateTo({
					url:'/pages/subpage/job/job-apply'
				})
			}
		},
		
		mounted() {
			uni.request({
				url:this.$url+'/job/getJobInfo/'+uni.getStorageSync('jobId'),
				header:{
					'token':uni.getStorageSync('token')
				},
				success: (res) => {
					let str = res.data.data.jobTags;
					let arr = str.split(/,\s*/);
					res.data.data.jobTags = arr.map(item => item.replace(/[\[\]]/g, ''));
					
					this.jobData=res.data.data;
				}
			})
		}
	}
</script>

<style lang="scss">
	
	.top-box{
		.title{
			font-size: 18px;
			font-weight: bold;
		}
		.company{
			font-size: 14px;
			color: #ff6a39;
			margin-top: 3px;
		}
		.location{
			font-size: 14px;
			margin-top: 6px;
			color: #888;
		}
	}
	
	.box-2{
		display: flex;
		margin-top: 5px;
		.toggle{
			background-color: #ddd;
			border-radius: 20px;
			font-size: 12px;
			margin-right: 5px;
			padding: 3px 8px;
		}
	}
	
	.content-title{
		margin-top: 20px;
		font-size: 18px;
		font-weight: bold;
	}
	
	.content{
		font-size: 12px;
		margin-top: 5px;
	}
	
	.company-box{
		display: flex;
		align-items: center;
		margin-top: 20px;
		padding: 10px 15px;
		box-shadow: 0 0 10px 5px rgba(240,240,255,0.7);
		border-radius: 10px;
		image{
			width: 30px;
			height: 30px;
		}
		.txt{
			margin-left: 10px;
			.name{
				font-size: 14px;
				color: #888;
			}
			.description{
				font-size: 12px;
				color: #888;
			}
		}
	}
	
	.invitation-txt{
		margin-top: 20px;
		text-align: center;
		color: #ff9c39;
	}
	
	.btn-1-box{
		margin: 20px 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 40px;
		.btn-1{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 40px;
			background: linear-gradient(to bottom,#ff9c39,#ff6a39);
			box-shadow: 2px 2px 5px 1px rgba(255, 146, 57, 0.5);
			border-radius: 10px;
			text{
				font-size: 16px;
				color: #fff;
			}
		}
	}
</style>
