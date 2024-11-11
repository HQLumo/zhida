<template>
	<view class="top-nav-bar-box">
		<view class="content">
			<view class="back-btn">
				<image v-if="showBackBtn" src="../../static/icon/back.svg" mode="scaleToFill" @click="back()"></image>
			</view>
			<view class="title-txt">
				<text>{{title}}</text>
			</view>
			<view class="list-btn">
				<image v-if="showListBtn" src="../../static/icon/list.svg" mode="scaleToFill" @click="openList()"></image>
			</view>
		</view>
	</view>
	<view class="space-box" />
</template>

<script>
	export default {
		name:"top-nav-bar",
		props:{
			title:{
				type:String,
				default:"标题"
			},
			showBackBtn:{
				type:Boolean,
				default:false
			},
			showListBtn:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {

			};
		},
		methods:{
			back(){
				uni.navigateBack()
			},
			
			openList(){
				uni.navigateTo({
					url:'/pages/chat/chat'
				})
			},
			
			onClickPopMenu(){
				
			}
		}
	}
</script>

<style lang="scss">
	.top-nav-bar-box{
		position: fixed;
		display: flex;
		flex-direction: column-reverse;
		width: 100%;
		z-index: 1000;
		background-color: #fff;
		padding-top: 20px;
		padding-bottom: 10px;
		.content{
			display: flex;
			flex-direction: row;
			width: 100%;
			padding-top: 20px;
			.back-btn{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-evenly;
				width: 20px;
				height: 20px;
				margin-left: 20px;
			}
			.title-txt{
				flex-grow: 1;
				text-align: center;
				text{
					font-size: 18px;
				}
			}
			.list-btn{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-evenly;
				width: 20px;
				height: 20px;
				margin-right: 20px;
			}
		}
	}
	
	.space-box{
		height: 75px;
	}
</style>