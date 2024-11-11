<template>
	<view>
		<topbar title="支付" showBackBtn="true" />
		<view class="num">
			￥{{payment}}
		</view>
		
		<view class="payment-way-box">
			
			<view class="payment-way" @click="switchPaymentWay(1)">
				<image src="/static/icon/pay1.svg" mode="scaleToFill"></image>
				<view class="txt">
					微信支付
				</view>
				<view v-if="paymentWay==1" class="toggle-1">
					<view class="toggle-1-selected"></view>
				</view>
				<view v-else class="toggle-2"></view>
			</view>
			
			<view class="payment-way" @click="switchPaymentWay(2)">
				<image src="/static/icon/pay2.svg" mode="scaleToFill"></image>
				<view class="txt">
					支付宝支付
				</view>
				<view v-if="paymentWay==2" class="toggle-1">
					<view class="toggle-1-selected"></view>
				</view>
				<view v-else class="toggle-2"></view>
			</view>
			
			<view class="payment-way" @click="switchPaymentWay(3)">
				<image src="/static/icon/pay3.svg" mode="scaleToFill"></image>
				<view class="txt">
					Apple Pay
				</view>
				<view v-if="paymentWay==3" class="toggle-1">
					<view class="toggle-1-selected"></view>
				</view>
				<view v-else class="toggle-2"></view>
			</view>
			
		</view>
		
		<view class="buy-btn-box">
			<view class="buy-btn" @click="pay()">
				<text>支付</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payment:0,
				paymentWay:1
			}
		},
		methods: {
			switchPaymentWay(i){
				this.paymentWay=i;
			},
			
			pay(){
				
			}
		},
		mounted() {
			this.payment=uni.getStorageSync('payment');
		}
	}
</script>

<style lang="scss">
	.num{
		display: flex;
		justify-content: center;
		font-size: 30px;
		color: #ff6a39;
		margin-top: 20px;
	}
	
	.payment-way-box{
		margin: 60px 40px 0 40px;
		.payment-way{
			margin-top: 30px;
			display: flex;
			align-items: center;
			border-radius: 10px;
			padding: 10px 20px;
			box-shadow: 0 0 20px 10px rgba(240,240,255,0.7);
			image{
				width: 30px;
				height: 30px;
			}
			.txt{
				margin-left: 10px;
				flex-grow: 1;
				font-size: 13px;
			}
			.toggle-1{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 15px;
				height: 15px;
				border-radius: 100%;
				border-color: #ff6a39;
				border-width: 4rpx;
				border-style: solid;
				.toggle-1-selected{
					width: 80%;
					height: 80%;
					border-radius: 100%;
					background: linear-gradient(to bottom,#ff9c39,#ff6a39);
				}
			}
			.toggle-2{
				width: 15px;
				height: 15px;
				border-radius: 100%;
				border-color: #888;
				border-width: 4rpx;
				border-style: solid;
			}
		}
	}
	
	.buy-btn-box{
		margin-top: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 40px;
		.buy-btn{
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
