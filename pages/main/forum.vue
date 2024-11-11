<template>
	<view>
		<topbar title="论坛"></topbar>
		<searchbar></searchbar>
		
		<view class="selection-bar">
			<view class="selection" @click="onSelect(1)">
				<text>关注</text>
				<view class="selected" v-show="selection==1"></view>
			</view>
			<view class="selection" @click="onSelect(2)">
				<text>世界</text>
				<view class="selected" v-show="selection==2"></view>
			</view>
			<view class="selection" @click="onSelect(3)">
				<text>我的</text>
				<view class="selected" v-show="selection==3"></view>
			</view>
			<view class="publish-btn-box">
				<view class="publish-btn" @click="toPublishBlog()">
					<image src="/static/icon/send.svg" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		
		<view class="selection" v-show="selection==1">
			<view v-for="(item,index) in blogData" :key="index" class="item">
				<view class="top-box">
					<view class="avatar-box">
						<image :src="$getImageUrl(item.headerData)" mode="aspectFill"></image>
					</view>
					<view class="box-2">
						<view class="name">
							{{item.username}}
						</view>
						<view class="time">
							{{item.createTime.replace('T',' ')}}
						</view>
					</view>
					<view v-if="item.isAttention" class="attention-btn-1" @click="attention(item)">
						已关注
					</view>
					<view v-else-if="item.isOthers" class="attention-btn-2" @click="attention(item)">
						关注
					</view>
					<view v-else></view>
				</view>
				<view class="main-box">
					<view class="content-box" @click="toBlog(item)">
						<view class="img-box">
							<image v-for="(img,i) in item.imgList" :key="i" :src="$getImageUrl(img)" mode="aspectFill"></image>
						</view>
						<view class="txt">
							{{item.content}}
						</view>
					</view>
					<view class="location-box">
						<image src="/static/icon/location.svg" mode="scaleToFill"></image>
						四川大学江安校区
					</view>
					<view class="interaction-box">
						<view class="share-btn">
							<image src="/static/icon/share.svg"></image>
						</view>
						<view class="love-btn" @click="clickLike(item)">
							<image v-if="item.isLike" src="/static/icon/like1.svg"></image>
							<image v-else src="/static/icon/like.svg"></image>
							<text>{{item.likes}}</text>
						</view>
						<view class="message-btn" @click="toBlog(item)">
							<image src="/static/icon/comment.svg"></image>
							<text>{{item.reviews}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="selection" v-show="selection==2">
			<view v-for="(item,index) in blogData" :key="index" class="item">
				<view class="top-box">
					<view class="avatar-box">
						<image :src="$getImageUrl(item.headerData)" mode="aspectFill"></image>
					</view>
					<view class="box-2">
						<view class="name">
							{{item.username}}
						</view>
						<view class="time">
							{{item.createTime.replace('T',' ')}}
						</view>
					</view>
					<view v-if="item.isAttention" class="attention-btn-1" @click="attention(item)">
						已关注
					</view>
					<view v-else-if="item.isOthers" class="attention-btn-2" @click="attention(item)">
						关注
					</view>
					<view v-else></view>
				</view>
				<view class="main-box">
					<view class="content-box" @click="toBlog(item)">
						<view class="img-box">
							<image v-for="(img,i) in item.imgList" :key="i" :src="$getImageUrl(img)" mode="aspectFill"></image>
						</view>
						<view class="txt">
							{{item.content}}
						</view>
					</view>
					<view class="location-box">
						<image src="/static/icon/location.svg" mode="scaleToFill"></image>
						四川大学江安校区
					</view>
					<view class="interaction-box">
						<view class="share-btn">
							<image src="/static/icon/share.svg"></image>
						</view>
						<view class="love-btn" @click="clickLike(item)">
							<image v-if="item.isLike" src="/static/icon/like1.svg"></image>
							<image v-else src="/static/icon/like.svg"></image>
							<text>{{item.likes}}</text>
						</view>
						<view class="message-btn" @click="toBlog(item)">
							<image src="/static/icon/comment.svg"></image>
							<text>{{item.reviews}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="selection-3" v-show="selection==3">
			<view class="profile-box">
				<view class="avatar-box">
					<image :src="$getImageUrl(mineData.headerData)" mode="aspectFill"></image>
				</view>
				<view class="name">
					{{mineData.username}}
				</view>
				<view class="location">
					<image src="/static/icon/location.svg" mode="scaleToFill"></image>
					四川大学
				</view>
				<view class="relation-box">
					<view class="relation" @click="toRelationList()">
						<view class="num">
							{{mineData.attention}}
						</view>
						<view class="title">
							关注
						</view>
					</view>
					<view class="relation" @click="toRelationList()">
						<view class="num">
							{{mineData.fans}}
						</view>
						<view class="title">
							粉丝
						</view>
					</view>
					<view class="relation">
						<view class="num">
							{{mineData.liked}}
						</view>
						<view class="title">
							喜欢
						</view>
					</view>
				</view>
			</view>
			
			<view v-for="(item,index) in userBlogData" :key="index" class="item">
				<view class="main-box"  @click="toBlog(item)">
					<view class="time">
						{{item.createTime.replace('T',' ')}}
					</view>
					<view class="content-box">
						<view class="img-box">
							<image v-for="(img,i) in item.imgList" :key="i" :src="$getImageUrl(img)" mode="aspectFill"></image>
						</view>
						<view class="txt">
							{{item.content}}
						</view>
					</view>
					<view class="location-box">
						<image src="/static/icon/location.svg" mode="scaleToFill"></image>
						四川大学江安校区
					</view>
				</view>
				<view class="operate-btn-box">
					<image src="/static/icon/delete.svg" mode="aspectFill" @click="deleteBlog(item.blogId)"></image>
				</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selection:1,
				page1:0,
				page2:0,
				page3:0,
				blogData:[],
				mineData:[],
				userBlogData:[]
			}
		},
		methods: {
			onSelect(i){
				this.selection=i;
			},
			
			toPublishBlog(){
				uni.navigateTo({
					url:'/pages/subpage/forum/publish-blog'
				});
			},
			
			clickLike(blog){
				uni.request({
					url:this.$url+'/blog/likeBlog/'+blog.blogId,
					header:{
						'token':uni.getStorageSync('token')
					},
					success: (res) => {
						if(res.data.msg=="点赞成功"){
							blog.likes+=1;
							blog.isLike=true;
						}else{
							blog.likes-=1;
							blog.isLike=false;
						}
					}
				})
			},
			
			attention(blog){
				uni.request({
					url:this.$url+'/blog/attention/'+blog.username,
					header:{
						'token':uni.getStorageSync('token')
					},
					success: (res) => {
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						});
						this.mineData=[];
						this.loadMineData();
						if(res.data.msg=="关注成功"){
							this.blogData.forEach((item,index)=>{
								if(item.username==blog.username){
									item.isAttention=true;
								}
							});
						}else{
							this.blogData.forEach((item,index)=>{
								if(item.username==blog.username){
									item.isAttention=false;
								}
							});
						}
					}
				})
			},
			
			toBlog(blog){
				uni.setStorageSync('blogId',blog.blogId);
				uni.navigateTo({
					url:'/pages/subpage/forum/blog'
				})
			},
			
			toRelationList(){
				uni.navigateTo({
					url:'/pages/subpage/forum/relation-list'
				})
			},
			
			initBlog(){
				uni.request({
					url:this.$url+'/blog/initBlog',
					header:{
						'token':uni.getStorageSync('token')
					},
				})
			},
			
			loadMoreBlogData(){
				uni.request({
					url:this.$url+'/blog/getBlogList/'+this.page1+'/5',
					header:{
						'token':uni.getStorageSync('token')
					},
					success: (res) => {
						let attention=res.data.data.attention.filter(item=>item.isAttention===1); //筛选关注
						let records=res.data.data.blog.records;
						records.forEach((item,index)=>{
							//分隔图片数组
							if(item.resources!=null){
								item.imgList=item.resources.split(",");
							}
							
							//判断是否关注，是否为别人
							item.isAttention=false;
							item.isOthers=true;
							attention.forEach((attentionItem,attentionIndex)=>{
								if(attentionItem.username==item.username){
									item.isAttention=true;
								}
							});
							if(item.username==uni.getStorageSync('username')){
								item.isOthers=false;
							}
							
							//获取头像
							uni.request({
								url:this.$url+'/user/getHeader/'+item.username,
								header:{
									'token':uni.getStorageSync('token')
								},
								success: (res) => {
									item.headerData=res.data.data;
									
									//获取是否点赞
									uni.request({
										url:this.$url+'/blog/isLike/'+item.blogId,
										header:{
											'token':uni.getStorageSync('token')
										},
										success: (res) => {
											item.isLike=res.data.data;
											
											//隐藏中间名称（放在最后）
											item.username=this.$maskString(item.username);
											
											this.blogData.push(item);
										}
									});
								}
							});
						});
						this.page1+=1;
					}
				});
			},
			
			loadMineData(){
				uni.request({
					url:this.$url+'/blog/getMyInfo',
					header:{
						'token':uni.getStorageSync('token')
					},
					success: (res) => {
						this.mineData=res.data.data;
						uni.request({
							url:this.$url+'/user/getHeader/'+this.mineData.username,
							header:{
								'token':uni.getStorageSync('token')
							},
							success: (res) => {
								this.mineData.headerData=res.data.data;
							}
						});
					}
				})
			},
			
			loadMoreUserBlogData(){
				uni.request({
					url:this.$url+'/blog/getUserBlogList/'+uni.getStorageSync('username')+'/'+this.page3+'/5',
					header:{
						'token':uni.getStorageSync('token')
					},
					success: (res) => {
						res.data.data.records.forEach((item,index)=>{
							if(item.resources!=null){
								item.imgList=item.resources.split(",");
							}
							this.userBlogData.push(item);
						});
						this.page3+=1;
					}
				});
			},
			
			deleteBlog(blogId){
				uni.request({
					url:this.$url+'/blog/deleteBlog/'+blogId,
					header:{
						'token':uni.getStorageSync('token')
					},
					success: (res) => {
						if(res.data.code==200){
							uni.showToast({
								icon:'none',
								title:'删除成功'
							});
							uni.$emit('reloadData');
						}
					}
				})
			}
		},
		
		mounted(){
			var that = this;
			that.initBlog();

			uni.$on('reloadData',function(){
				that.page1=1;
				that.page2=1;
				that.page3=1;
				that.blogData=[];
				that.mineData=[];
				that.userBlogData=[];
				that.loadMoreBlogData();
				that.loadMineData();
				that.loadMoreUserBlogData();
			});
			uni.$on('onReachBottom3', function() {
				if(that.selection==1){
					that.loadMoreBlogData();
				}else if(that.selection==2){
					that.loadMoreBlogData();
				}else if(that.selection==3){
					that.loadMoreUserBlogData();
				}
			});
		},
		
		beforeDestroy() {
			uni.$off('onReachBottom3');
			uni.$off('reloadData');
		}
	}
