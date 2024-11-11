<template>
	<view class="img-box">
		<image src="/static/logo.png"></image>
	</view>
	<view class="login-box">
		<view class="title">
			手机号
		</view>
		<view class="box-1">
			<input v-model="username" type="text" style="width: 100%;" />
		</view>
		<view class="title">
			密码
		</view>
		<view class="box-1">
			<input v-model="pwd" password="true" style="width: 100%;" />
		</view>
		<view class="forgetpwd" @click="toForgetpwd()">
			忘记密码
		</view>
		<view class="login-btn-box">
			<view class="login-btn" @click="login()">
				<text class="login-txt">登录</text>
			</view>
		</view>
	</view>
	<view class="signup-box">
		<view class="txt">
			没有注册账号？
		</view>
		<view class="tosignup" @click="toSignup()">
			点击注册
		</view>
	</view>
</template>

<script>
import { onBeforeUnmount } from 'vue';
	export default {
		data() {
			return {
				username:'',
				pwd:''
			}
		},
		methods: {
			login(){
				uni.request({
				  url: this.$url +'/user/passwordLogin',
				  method: 'POST',
				  data:{
					  username:this.username,
					  password:this.pwd
				  },
				  success: (res) => {
					  if(res.data.code==500){
						  uni.showToast({
						  	title:'账号不存在或密码输入错误',
						  	icon:'none'
						  })
					  }
					  else{
						  uni.setStorageSync('username', this.username);
						  uni.setStorageSync('pwd', this.pwd);
						  uni.setStorageSync('token',res.data.data.token);
						  
						  uni.connectSocket({
							  url: this.$ws+'/ws/connect?token='+uni.getStorageSync('token'),
						  });
						  uni.onSocketOpen(res=>{
							  console.log("websocket open");
						  });
						  uni.onSocketClose(res=>{
							  console.log("websocket close"+res);
						  });
						  uni.onSocketError(res=>{
							  console.error("websocket error");
						  });
						  
						  uni.navigateTo({
						  	url:'/pages/main/main'
						  })
					  }
				  },
				});
			},
			toSignup(){
				uni.navigateTo({
					url:'/pages/entry/signup'
				})
			},
			toForgetpwd(){
				uni.navigateTo({
					url:'/pages/entry/forgetpwd'
				})
			}
		},
		mounted() {
			const username = uni.getStorageSync('username');
			const pwd = uni.getStorageSync('pwd');
			if (username && pwd) {
				this.username=username;
				this.pwd=pwd;
			}
		},
	}
</script>

<style lang="scss">
	.img-box{
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 100rpx 40rpx 40rpx 40rpx;
	}
	
	.login-box{
		margin: 0 40rpx;
		.title{
			font-size: 30rpx;
		}
		.box-1{
			display: flex;
			align-items: center;
			padding: 0 20rpx;
			background-color: #eee;
			border-radius: 20rpx;
			margin: 40rpx 0;
			height: 100rpx;
		}
		.forgetpwd{
			display: flex;
			flex-direction: row-reverse;
			font-size: 20rpx;
			margin-top: 40rpx;
		}
		.login-btn-box{
			display: flex;
			align-items: center;
			justify-content: center;
			height: 220rpx;
			.login-btn{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 80rpx;
				height: 80rpx;
				background: linear-gradient(to bottom,#6757bf,#6737bf);
				padding: 30rpx;
				border-radius: 100%;
				box-shadow: 8rpx 8rpx 16rpx 8rpx rgba(103,55,191,0.2);
				.login-txt{
					color: #fff;
					font-size: 32rpx;
					font-weight: bold;
				}
			}
		}
	}
	
	.signup-box{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px;
		font-size: 12px;
		.txt{
			color: #666;
		}
		.tosignup{
			color: #6737bf;
		}
	}
</style>
