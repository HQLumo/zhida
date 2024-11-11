<template>
	<view>
		
		<topbar title="查看投递信息" showBackBtn="true" />
		
		<view class="item-box">
			<view class="left-box">
				<view class="box-1">
					<view class="name">
						XXX
					</view>
					<view class="sex">
						男
					</view>
				</view>
				<view class="box-2">
					<view class="info">
						四川大学
					</view>
					<view class="info">
						本科
					</view>
					<view class="info">
						软件工程
					</view>
				</view>
				<view class="time-box">
					<view class="time">
						2024-09-05
					</view>
				</view>
			</view>
			<view class="right-box">
				<view class="btn">
					私聊
				</view>
				<view class="btn">
					招聘
				</view>
				<view class="txt">
					下载简历
				</view>
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

		}
	}
</script>

<style lang="scss">
	
	.item-box{
		display: flex;
		margin: 20px;
		padding: 10px;
		border-radius: 10px;
		box-shadow: 0 0 10px 5px rgba(240,240,255,0.7);
		.left-box{
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			.box-1{
				display: flex;
				align-items: center;
				.name{
					font-size: 15px;
					font-weight: bold;
				}
				.sex{
					font-size: 12px;
					margin-left: 10px;
				}
			}
			.box-2{
				display: flex;
				align-items: center;
				.info{
					font-size: 12px;
					margin-right: 5px;
				}
			}
			.time-box{
				flex-grow: 1;
				display: flex;
				flex-direction: column-reverse;
				.time{
					font-size: 12px;
				}
			}
		}
		.right-box{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			.btn{
				margin-bottom: 5px;
				background-color: #6737bf;
				padding: 3px 20px;
				font-size: 12px;
				color: #fff;
				border-radius: 8px;
			}
			.txt{
				font-size: 14px;
				color: #ff6a39;
			}
		}
	}
	
</style>
