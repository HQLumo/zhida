<template>
	<view>
		<topbar title="学习"></topbar>
		
		<searchbar></searchbar>
		
		<view class="course-box">
			<view class="box-1">
				<view class="title">课程</view>
			</view>
			<view class="box-2">
				<view class="course-item" v-for="(item,index) in courseData" :key="index" @click="toCourse(item)">
					<view class="img-box">
						<image class="img" :src="$getImageUrl(item.courseCover)" mode="aspectFill"></image>
						<view class="rating-box">
							<image src="/static/icon/star.svg " mode="aspectFill"></image>
							<view class="rating">{{item.score}}</view>
						</view>
					</view>
					<view class="name">
						{{item.courseTitle}}
					</view>
					<view class="attribute">
						<AttributeBox class="a1" color="#ff9439" :num="item.skill"></AttributeBox>
						<AttributeBox class="a2" color="#6737bf" :num="item.financial"></AttributeBox>
						<AttributeBox class="a3" color="#ff7339" :num="item.emotional"></AttributeBox>
					</view>
					<view class="cost">
						￥ {{item.price}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="consult-box">
			<view class="box-1">
				<view class="title">
					咨询
				</view>
			</view>
			<view class="box-2">
				<view class="consult-item">
					<view class="img-box">
						<image src="/static/logo.png" mode="aspectFill"></image>
					</view>
					<view class="name">
						创赛培训
					</view>
					<view class="progress-box">
						<view class="progress-bar-box">
							<view class="progress-bar"></view>
						</view>
						<view class="progress-txt">
							12/30
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
				coursePage:0,
				courseData:[],
			}
		},
		methods: {
			toCourse(course){
				uni.setStorageSync('courseId',course.courseId);
				uni.navigateTo({
					url:'/pages/subpage/study/course'
				})
			},
			
			loadMoreCorseData(){
				uni.request({
				  url: this.$url+'/course/getCourses/'+this.coursePage+'/5',
				  method: 'GET',
				  header:{
					  'token':uni.getStorageSync('token')
				  },
				  success: (res) => {
					  res.data.data.records.forEach((item,index)=>{
						  this.courseData.push(item);
					  });
					  this.coursePage+=1;
				  }
				});
			},
		},
		
		mounted() {
			var that=this;
			uni.$on('reloadData',function(){
				that.coursePage=0;
				that.courseData=[];
				that.loadMoreCorseData();
			});
		},
		
		beforeDestroy() {
			uni.$off('reloadData');
		}
	}
</script>

<style lang="scss">
	
	.course-box{
		margin-top: 10px;
		.box-1{
			margin-left: 20px;
			.title{
				font-size: 20px;
				font-weight: bold;
			}
		}
		.box-2{
			display: flex;
			overflow-x: scroll;
			.course-item{
				margin: 10px 5px 0 15px;
				.img-box{
					position: relative;
					width: 120px;
					height: 160px;
					.img{
						width: 100%;
						height: 100%;
						border-radius: 20px;
					}
					.rating-box{
						position: absolute;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						top: 10px;
						left: 80px;
						width: 30px;
						height: 40px;
						border-radius: 10px;
						background-color: #ff7339;
						image{
							width: 15px;
							height: 15px;
						}
						.rating{
							margin-top: 3px;
							font-size: 10px;
							color: #fff;
						}
					}
				}
				.name{
					margin-top: 5px;
					font-size: 16px;
				}
				.attribute{
					margin-top: 5px;
					display: flex;
				}
				.cost{
					margin-top: 5px;
					font-size: 12px;
				}
			}
		}
	}

	.consult-box{
		margin: 20px;
		.box-1{
			.title{
				font-size: 20px;
				font-weight: bold;
			}
		}
		.box-2{
			.consult-item{
				margin-top: 20px;
				.img-box{
					width: 100%;
					height: 150px;
					image{
						width: 100%;
						height: 100%;
						border-radius: 10px;
					}
				}
				.name{
					margin-top: 10px;
					font-size: 16px;
				}
				.progress-box{
					margin-top: 10px;
					display: flex;
					align-items: center;
					.progress-bar-box{
						width: 60%;
						height: 10px;
						border-radius: 10px;
						background-color: #e0e0e0;
						.progress-bar{
							width: 60%;
							height: 10px;
							border-radius: 10px;
							background: linear-gradient(to right,rgb(255,148,57),rgb(255,115,57));
						}
					}
					.progress-txt{
						margin-left: 20px;
						font-size: 14px;
						color: #888;
					}
				}
			}
		}
	}
	
</style>
