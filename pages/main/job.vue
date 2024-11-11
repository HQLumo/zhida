<template>
	<view>
		
		<topbar title="实习" showListBtn="true"></topbar>
		<searchbar></searchbar>
		
		<view class="selection-bar">
			<view class="selection" @click="onSelect(1)">
				<text>私企</text>
				<view class="selected" v-show="selection==1"></view>
			</view>
			<view class="selection" @click="onSelect(2)">
				<text>国企</text>
				<view class="selected" v-show="selection==2"></view>
			</view>
			<view class="selection" @click="onSelect(3)">
				<text>政府部门</text>
				<view class="selected" v-show="selection==3"></view>
			</view>
		</view>
		
		<view class="selection" v-show="selection==1">
			
			<view class="item-box" v-for="(item,index) in jobData1" :key="index">
				<view class="left-box">
					<view class="box-1">
						<view class="title">
							{{item.jobName}}
						</view>
						<view class="time">
							{{item.duration}}
						</view>
					</view>
					<view class="box-2">
						<view class="toggle" v-for="(tag,i) in item.jobTags" :key="i">
							{{tag}}
						</view>
					</view>
					<view class="company">
						{{item.companyName}}
					</view>
					<view class="description">
						{{item.jobDes}}
					</view>
				</view>
				<view class="right-box">
					<view class="type">
						{{item.coverage}}
					</view>
					<view class="salary">
						{{item.price}}
					</view>
					<view class="enter-btn-box">
						<view class="enter-btn" @click="toJobDetail(item.jobId)">
							获取该简历
						</view>
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="selection" v-show="selection==2">
			
			<view class="item-box" v-for="(item,index) in jobData2" :key="index">
				<view class="left-box">
					<view class="box-1">
						<view class="title">
							{{item.jobName}}
						</view>
						<view class="time">
							{{item.duration}}
						</view>
					</view>
					<view class="box-2">
						<view class="toggle" v-for="(tag,i) in item.jobTags" :key="i">
							{{tag}}
						</view>
					</view>
					<view class="company">
						{{item.companyName}}
					</view>
					<view class="description">
						{{item.jobDes}}
					</view>
				</view>
				<view class="right-box">
					<view class="type">
						{{item.coverage}}
					</view>
					<view class="salary">
						{{item.price}}
					</view>
					<view class="enter-btn-box">
						<view class="enter-btn" @click="toJobDetail(item.jobId)">
							获取该简历
						</view>
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="selection" v-show="selection==3">
			
			<view class="item-box" v-for="(item,index) in jobData3" :key="index">
				<view class="left-box">
					<view class="box-1">
						<view class="title">
							{{item.jobName}}
						</view>
						<view class="time">
							{{item.duration}}
						</view>
					</view>
					<view class="box-2">
						<view class="toggle" v-for="(tag,i) in item.jobTags" :key="i">
							{{tag}}
						</view>
					</view>
					<view class="company">
						{{item.companyName}}
					</view>
					<view class="description">
						{{item.jobDes}}
					</view>
				</view>
				<view class="right-box">
					<view class="type">
						{{item.coverage}}
					</view>
					<view class="salary">
						{{item.price}}
					</view>
					<view class="enter-btn-box">
						<view class="enter-btn" @click="toJobDetail(item.jobId)">
							获取该简历
						</view>
					</view>
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
				jobPage1:1,
				jobPage2:1,
				jobPage3:1,
				jobData1:[],
				jobData2:[],
				jobData3:[]
			}
		},
		methods: {
			onSelect(i){
				this.selection=i;
			},
			
			toJobDetail(jobId){
				uni.setStorageSync('jobId',jobId);
				uni.navigateTo({
					url:'/pages/subpage/job/job-detail'
				});
			},
			
			loadJobData(companyType){
				let currentPage=1;
				if(companyType=='私企'){
					currentPage=this.jobPage1
				}else if(companyType=='国企'){
					currentPage=this.jobPage2
				}else if(companyType=='政府部门'){
					currentPage=this.jobPage3
				}
				uni.request({
					url:this.$url+'/job/getJobList',
					method:'POST',
					header:{
						'token':uni.getStorageSync('token')
					},
					data:{
						'current':currentPage,
						'pageSize':10,
						'companyType':companyType
					},
					success: (res) => {
						res.data.data.records.forEach((item,index)=>{
							let str = item.jobTags;
							let arr = str.split(/,\s*/);
							item.jobTags = arr.map(item => item.replace(/[\[\]]/g, ''));
						});
						if(companyType=='私企'){
							res.data.data.records.forEach((item,index)=>{
								this.jobData1.push(item);
							});
							this.jobPage1+=1;
						}else if(companyType=='国企'){
							res.data.data.records.forEach((item,index)=>{
								this.jobData2.push(item);
							});
							this.jobPage2+=1;
						}else if(companyType=='政府部门'){
							res.data.data.records.forEach((item,index)=>{
								this.jobData3.push(item);
							});
							this.jobPage3+=1;
						}
					}
				})
			}
		},
		
		mounted() {
			var that=this;
			that.loadJobData('私企');
			that.loadJobData('国企');
			that.loadJobData('政府部门');
			uni.$on('onReachBottom5', function() {
				if(that.selection==1){
					that.loadJobData('私企');
				}else if(that.selection==2){
					that.loadJobData('国企');
				}else if(that.selection==3){
					that.loadJobData('政府部门');
				}
			});
		},
		
		beforeDestroy() {
			uni.$off('onReachBottom5');
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
	}
	
	.selection{
		.item-box{
			display: flex;
			margin: 40rpx;
			border-radius: 10px;
			box-shadow: 0 0 10px 5px rgba(240,240,255,0.7);
			.left-box{
				flex-grow: 1;
				padding: 10px;
				.box-1{
					display: flex;
					align-items: flex-end;
					.title{
						font-size: 14px;
						font-weight: bold;
						max-width: 100px;
						overflow: hidden; //溢出隐藏
						text-overflow: ellipsis;   //超出部分省略号
						white-space: nowrap; //不换行
					}
					.time{
						font-size: 12px;
						max-width: 50px;
						margin-left: 5px;
						overflow: hidden; //溢出隐藏
						text-overflow: ellipsis;   //超出部分省略号
						white-space: nowrap; //不换行
					}
				}
				.box-2{
					display: flex;
					margin-top: 5px;
					width: 200px;
					flex-wrap: wrap;
					.toggle{
						background-color: #ddd;
						border-radius: 20px;
						font-size: 12px;
						margin-right: 5px;
						margin-top: 5px;
						padding: 3px 8px;
						white-space: nowrap; //不换行
					}
				}
				.company{
					margin-top: 10px;
					font-size: 12px;
					max-width: 200px;
					overflow: hidden; //溢出隐藏
					text-overflow: ellipsis;   //超出部分省略号
					white-space: nowrap; //不换行
				}
				.description{
					margin-top: 10px;
					color: #888;
					font-size: 12px;
					width: 200px;
				}
			}
			.right-box{
				display: flex;
				flex-direction: column;
				width: 400rpx;
				padding: 10px;
				.type{
					display: flex;
					flex-direction: row-reverse;
					font-size: 12px;
					font-weight: bold;
					color: #ff6a39;
				}
				.salary{
					margin-top: 5px;
					display: flex;
					flex-direction: row-reverse;
					font-size: 12px;
					font-weight: bold;
					color: #ff6a39;
				}
				.enter-btn-box{
					flex-grow: 1;
					display: flex;
					align-items: flex-end;
					justify-content: flex-end;
					.enter-btn{
						display: flex;
						align-items: center;
						justify-content: center;
						background: linear-gradient(to bottom,#ff9c39,#ff6a39);
						box-shadow: 2px 2px 5px 1px rgba(255, 146, 57, 0.5);
						border-radius: 20px;
						font-size: 12px;
						color: #fff;
						padding: 5px 10px;
					}
				}
			}
		}
	}
</style>
