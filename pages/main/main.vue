<template>
	<view class="content">
		<IndexPage v-show="currentPage==1"></IndexPage>
		<StudyPage v-show="currentPage==2"></StudyPage>
		<ForumPage v-show="currentPage==3"></ForumPage>
		<MinePage v-show="currentPage==4"></MinePage>
		<JobPage v-show="currentPage==5"></JobPage>
	</view>
	
	<view class="tabbar">
		<view class="item" @click="switchTab(1)">
			<image v-if="currentPage==1" src="/static/tabbar/index1.svg" mode="scaleToFill"></image>
			<image v-else src="/static/tabbar/index.svg" mode="scaleToFill"></image>
			<text>首页</text>
		</view>
		<view class="item" @click="switchTab(2)">
			<image v-if="currentPage==2" src="/static/tabbar/study1.svg" mode="scaleToFill"></image>
			<image v-else src="/static/tabbar/study.svg" mode="scaleToFill"></image>
			<text>学习</text>
		</view>
		<view class="item" @click="switchTab(5)">
			<image id="mid" src="/static/tabbar/add.png" mode="scaleToFill"></image>
		</view>
		<view class="item" @click="switchTab(3)">
			<image v-if="currentPage==3" src="/static/tabbar/forum1.svg" mode="scaleToFill"></image>
			<image v-else src="/static/tabbar/forum.svg" mode="scaleToFill"></image>
			<text>论坛</text>
		</view>
		<view class="item" @click="switchTab(4)">
			<image v-if="currentPage==4" src="/static/tabbar/mine1.svg" mode="scaleToFill"></image>
			<image v-else src="/static/tabbar/mine.svg" mode="scaleToFill"></image>
			<text>个人</text>
		</view>
	</view>
	<view style="height: 80px;"></view>

</template>

<script>
	import IndexPage from "@/pages/main/index.vue"
	import StudyPage from "@/pages/main/study.vue"
	import ForumPage from "@/pages/main/forum.vue"
	import MinePage from "@/pages/main/mine.vue"
	import JobPage from "@/pages/main/job.vue"
	export default {
		components:{
			IndexPage,
			StudyPage,
			ForumPage,
			MinePage,
			JobPage,
		},
		data() {
			return {
				currentPage:1
			}
		},
		methods: {
			switchTab(i){
				this.currentPage=i;
			}
		},
		
		mounted() {
			uni.$emit('reloadData');
		},
		
		beforeDestroy() {
			uni.closeSocket();
		},
		
		onReachBottom(){
			uni.$emit('onReachBottom'+this.currentPage);
		},
		
		onPullDownRefresh() {
			setTimeout(() => {
				uni.$emit('reloadData');
				uni.stopPullDownRefresh();
			}, 500);
		},
	}
</script>

<style lang="scss">
	.tabbar{
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		position: fixed;
		z-index: 1000;
		width: 100%;
		bottom: 0;
		height: 80px;
		border-radius: 20px 20px 0 0;
		background-color: #fff;
		box-shadow: 0 0 12px 8px rgba(103,55,191,0.1);
		.item{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			image{
				width: 20px;
				height: 20px;
			}
			text{
				margin-top: 4px;
				font-size: 12px;
				color: #7423f3;
			}
			#mid{
				width: 40px;
				height: 40px;
			}
		}
	}
</style>
