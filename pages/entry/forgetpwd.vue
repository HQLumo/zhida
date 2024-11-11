<template>
	<view class="img-box">
		<image src="/static/logo.png"></image>
	</view>
	<view class="signup-box">
		<view class="title">
			手机号
		</view>
		<view class="box-1">
			<input v-model="username" type="number" style="width: 100%;" />
		</view>
		<view class="title">
			验证码
		</view>
		<view class="box-1">
			<input v-model="code" type="number" />
			<view class="send-btn" @click="getCode()">
				{{sendTxt}}
			</view>
		</view>
		<view class="title">
			新的密码
		</view>
		<view class="box-1">
			<input v-model="pwd" password="true" style="width: 100%;" />
		</view>
		<view class="signup-btn-box">
			<view class="signup-btn" @click="signup()">
				<text class="signup-txt">确认</text>
			</view>
		</view>
	</view>
	<view class="login-box">
		<view class="txt">
			密码已找回？
		</view>
		<view class="tologin" @click="toLogin()">
			返回登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:'',
				code:'',
				pwd:'',
				countdown: 0, // 倒计时初始时间
				timer: null, // 定时器
				canSend: true
			}
		},
		computed: {
			sendTxt() {
				return this.countdown > 0 ? `${this.countdown}秒后重发` : '发送验证码';
			}
		},
		methods: {
			getCode(){
				if(this.canSend){
					uni.request({
						url:this.$url+'/user/sendCode/'+this.username,
						method:'GET',
						success: (res) => {
							console.log(res);
							this.startCountdown();
						}
					})
				}else{
					
				}
			},
			
			startCountdown() {
			  if (this.timer) {
				clearInterval(this.timer); // 清除之前的定时器
			  }

			  this.countdown = 60; // 重置倒计时
			  this.canSend=false;

			  this.timer = setInterval(() => {
				if (this.countdown > 0) {
				  this.countdown--; // 倒计时减1
				} else {
				  clearInterval(this.timer); // 倒计时结束，清除定时器
				  this.canSend=true;
				}
			  }, 1000);
			},
			
			signup(){
				uni.request({
					url:this.$url+'/user/resetPassword',
					data:{
						'username':this.username,
						'password':this.pwd,
						'code':this.code
					},
					method:'POST',
					success: (res) => {
						console.log(res);
						if(res.data.code==200){
							uni.showToast({
								title:'修改成功',
								icon:'success'
							})
							uni.navigateTo({
								url:'/pages/account/login'
							})
						}
						else{
							if(res.data.msg!=null){
								uni.showToast({
									title:res.data.msg,
									icon:'none'
								})
							}else{
								uni.showToast({
									title:'手机号不存在',
									icon:'none'
								})
							}
						}
					}
				})
			},
			toLogin(){
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">
	.img-box{
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 100rpx 40rpx 40rpx 40rpx;
	}
	
	.signup-box{
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
			input{
				flex-grow: 1;
			}
			.send-btn{
				color: #fff;
				font-size: 24rpx;
				background: linear-gradient(to bottom,#6757bf,#6737bf);
				box-shadow: 8rpx 8rpx 16rpx 8rpx rgba(103,55,191,0.2);
				border-radius: 20rpx;
				padding: 24rpx;
				margin-left: 20rpx;
			}
		}
		.signup-btn-box{
			display: flex;
			align-items: center;
			justify-content: center;
			height: 220rpx;
			.signup-btn{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 80rpx;
				height: 80rpx;
				background: linear-gradient(to bottom,#6757bf,#6737bf);
				padding: 30rpx;
				border-radius: 100%;
				box-shadow: 8rpx 8rpx 16rpx 8rpx rgba(103,55,191,0.2);
				.signup-txt{
					color: #fff;
					font-size: 32rpx;
					font-weight: bold;
				}
			}
		}
	}
	
	.login-box{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px;
		font-size: 12px;
		.txt{
			color: #666;
		}
		.tologin{
			color: #6737bf;
		}
	}
</style>
