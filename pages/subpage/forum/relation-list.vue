<template>
	<view>
		<topbar title="关注" showBackBtn="true" />
		<SearchBar></SearchBar>
		
		<view class="selection-tab-box">
			<view class="selection-tab" @click="switchTab(1)">
				<view class="num">
					{{mineData.attention}}
				</view>
				<view class="txt">
					关注
				</view>
				<view v-if="currentSelection==1" class="selected-mark"></view>
			</view>
			<view class="selection-tab" @click="switchTab(2)">
				<view class="num">
					{{mineData.fans}}
				</view>
				<view class="txt">
					粉丝
				</view>
				<view v-if="currentSelection==2" class="selected-mark"></view>
			</view>
		</view>
		
		<view v-if="currentSelection==1" class="selection">
			<view class="list">
				<view v-for="(item,index) in attentionData" class="item">
					<view class="avatar-box">
						<image class="avatar" src="/static/logo.png" mode="aspectFill"></image>
					</view>
					<view class="txt-box">
						<view class="nickname">
							{{item.username}}
						</view>
						<view class="info">
							123
						</view>
					</view>
					<view class="btn-box-1">
						已关注
					</view>
				</view>
			</view>
		</view>
		
		<view v-if="currentSelection==2" class="selection">
			<view class="list">
				<view v-for="(item,index) in fansData" class="item">
					<view class="avatar-box">
						<image class="avatar" src="/static/logo.png" mode="aspectFill"></image>
					</view>
					<view class="txt-box">
						<view class="nickname">
							{{item.username}}
						</view>
						<view class="info">
							123
						</view>
					</view>
					<view class="btn-box-2">
						关注
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import SearchBar from "@/components/searchbar/searchbar.vue"
	export default {
		components:{
			SearchBar
		},
		data() {
			return {
				currentSelection:1,
				attentionPage:1,
				fansPage:1,
				attentionData:[],
				fansData:[],
				mineData:''
			}
		},
		methods: {
			switchTab(i){
				this.currentSelection=i;
			}
		},
		mounted() {
			uni.request({
				url:this.$url+'/blog/getMyInfo',
				header:{
					'token':uni.getStorageSync('token')
				},
				success: (res) => {
					this.mineData=res.data.data;
				}
			});
			uni.request({
				url:this.$url+'/blog/getAttentionList/'+this.attentionPage+'/20',
				header:{
					'token':uni.getStorageSync('token')
				},
				success: (res) => {
					this.attentionData=res.data.data;
				}
			});
			uni.request({
				url:this.$url+'/blog/getFansList/'+this.fansPage+'/20',
				header:{
					'token':uni.getStorageSync('token')
				},
				success: (res) => {
					this.fansData=res.data.data;
				}
			});
		}
	}
</script>

<style lang="scss">
.selection-tab-box{
	display: flex;
	align-items: center;
	justify-content: space-around;
	.selection-tab{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.num{
			font-size: 16px;
			font-weight: bold;
		}
		.txt{
			font-size: 14px;
		}
		.selected-mark{
			margin-top: 5px;
			width: 30px;
			height: 3px;
			background-color: #8888ff;
		}
	}
}

.selection{
	.list{
		margin: 20px;
		.item{
			display: flex;
			align-items: center;
			margin-top: 20px;
			.avatar-box{
				width: 50px;
				height: 50px;
				image{
					width: 100%;
					height: 100%;
					border-radius: 100%;
				}
			}
			.txt-box{
				margin: 0 10px;
				flex-grow: 1;
				.nickname{
					font-size: 14px;
				}
				.info{
					font-size: 13px;
					color: #888;
				}
			}
			.btn-box-1{
				background-color: #ddd;
				padding: 5px 10px;
				border-radius: 20px;
				font-size: 12px;
			}
			.btn-box-2{
				background: linear-gradient(to bottom,#6757bf,#6737bf);
				padding: 5px 10px;
				border-radius: 20px;
				font-size: 12px;
				color: #fff;
			}
		}
	}
}
</style>
