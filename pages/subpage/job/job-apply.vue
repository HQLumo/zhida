<template>
	<view>
		<topbar title="" showBackBtn="true" />
		
		<view style="margin: 0 20px;">
			<view style="font-size: 18px; font-weight: bold;">填写报名信息</view>
			
			<view class="title">
				姓名
			</view>
			<view class="input-box">
				<input v-model="name" />
			</view>
			
			<view class="title">
				学校
			</view>
			<view class="input-box">
				<input v-model="school_name" />
			</view>
			
			<view class="title">
				最高学历
			</view>
			<view class="input-box">
				<input v-model="educational" />
			</view>
			
			<view class="title">
				专业
			</view>
			<view class="input-box">
				<input v-model="major" />
			</view>
			
			<view class="title">
				联系电话
			</view>
			<view class="input-box">
				<input v-model="phone" type="number" />
			</view>
			
			<view class="title">
				性别
			</view>
			<view class="input-box">
				<picker @change="bindPickerChange" :value="sex" :range="sexOption" range-key="name">
				    <view>{{ sexOption[sex].name }}</view>
				</picker>
			</view>
			
			<view class="title">
				邮箱
			</view>
			<view class="input-box">
				<input v-model="email" />
			</view>
			
			<view class="title">
				简历上传
			</view>
			<view style="font-size: 12px; color: #888;">
				简历建议使用PDF格式，也支持DOC,DOCX,JPG,PNG格式。大小不超过20M。
			</view>
			<view class="upload-btn-box">
				<view class="upload-btn" @click="onUploadFile()">
					本地上传
				</view>
				<text style="font-size: 12px;">{{profile.name}}</text>
			</view>
			
			<view class="title">
				邀请码
			</view>
			<view class="input-box">
				<input v-model="invitationCode" />
			</view>
			
			<view class="title">
				收货地址
			</view>
			<view class="input-box">
				<input v-model="address" />
			</view>
			
			<view class="apply-btn-box">
				<view class="apply-btn" @click="onApply()">
					<text>提交</text>
				</view>
			</view>
			
			<view style="height: 20px;"></view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				  name: "",
				  school_name: "",
				  educational: "",
				  major: "",
				  phone: "",
				  email: "",
				  sex: 1,
				  sexOption:[{name:'男'},{name:'女'}],
				  profile:"",
				  invitationCode:"",
				  address:""
			}
		},
		methods: {
			bindPickerChange: function(e) {
			    this.sex = e.detail.value;
			},
			
			onApply(){
				if(this.name==''||this.school_name==''||this.educational==''||this.major==''||this.phone==''||this.email==''||this.invitationCode==''||this.address==''){
					uni.showToast({
						title:'内容不能为空',
						icon:'none'
					});
				}else{
					uni.request({
						url:this.$url+'/job/submitJob',
						header:{
							'token':uni.getStorageSync('token')
						},
						method:'POST',
						data:{
							  "job_id": uni.getStorageSync('jobId'),
							  "name": this.name,
							  "school_name": this.school_name,
							  "educational": this.educational,
							  "major": this.major,
							  "phone": this.phone,
							  "email": this.email,
							  "sex": this.sex+1
						},
						success: (res) => {
							uni.navigateTo({
								url:'/pages/subpage/job/job-apply-success',
								animationType:'none'
							})
						}
					});
				}
			},
			
			onUploadFile(){
				// 选择图片
				uni.chooseFile({
					count: 1,
					type:'all',
					success: (res) => {
						this.profile=res.tempFiles[0];
					}
				});
			},
			
		}
	}
</script>

<style lang="scss">
	.title{
		margin-top: 10px;
	}
	
	.input-box{
		background-color: #f4f4f4;
		border-radius: 10px;
		width: auto;
		margin-top: 10px;
		display: flex;
		align-items: center;
		padding: 10px;
	}
	
	.upload-btn-box{
		.upload-btn{
			background-color: #f4f4f4;
			border-radius: 10px;
			width: auto;
			margin-top: 10px;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 10px;
			font-size: 14px;
		}
	}
	
	.apply-btn-box{
		margin: 40px 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 40px;
		.apply-btn{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 40px;
			background: linear-gradient(to bottom,#ff9c39,#ff6a39);
			box-shadow: 2px 2px 5px 1px rgba(255, 146, 57, 0.5);
			border-radius: 10px;
			text{
				font-size: 16px;
				color: #fff;
			}
		}
	}
</style>
