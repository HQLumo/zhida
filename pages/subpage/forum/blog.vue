<template>
	<view>
		<topbar title="" showBackBtn="true"/>
		<view class="item">
			<view class="top-box">
				<view class="avatar-box">
					<image :src="$getImageUrl(blogData.headerData)" mode="aspectFill"></image>
				</view>
				<view class="box-2">
					<view class="name">
						{{blogData.username}}
					</view>
					<view class="time">
						{{blogData.updateTime}}
					</view>
				</view>
			</view>
			<view class="main-box">
				<view class="content-box">
					<view class="img-box">
						<image v-for="(img,i) in blogData.imgList" :key="i" :src="$getImageUrl(img)" mode="aspectFill"></image>
					</view>
					<view class="txt">
						{{blogData.content}}
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
					<view class="love-btn" @click="clickLike(blogData)">
						<image v-if="blogData.isLike" src="/static/icon/like1.svg"></image>
						<image v-else src="/static/icon/like.svg"></image>
						<text>{{blogData.likes}}</text>
					</view>
					<view class="message-btn">
						<image src="/static/icon/comment.svg"></image>
						<text>{{blogData.reviews}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="comment-box">
			
			<view v-for="(item,index) in commentData" :key="index" class="item">
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
					<view class="content">
						{{item.content}}
					</view>
				</view>
			</view>
			
		</view>
		
		<view style="height: 100rpx; bottom: 0;"></view>
		<view class="publish-comment-box">
			<view class="input-box">
				<input v-model="commentContent" />
			</view>
			<view class="publish-btn" @click="publishComment()">
				发送
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				blogData:'',
				commentContent:'',
				commentData:[],
				commentPage:1
			}
		},
		methods: {
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
			
			publishComment(){
				if(this.commentContent==''){
					uni.showToast({
						icon:"none",
						title:"评论不能为空"
					});
				}else{
					uni.request({
						url:this.$url+'/blog/publishComment',
						method:'POST',
						header:{
							'token':uni.getStorageSync('token')
						},
						data:{
							'content':this.commentContent,
							'blogId':uni.getStorageSync('blogId'),
							'parentCommentId':0
						},
						success: (res) => {
							console.log(res);
							this.commentContent='';
							uni.showToast({
								icon:"none",
								title:"评论成功"
							});
							this.reloadData();
						}
					});
				}
			},
			
			loadBlogData(){
				uni.request({
					url:this.$url+'/blog/getBlog/'+uni.getStorageSync('blogId'),
					header:{
						'token':uni.getStorageSync('token')
					},
					success: (res) => {
						let blogData=res.data.data;
						if(	blogData.resources!=null){
							blogData.imgList=blogData.resources.split(",");
						}
						blogData.updateTime=blogData.updateTime.replace('T',' ');
						uni.request({
							url:this.$url+'/user/getHeader/'+blogData.username,
							header:{
								'token':uni.getStorageSync('token')
							},
							success: (res) => {
								blogData.headerData=res.data.data;
								uni.request({
									url:this.$url+'/blog/isLike/'+blogData.blogId,
									header:{
										'token':uni.getStorageSync('token')
									},
									success: (res) => {
										blogData.isLike=res.data.data;
										this.blogData=blogData;
									}
								});
							}
						});
					}
				});
			},
			
			loadMoreCommentData(){
				uni.request({
					url:this.$url+'/blog/getCommentList/'+uni.getStorageSync('blogId')+'/'+this.commentPage+'/10',
					header:{
						'token':uni.getStorageSync('token')
					},
					success: (res) => {
						res.data.data.records.forEach((item,index)=>{
							uni.request({
								url:this.$url+'/user/getHeader/'+item.username,
								header:{
									'token':uni.getStorageSync('token')
								},
								success: (res) => {
									item.headerData=res.data.data;
									this.commentData.push(item);
								}
							})
						});
						this.commentPage+=1;
					}
				})
			},
			
			reloadData(){
				this.commentData=[];
				this.blogData=[];
				this.commentPage=1;
				this.loadBlogData();
				this.loadMoreCommentData();
			}
		},
		
		mounted() {
			this.reloadData();
		},
		
		onReachBottom() {
			this.loadMoreCommentData();
		}
	}
</script>

<style lang="scss">
	.item{
		margin: 20rpx;
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
						//文本自动换行
						word-wrap: break-word;
						word-break: break-all;
						white-space: pre-line;
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
	
	.comment-box{
		margin: 20rpx;
		.item{
			display: flex;
			margin-top: 40rpx;
			.avatar-box{
				image{
					width: 80rpx;
					height: 80rpx;
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
				.content{
					margin-top: 5rpx;
					font-size: 14px;
				}
			}
		}
	}
	
	.publish-comment-box{
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 0;
		background-color: #fff;
		padding: 20rpx;
		width: 100%;
		.input-box{
			background-color: #eee;
			border-radius: 10rpx;
			width: 60%;
			padding: 10rpx 20rpx;
			input{
				font-size: 14px;
			}
		}
		.publish-btn{
			display: flex;
			align-items: center;
			justify-content: center;
			margin-left: 20rpx;
			background: linear-gradient(to bottom,#ff9c39,#ff6a39);
			border-radius: 10rpx;
			padding: 10rpx 20rpx;
			font-size: 14px;
			color: #fff;
		}
	}
</style>
