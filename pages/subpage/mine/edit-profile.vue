<template>
	<view>
		<view class="avatar-box">
			<view class="txt">
				头像
			</view>
			<view class="avatar" @click="chooseImage()">
				<image :src="avatarPath"></image>
			</view>
		</view>
		<view class="nickname-box">
			<view class="txt">
				昵称
			</view>
			<view class="content">
				<input v-model="nickname" type="text" />
			</view>
		</view>
	</view>
	<view class="confirm-btn" @click="confirmEdit()">
		确认
	</view>
	<view class="cancel-btn" @click="cancelEdit()()">
		取消
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatar:'',
				avatarPath:'',
				nickname:''
			}
		},
		methods: {
			chooseImage(){
				// 选择图片
				uni.chooseImage({
					count: 1, // 默认9，设置选择图片的数量
					sizeType: ['original', 'compressed'], // 选择原图或压缩图
					sourceType: ['album'], // 从相册选择
					success: (res) => {
						this.avatarPath=res.tempFilePaths[0];
						
						plus.io.resolveLocalFileSystemURL(this.avatarPath, function(entry) {
						  entry.file(function(file) {
							var reader = new plus.io.FileReader();
							reader.onloadend = function(e) {
							  var base64 = e.target.result;
							  console.log(base64);
							  this.avatar=base64;
							};
							reader.readAsDataURL(file);
						  }, function(e) {
							console.log("读取文件失败：" + e.message);
						  });
						}, function(e) {
						  console.log("解析文件路径失败：" + e.message);
						});
						  
					},
					fail: (err) => {
						console.error('选择图片失败：', err);
					}
				});
			},
			
			confirmEdit(){
				uni.request({
					url:this.$url+'/user/updateUserInfo',
					method:'POST',
					header:{
						'token':uni.getStorageSync('token')
					},
					data:{
						'header':this.avatar,
						'nickname':this.nickname
					},
					success: (res) => {
						console.log(res);
						uni.navigateTo({
							url:'/pages/main/main'
						})
					}
				})
			},
			
			cancelEdit(){
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">

</style>
