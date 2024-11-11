<template>
	<view style="width: 100%; height: 100%;">
		<view style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
			<view class="success-btn-box">
				<view class="success-btn">
					<image src="/static/send.svg" mode="aspectFill"></image>
				</view>
			</view>
			<view style="font-size: 26px; font-weight: bold;">
				提交成功
			</view>
			<view style="font-size: 14px; margin-top: 10px;">
				HR会尽快查看您的信息，请耐心等待
			</view>
			<view style="font-size: 14px; margin-top: 20px; color: #ff6a39;" @click="back()">
				返回
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
			back(){
				uni.navigateBack({
					delta:2
				});
			}
		}
	}
</script>

<style lang="scss">
	.success-btn-box{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 220rpx;
		.success-btn{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 80rpx;
			height: 80rpx;
			background: linear-gradient(to bottom,#6757bf,#6737bf);
			padding: 30rpx;
			border-radius: 100%;
			box-shadow: 8rpx 8rpx 16rpx 8rpx rgba(103,55,191,0.2);
			image{
				width: 70%;
				height: 70%;
			}
		}
	}
</style>