</script>

<style lang="scss">
	.selection-bar{
		display: flex;
		margin: 0 20rpx 40rpx 20rpx;
		.selection{
			display: flex;
			flex-direction: column;
			margin: 0 30rpx;
			text{
				font-size: 18px;
			}
			.selected{
				background-color: #ff6a39;
				height: 8rpx;
				margin-top: 5rpx;
			}
		}
		.publish-btn-box{
			flex-grow: 1;
			display: flex;
			flex-direction: row-reverse;
			.publish-btn{
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 0 30rpx;
				width: 60rpx;
				height: 60rpx;
				border-radius: 100%;
				background: linear-gradient(to bottom,#6757bf,#6737bf);
				image{
					width: 50%;
					height: 50%;
				}
			}
		}
	}
	
	.selection{
		.item{
			margin: 40rpx;
			.top-box{
				display: flex;
				align-items: center;
				.avatar-box{
					image{
						width: 100rpx;
						height: 100rpx;
						border-radius: 100%;
					}
				}
				.box-2{
					margin-left: 20rpx;
					flex-grow: 1;
					.name{
						font-size: 14px;
					}
					.time{
						font-size: 12px;
						color: #888;
					}
				}
				.attention-btn-1{
					border-style: solid;
					border-radius: 20rpx;
					border-color: #888;
					font-size: 14px;
					color: #888;
					padding: 5rpx 20rpx;
				}
				.attention-btn-2{
					border-style: solid;
					border-radius: 20rpx;
					border-color: #ff6a39;
					font-size: 14px;
					color: #ff6a39;
					padding: 5rpx 20rpx;
				}
			}
		.main-box{
			margin-left: 120rpx;
				.content-box{
					.img-box{
						image{
							width: 160rpx;
							height: 160rpx;
							margin-right: 20rpx;
							margin-top: 10rpx;
							border-radius: 20rpx;
						}
					}
					.txt{
						margin-top: 20rpx;
						font-size: 14px;
						word-wrap: break-word;
						word-break: break-all;
						white-space: pre-line;
						display: -webkit-box;
						-webkit-box-orient:vertical;
						text-overflow: ellipsis;
						overflow: hidden;
						-webkit-line-clamp: 3;
						line-height: 50upx;
					}
				}
				.location-box{
					font-size: 12px;
					color: #6737bf;
					margin-top: 40rpx;
					display: flex;
					align-items: center;
					image{
						margin-right: 5px;
						width: 12px;
						height: 12px;
					}
				}
				.interaction-box{
					display: flex;
					align-items: center;
					margin-top: 40rpx;
					.share-btn{
						flex-grow: 1;
						image{
							width: 40rpx;
							height: 40rpx;
						}
					}
					.love-btn{
						display: flex;
						align-items: center;
						image{
							width: 40rpx;
							height: 40rpx;
						}
						text{
							margin-left: 10rpx;
							font-size: 12px;
							color: #888;
						}
					}
					.message-btn{
						display: flex;
						align-items: center;
						margin-left: 40rpx;
						image{
							width: 40rpx;
							height: 40rpx;
						}
						text{
							margin-left: 10rpx;
							font-size: 12px;
							color: #888;
						}
					}
				}
			}
		}	
	}
	
	.selection-3{
		.profile-box{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			background: linear-gradient(to bottom,#6757bf,#6737bf);
			color: #fff;
			.avatar-box{
				margin: 40rpx;
				background-color: #fff;
				border-radius: 100%;
				width: 200rpx;
				height: 200rpx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 100%;
				}
			}
			.name{
				font-size: 18px;
				font-weight: bold;
			}
			.location{
				font-size: 12px;
				margin-top: 20rpx;
				display: flex;
				align-items: center;
				image{
					margin-right: 5px;
					width: 12px;
					height: 12px;
				}
			}
			.relation-box{
				display: flex;
				align-items: center;
				justify-content: space-evenly;
				width: 100%;
				margin: 40rpx;
				.relation{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 200rpx;
					.num{
						font-size: 18px;
						font-weight: bold;
					}
					.title{
						font-size: 12px;
						margin-top: 10rpx;
					}
				}
			}
		}
		
		.item{
			margin: 40rpx;
			display: flex;
			.main-box{
				flex-grow: 1;
				.time{
					font-size: 12px;
					color: #888;
				}
				.content-box{
					margin-top: 20rpx;
					.img-box{
						image{
							width: 160rpx;
							height: 160rpx;
							margin-right: 20rpx;
							margin-top: 10rpx;
							border-radius: 20rpx;
						}
					}
					.txt{
						margin-top: 20rpx;
						font-size: 14px;
						//文本自动换行，超出行数省略
						word-wrap: break-word;
						word-break: break-all;
						white-space: pre-line;
						display: -webkit-box;
						-webkit-box-orient:vertical;
						text-overflow: ellipsis;
						overflow: hidden;
						-webkit-line-clamp: 3;
						line-height: 50upx;
					}
				}
				.location-box{
					font-size: 12px;
					color: #6737bf;
					margin-top: 40rpx;
					display: flex;
					align-items: center;
					image{
						margin-right: 5px;
						width: 12px;
						height: 12px;
					}
				}
			}
			.operate-btn-box{
				display: flex;
				image{
					width: 15px;
					height: 15px;
				}
			}
		}	
	}
</style>
