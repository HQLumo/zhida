<template>
	<view>
		<topbar title="消息" showBackBtn="true" />
		<SearchBar />
		
		<view class="chat-item-box" v-for="(item,index) in groupData" :key="index" @click="gotoDialog(item.group_id,item.group_name,index)">
			<view class="avatar">
				<image :src="item.group_avatar" mode="aspectFill"></image>
			</view>
			<view class="txt">
				<view class="line1">
					<view class="name">{{item.group_name}}</view>
					<view class="time">{{item.time}}</view>
				</view>
				<view class="line2">
					<text class="msg">{{item.msg}}</text>
					<view class="unread-box" v-if="item.unread>0">
						<view v-if="item.unread<2" class="unread-txt">{{item.unread}}</view>
						<view v-else class="unread-txt">99</view>
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
			SearchBar,
		},
		data() {
			return {
				groupData:[],
				groupRuntimeData:[]
			}
		},
		methods: {
			gotoDialog(group_id,group_name,index){
				this.groupData[index].unread=0;
				uni.setStorageSync('group_id',group_id);
				uni.setStorageSync('group_name',group_name);
				uni.navigateTo({
					url:"/pages/chat/dialog",
				});
			}
		},
		mounted() {
			uni.request({
				url:this.$url+'/ws/getGroupsInfo',
				header:{
					'token':uni.getStorageSync('token')
				},
				success: (res) => {
					this.groupData=res.data.data;
					console.log(this.groupData);
					
					this.groupData.forEach((item,index)=>{
						uni.request({
							url:this.$url+'/message/getGroupMessages/'+item.group_id+'/0/1',
							header:{
								'token':uni.getStorageSync('token')
							},
							success: (msgData) => {
								let record=msgData.data.data.records[0];
								if(record!=null){
									item.msg=record.msg;
									item.time=this.$formatTime(parseInt(record.createTime));
									item.unread=0;
								}else{
									item.msg="群聊暂无消息";
									item.time="0:00";
									item.unread=0;
								}
							}
						});
					});
				}
			});
			
			uni.onSocketMessage(res=>{
				console.log(res.data);
				let jsonObj=JSON.parse(res.data);
				this.groupData.forEach((item,index)=>{
					if(jsonObj.group==item.group_id){
						item.msg=jsonObj.msg;
						item.time=formatTimeMS(new Date().getTime());
						item.unread+=1;
					}
				})
			});
			
		},
	}
</script>

<style lang="scss">
	.chat-item-box{
		display: flex;
		padding: 10px 0;
		margin: 5px 10px;
		box-sizing: border-box;
		align-items: center;
		background-color: #fff;
		.avatar{
			flex-shrink: 0;
			width: 100rpx;
			height: 100rpx;
			border-radius: 20px;
			margin: 0 15px;
			image{
				width: 100%;
				height: 100%;
				border-radius: 10px;
			}
		}
		.txt{
			width: 100%;
			display: flex;
			box-sizing: border-box;
			flex-direction: column;
			padding: 0 15px 0 0;
			.line1{
				width: 100%;
				display: flex;
				justify-content: space-between;
				.name{
					font-size: 15px;
					width: 60%;
					// 超出部分用点省略
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					margin: 5px 0 0 0;
				}
				.time{
					font-size: 12px;
					margin: 5px 0;
					color: #888;
				}
			}
			.line2{
				width: 100%;
				display: flex;
				justify-content: space-between;
				.msg{
					width: 60%;
					// 超出部分用点省略
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					font-size: 12px;
					color: #aaa;
				}
				.unread-box{
					display: flex;
					flex-direction: column;
					justify-content: space-evenly;
					width: 20px;
					height: 20px;
					background: linear-gradient(to bottom,#ff9c39,#ff6a39);
					border-radius: 100%;
					.unread-txt{
						text-align: center;
						font-size: 12px;
						color: #fff;
					}
				}
			}
		}
	}
</style>
