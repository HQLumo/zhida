<template>
	<view class="search-box">
		<view class="search-bar-box">
			<view class="search-bar">
				<view class="search-input">
					<input class="search-txt" type="text" name="" placeholder="搜索">
				</view>
				<view class="search-btn" @click="onSearch()">
					<image src="/static/icon/search.svg" mode="scaleToFill" style="width: 15px; height: 15px;"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"searchbar",
		data() {
			return {
				
			};
		},
		methods:{
			onSearch(){

			}
		}
	}
</script>

<style lang="scss">
	.search-box{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		.search-bar-box{
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			background: #fff;
			height: 30px;
			width: 80%;
			border-radius: 20px;
			padding: 10px;
			margin: 20px;
			box-shadow: 2px 3px 5px 3px rgba(240,240,255,0.7);
			.search-bar{
				display: flex;
				.search-input{
					display: flex;
					flex-direction: column;
					justify-content: space-evenly;
					width: 90%;
					.search-txt{
						font-size: 16px;
					}
				}
				.search-btn{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-evenly;
					width: 30px;
					height: 30px;
					border-radius: 100%;
					background: linear-gradient(to bottom,#ff9c39,#ff6a39);
					box-shadow: 2px 2px 5px 1px rgba(255, 146, 57, 0.5);
				}
			}
		}
	}

</style>