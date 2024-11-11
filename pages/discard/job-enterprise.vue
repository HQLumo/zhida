<template>
	<view class="page-box">
		
		<view class="title">
			发布招聘岗位
		</view>
		
		<view class="option-box" @click="toJobPublish('全职')">
			<view class="icon-box">
				<image src="/static/send.svg" mode="aspectFill"></image>
			</view>
			<view class="name">
				全职招聘
			</view>
			<view class="enter-box">
				<image src="/static/back.svg" mode="aspectFill"></image>
			</view>
		</view>
		
		<view class="option-box" @click="toJobPublish('实习')">
			<view class="icon-box">
				<image src="/static/send.svg" mode="aspectFill"></image>
			</view>
			<view class="name">
				实习招聘
			</view>
			<view class="enter-box">
				<image src="/static/back.svg" mode="aspectFill"></image>
			</view>
		</view>
		
		<view class="option-box" @click="toJobPublish('兼职')">
			<view class="icon-box">
				<image src="/static/send.svg" mode="aspectFill"></image>
			</view>
			<view class="name">
				兼职招聘
			</view>
			<view class="enter-box">
				<image src="/static/back.svg" mode="aspectFill"></image>
			</view>
		</view>
		
		<view class="title">
			管理招聘岗位
		</view>
		
		<view class="option-box" @click="toJobCheckApplication()">
			<view class="icon-box">
				<image src="/static/send.svg" mode="aspectFill"></image>
			</view>
			<view class="name">
				查看投递信息
			</view>
			<view class="enter-box">
				<image src="/static/back.svg" mode="aspectFill"></image>
			</view>
		</view>
		
		<view class="option-box" @click="toJobManage()">
			<view class="icon-box">
				<image src="/static/send.svg" mode="aspectFill"></image>
			</view>
			<view class="name">
				管理招聘发布信息
			</view>
			<view class="enter-box">
				<image src="/static/back.svg" mode="aspectFill"></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toJobPublish(jobType){
				uni.setStorageSync('jobType',jobType);
				uni.navigateTo({
					url:'/pages/job-subpage/enterprise/job-publish'
				})
			},
			
			toJobCheckApplication(){
				uni.navigateTo({
					url:'/pages/job-subpage/enterprise/job-check-application'
				})
			},
			
			toJobManage(){
				uni.navigateTo({
					url:'/pages/job-subpage/enterprise/job-manage'
				})
			}
		}
	}
</script>

<style lang="scss">
	.page-box{
		margin: 20px;
		.title{
			font-size: 18px;
			margin: 20px 0;
		}
		.option-box{
			border-radius: 10px;
			box-shadow: 0 0 10px 5px rgba(240,240,255,0.7);
			display: flex;
			margin-top: 10px;
			padding: 10px;
			.icon-box{
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 100%;
				box-shadow: 2px 2px 5px 1px rgba(255, 146, 57, 0.5);
				background: linear-gradient(to bottom,#ff9c39,#ff6a39);
				width: 20px;
				height: 20px;
				image{
					width: 60%;
					height: 60%;
				}
			}
			.name{
				flex-grow: 1;
				margin-left: 10px;
				font-size: 14px;
			}
			.enter-box{
				width: 20px;
				height: 20px;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
