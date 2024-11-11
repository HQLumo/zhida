<template>
	<view>
		<topbar title="发布博客" showBackBtn="true"></topbar>
		
		<view class="content-box">
			<view class="txt">
				<textarea v-model="content" placeholder="这一刻想分享..." auto-height="true" />
			</view>
			<view class="img">
				<view class="item" v-for="(item,index) in base64List" :key="index">
					<image :src="item" mode="aspectFill"></image>
				</view>
				<view class="item" @click="chooseImage()">
					<image src="/static/tabbar/add.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		
		<view class="box-1">
			<view class="publish-btn-box" @click="onPublish()">
				<view class="publish-btn">
					<image src="/static/send.svg" mode="aspectFill"></image>
				</view>
				<view class="publish-txt">
					发布
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				imgList: [],
				base64List:[]
			}
		},
		methods: {

			onPublish() {
				uni.uploadFile({
					url: "http://47.97.7.86:8886/blog/publishBlog",
					files: this.imgList,
					formData: {
						"content": this.content,
						"public_status": 1
					},
					header: {
						"token":uni.getStorageSync('token'),
					},
					success: (res) => {
						uni.$emit('reloadData');
						uni.navigateBack();
					},
					fail: (err) => {
						console.log(err)
					}
				})

			},
			
			chooseImage() {
				// 选择图片  
				uni.chooseImage({
					count: 9, // 默认9，设置选择图片的数量  
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
					sourceType: ['album', 'camera'], // 从相册选择  
					loop: true,
					success: (res) => {
						for (let i = 0; i < res.tempFilePaths.length; i++) {
							let suf = res.tempFilePaths[i].substring(res.tempFilePaths[i].lastIndexOf("."))
							let fileName = i + suf;
							this.imgList.push({
								name: fileName,
								uri: res.tempFilePaths[i]
							});
						}
						
						res.tempFilePaths.forEach((tempFilePath,index)=>{
							this.base64List.push(tempFilePath);
						});
						
					},
					fail: (err) => {
						console.error('选择图片失败：', err);
					}
				});
				
				
			},
		}
	}
</script>

<style lang="scss">
	
	.content-box{
		padding: 20px;
		.txt{
			textarea{
				width: 100%;
				font-size: 14px;
			}
		}
		.img{
			display: flex;
			margin-top: 10px;
			flex-wrap: wrap;
			.item{
				margin: 5px 5px 0 0;
				width: 70px;
				height: 70px;
				image{
					width: 100%;
					height: 100%;
					border-radius: 10px;
				}
			}
		}
	}
	
	.box-1{
		margin: 10px 20px;
		display: flex;
		.publish-btn-box{
			display: flex;
			align-items: center;
			justify-content: center;
			background: linear-gradient(to bottom,#6757bf,#6737bf);
			padding: 10px 10px;
			border-radius: 20px;
			width: 100%;
			.publish-btn{
				width: 40rpx;
				height: 40rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.publish-txt{
				margin-left: 5rpx;
				font-size: 14px;
				color: #fff;
			}
		}
	}
</style>