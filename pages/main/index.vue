<template>
	<view>
		<topbar title="首页"></topbar>
		
		<searchbar></searchbar>
		
		<view class="banner-box">
			<view class="box-1">
				<swiper class="swiper" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1500">
					<swiper-item class="banner" v-for="(item,index) in topBanner" :key="index">
						<image :src="$getImageUrl(item.resource)" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		
		<view class="activity-box">
			<view class="box-1">
				<view class="title">活动</view>
			</view>
			<view class="box-2">
				<view class="activity-item" v-for="(item,index) in activityData" :key="index">
					<image class="img" :src="$getImageUrl(item.activityCover)" mode="aspectFill"></image>
					<view class="column-box">
						<view class="name">
							{{item.activityTitle}}
						</view>
						<view class="startTime">
							活动时间：{{item.beginTime.replace('T',' ')}}
						</view>
						<view class="address">
							活动地点：{{item.location}}
						</view>
						<view class="attribute">
							<AttributeBox class="a1" color="#ff9439" :num="item.skill"></AttributeBox>
							<AttributeBox class="a2" color="#6737bf" :num="item.financial"></AttributeBox>
							<AttributeBox class="a3" color="#ff7339" :num="item.emotional"></AttributeBox>
						</view>
						<view class="row-box">
							<view class="releaseTime">
								{{item.updateTime.replace('T',' ')}}
							</view>
							<view class="cost">
								￥ {{item.price}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import AttributeBox from "@/components/attribute-box/attribute-box.vue"
	export default {
		components:{
			AttributeBox
		},
		data() {
			return {
				topBanner:[],
				activityPage:0,
				activityData:[],
			}
		},
		methods: {
			loadTopBanner(){
				uni.request({
					url:this.$url+'/course/getActiveScrollMap',
					header:{
						'token':uni.getStorageSync('token')
					},
					success: (res) => {
						this.topBanner=res.data.data
					}
				})
			},
			
			loadMoreActivityData(){
				uni.request({
				  url: this.$url+'/activity/getActivities/'+this.activityPage+'/3',
				  method: 'GET',
				  success: (res) => {
					  res.data.data.records.forEach((item,index)=>{
						  this.activityData.push(item);
					  });
					  this.activityPage+=1;
				  }
				});
			},
		},
		
		mounted() {
			var that=this;
			uni.$on('onReachBottom1',function(){
				that.loadMoreActivityData();
			});
			uni.$on('reloadData',function(){
				that.activityPage=0;
				that.activityData=[];
				that.loadMoreActivityData();
				that.loadTopBanner();
			});
		},
		
		beforeDestroy() {
			uni.$off('reloadData');
		}
	}
</script>

<style lang="scss">
	.banner-box{
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		.box-1{
			width: 100%;
			overflow: hidden;
			.swiper{
				width: 100%;
				height: 200px;
				.banner{
					display: flex;
					align-items: center;
					justify-content: space-evenly;
					image{
						width: 90%;
						height: 150px;
						border-radius: 20px;
						box-shadow: 5px 10px 10px 2px rgba(255,148,57,0.2);
					}
				}
			}
		}
	}
	
	.activity-box{
		margin: 20px;
		.box-1{
			.title{
				font-size: 20px;
				font-weight: bold;
			}
		}
		.box-2{
			.activity-item{
				margin-top: 20px;
				display: flex;
				.img{
					width: 80px;
					height: 100px;
					border-radius: 10px;
				}
				.column-box{
					flex-grow: 1;
					margin-left: 20px;
					display: flex;
					flex-direction: column;
					.name{
						font-size: 16px;
						font-weight: bold;
					}
					.startTime{
						margin-top: 5px;
						font-size: 10px;
						color: #888;
					}
					.address{
						font-size: 10px;
						color: #888;
					}
					.attribute{
						margin-top: 5px;
						display: flex;
					}
					.row-box{
						margin-top: 5px;
						display: flex;
						.releaseTime{
							flex-grow: 1;
							font-size: 12px;
							color: #888;
						}
						.cost{
							font-size: 12px;
						}
					}
				}
			}
		}
	}
</style>
