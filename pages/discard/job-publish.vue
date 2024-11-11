<template>
	<view>
		<topbar title="" showBackBtn="true" />
		
		<view style="margin: 0 20px;">
			<view style="font-size: 18px; font-weight: bold;">填写岗位招聘信息</view>
			
			<view class="title">
				岗位名称
			</view>
			<view class="input-box">
				<input v-model="jobName" />
			</view>
			
			<view class="title">
				工作地址
			</view>
			<view class="input-box">
				<input v-model="companyLocation" />
			</view>
			
			<view class="title">
				最低学历
			</view>
			<view class="input-box">
				<input v-model="educationalRequire" />
			</view>
			
			<view class="title">
				岗位描述
			</view>
			<view class="input-box">
				<textarea style="min-height: 100px;" autoHeight v-model="jobDes" maxlength="300"></textarea>
			</view>
			
			<view class="title">
				岗位要求
			</view>
			<view class="input-box">
				<textarea style="min-height: 100px;" autoHeight v-model="jobRequire" maxlength="300"></textarea>
			</view>
			
			<view class="title">
				薪资范围
			</view>
			<view class="input-box-2">
				<view class="input-box">
					<input v-model="salaryDown" type="number" />
				</view>
				<view class="line"></view>
				<view class="input-box">
					<input v-model="salaryUp" type="number" />
				</view>
			</view>
			
			<view class="publish-btn-box">
				<view class="publish-btn" @click="onPublish()">
					<text>立即发布</text>
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
				  jobName: "",
				  jobType: "",
				  jobDes: "",
				  jobRequire: "",
				  educationalRequire: "",
				  companyLocation: "",
				  salaryDown: "",
				  salaryUp: "",
			}
		},
		methods: {
			onPublish(){
				if(this.jobName==''||this.jobDes==''||this.jobRequire==''||this.educationalRequire==''||this.companyLocation==''||this.salaryDown==''||this.salaryUp==''){
					uni.showToast({
						title:'内容不能为空',
						icon:'none'
					});
				}else{
					uni.request({
						url:this.$url+'/job/postJob',
						header:{
							'token':uni.getStorageSync('token')
						},
						method:'POST',
						data:{
							  "jobName": this.jobName,
							  "jobType": uni.getStorageSync('jobType'),
							  "jobDes": this.jobDes,
							  "jobRequire": this.jobRequire,
							  "educationalRequire": this.educationalRequire,
							  "companyName": "",
							  "companyLocation": this.companyLocation,
							  "salaryDown": this.salaryDown,
							  "salaryUp": this.salaryUp,
							  "requireNum": 50,
							  "candidateStatus": 1,
							  "candidateNum": 5
						},
						success: (res) => {
							console.log(res);
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.title{
		margin-top: 10px;
	}
	
	.input-box{
		background-color: #f9f9fd;
		border-radius: 10px;
		width: auto;
		margin-top: 10px;
		display: flex;
		align-items: center;
		padding: 10px;
	}
	
	.input-box-2{
		display: flex;
		align-items: center;
		.line{
			margin: 0 10px;
			width: 50px;
			height: 2px;
			background-color: #888;
		}
	}
	
	.publish-btn-box{
		margin: 40px 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 40px;
		.publish-btn{
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
