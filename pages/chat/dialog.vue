<template>
	<topbar :title="getGroupName()" showBackBtn="true"/>
	<view>
		<view class="tips color_fff size_12 align_c" :class="{ 'show':ajax.loading }" @tap="getHistoryMsg">{{ajax.loadText}}</view>
		<view class="box-1" id="list-box">
			<view class="talk-list">
				<view v-for="(item,index) in talkList" :key="index" :id="`msg-${item.id}`">
					<view class="item flex_col" :class=" item.type == 1 ? 'push':'pull' ">
						<image :src="item.pic" mode="aspectFill" class="pic"></image>
						<view class="content">{{item.content}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="box-2">
			<view class="flex_col">
				<view class="flex_grow">
					<input type="text" class="content" v-model="content" placeholder="请输入聊天内容" placeholder-style="color:#aaa;" :cursor-spacing="6">
				</view>
				<view class="send" @tap="send">
					<image src="/static/icon/send.svg" mode="scaleToFill" style="width: 20px; height: 20px;"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				talkList:[],
				ajax:{
					rows:20,//每页数量
					page:1,	//页码
					flag:true,	// 请求开关
					loading:true,	// 加载中
					loadText:'正在获取消息'
				},
				content:'',
			}
		},
		mounted() {
			this.getHistoryMsg();
			
			uni.onSocketMessage(res=>{
				let jsonObj=JSON.parse(res.data);
				if(jsonObj.group==uni.getStorageSync('group_id')){
					let data = {
						"id":new Date().getTime(),
						"content":jsonObj.msg,
						"type":0,
						"pic":"/static/logo.png"
					}
					this.talkList.push(data);
					this.$nextTick(()=>{
						uni.pageScrollTo({
							scrollTop: 999999,	// 设置一个超大值，以保证滚动条滚动到底部
							duration: 200
						});
					});
				}
			});
		},
		onPageScroll(e){
			if(e.scrollTop<5){
				this.getHistoryMsg();
			}
		},
		methods: {
			getGroupName(){
				return uni.getStorageSync('group_name');
			},
			// 获取历史消息
			getHistoryMsg(){
				if(!this.ajax.flag){
					return; //
				}
				
				// 此处用到 ES7 的 async/await 知识，为使代码更加优美。不懂的请自行学习。
				let get = async ()=>{
					this.hideLoadTips();
					this.ajax.flag = false;
					let data = await this.joinHistoryMsg();
					
					console.log(data);	// 查看请求返回的数据结构 
					
					// 获取待滚动元素选择器，解决插入数据后，滚动条定位时使用
					let selector = '';
										
					if(this.ajax.page>1){
						// 非第一页，则取历史消息数据的第一条信息元素
						selector = `#msg-${this.talkList[0].id}`;
					}else{
						// 第一页，则取当前消息数据的最后一条信息元素
						selector = `#msg-${data[data.length-1].id}`;
					}
					
					// 将获取到的消息数据合并到消息数组中
					this.talkList = [...data,...this.talkList];	
					
					// 数据挂载后执行，不懂的请自行阅读 Vue.js 文档对 Vue.nextTick 函数说明。
					this.$nextTick(()=>{
						// 设置当前滚动的位置
						this.setPageScrollTo(selector);
						
						this.hideLoadTips(true);
												
						if(data.length < this.ajax.rows){
							// 当前消息数据条数小于请求要求条数时，则无更多消息，不再允许请求。
							// 可在此处编写无更多消息数据时的逻辑
						}else{
							this.ajax.page ++;
							this.ajax.flag = true;
							// 延迟 200ms ，以保证设置窗口滚动已完成
							setTimeout(()=>{
							},200)
						}
						
					})
				}
				get();
			},
			// 拼接历史记录消息，正式项目可替换为请求历史记录接口
			joinHistoryMsg(){
				let join = async ()=>{
					let arr = [];
					let res =await uni.request({
						url:this.$url+'/message/getGroupMessages/'+uni.getStorageSync('group_id')+`/${this.ajax.page-1}/${this.ajax.rows}`,
						header:{
							'token':uni.getStorageSync('token')
						},
					});
					console.log(res);
					let records=res.data.data.records;
					for(let i = 0; i < this.ajax.rows; i++){
						if(records[i]==null) break;
						
						let headerData=await uni.request({
							url:this.$url+'/user/getHeader/'+records[i].comeFrom,
							header:{
								'token':uni.getStorageSync('token')
							}
						});
						
						arr.push({
							"id":records[i].messageId,	// 消息的ID
							"content":records[i].msg,	// 消息内容
							"type":records[i].comeFrom==uni.getStorageSync('username') ? 1 : 0	,// 此为消息类别，设 1 为发出去的消息，0 为收到对方的消息,
							"pic":this.$getImageUrl(headerData.data.data)	// 头像
						});
					}
					
					/*
						颠倒数组中元素的顺序。将最新的数据排在本次接口返回数据的最后面。
						后端接口按 消息的时间降序查找出当前页的数据后，再将本页数据按消息时间降序排序返回。
						这是数据的重点，因为页面滚动条和上拉加载历史的问题。
					 */
					arr.reverse();
					
					return arr;
				}
				
				return new Promise((done,fail)=>{
					let data = join();
					done(data);
				})
			},
			// 设置页面滚动位置
			setPageScrollTo(selector){
				let view = uni.createSelectorQuery().in(this).select(selector);
				view.boundingClientRect((res) => {
					uni.pageScrollTo({
					    scrollTop:res.top - 30,	// -30 为多显示出大半个消息的高度，示意上面还有信息。
					    duration: 0
					});
				}).exec();
			},
			// 隐藏加载提示
			hideLoadTips(flag){
				if(flag){
					this.ajax.loadText = '消息获取成功';
					setTimeout(()=>{
						this.ajax.loading = false;
					},300);
				}else{
					this.ajax.loading = true;
					this.ajax.loadText = '正在获取消息';
				}
			},
			// 发送信息
			async send(){
				if(!this.content){
					uni.showToast({
						title:'请输入有效的内容',
						icon:'none'
					})
					return;
				}
				
				let jsonObj={
					group:uni.getStorageSync('group_id'),
					msg:this.content
				};
				uni.sendSocketMessage({
					data:JSON.stringify(jsonObj)
				});
				
				let userData = await uni.request({
					url:this.$url+'/user/getUserInfo',
					header:{
						'token':uni.getStorageSync('token')
					},
					method:'POST',
				});
				
				// 将当前发送信息 添加到消息列表。
				let data = {
					"id":new Date().getTime(),
					"content":this.content,
					"type":1,
					"pic":this.$url+'/file/getImage/'+userData.data.data.header
				}
				this.talkList.push(data);
					
				this.$nextTick(()=>{
					// 清空内容框中的内容
					this.content = '';
					uni.pageScrollTo({
						scrollTop: 999999,	// 设置一个超大值，以保证滚动条滚动到底部
						duration: 200
					});
				});
				
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #fff;
		font-size: 28rpx;
	}
	
	/* 加载数据提示 */
	.tips{
		position: fixed;
		left: 0;
		top:var(--window-top);
		width: 100%;
		z-index: 9;
		background-color: rgba(0,0,0,0.15);
		height: 72rpx;
		line-height: 72rpx;
		transform:translateY(-80rpx);
		transition: transform 0.3s ease-in-out 0s;
		
		&.show{
			transform:translateY(0);
		}
	}
	
	.box-1{
		width: 100%;
		height: auto;
		padding-bottom: 180rpx;
		box-sizing: content-box;
		
		/* 兼容iPhoneX */
		margin-bottom: 0;  
		margin-bottom: constant(safe-area-inset-bottom);  
		margin-bottom: env(safe-area-inset-bottom);  
	}
	.box-2{
		position: fixed;
		left: 0;
		width: 100%;
		bottom: 0;
		height: auto;
		z-index: 2;
		box-sizing: content-box;
		background-color: #fff;
		
		/* 兼容iPhoneX */
		padding-bottom: 0;  
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);  
		
		.flex_grow{
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			margin: 20rpx 0 40rpx 100rpx;
			padding: 20rpx;
			height: 90rpx;
			background-color: #eee;
			border-radius: 15px;
			
			.content{
				font-size: 28rpx;
			}
		}
		.send{
			display: flex;
			align-items: center;
			justify-content: space-evenly;
			background: linear-gradient(to bottom,#ff9c39,#ff6a39);
			box-shadow: 2px 2px 5px 1px rgba(255, 146, 57, 0.5);
			width: 90rpx;
			height: 90rpx;
			margin: 20rpx 100rpx 40rpx 20rpx;
			border-radius: 15px;
			
			&:active{
				background: linear-gradient(to bottom,#ff6c39,#ff3a39);
			}
		}
	}
	
	.talk-list{
		padding-bottom: 20rpx;
		
		/* 消息项，基础类 */
		.item{
			padding: 20rpx 20rpx 0 20rpx;
			align-items:flex-start;
			align-content:flex-start;
			color: #fff;
			
			.pic{
				width: 92rpx;
				height: 92rpx;
				border-radius: 10px;
				border: #fff solid 1px;
			}
			
			.content{
				padding: 20rpx;
				border-radius: 4px;
				max-width: 500rpx;
				word-break: break-all;
				line-height: 52rpx;
				position: relative;
			}
			
			/* 收到的消息 */
			&.pull{
				.content{
					margin-left: 32rpx;
					background-color: #6600ff;
					border-radius: 20px;
					
					&::after{
						content: '';
						display: block;
						width: 0;
						height: 0;
						border-top: 16rpx solid transparent;
						border-bottom: 16rpx solid transparent;
						border-right: 20rpx solid #6600ff;
						position: absolute;
						top: 30rpx;
						left: -18rpx;
					}
				}
			}
			
			/* 发出的消息 */
			&.push{
				/* 主轴为水平方向，起点在右端。使不修改DOM结构，也能改变元素排列顺序 */
				flex-direction: row-reverse;
				
				.content{
					margin-right: 32rpx;
					background-color: #f0f0f0f0;
					color: #000;
					border-radius: 20px;
					
					&::after{
						content: '';
						display: block;
						width: 0;
						height: 0;
						border-top: 16rpx solid transparent;
						border-bottom: 16rpx solid transparent;
						border-left: 20rpx solid #f0f0f0f0;
						position: absolute;
						top: 30rpx;
						right: -18rpx;
					}
				}
			}
		}
	}
	
	/* 根元素样式 设置页面背景、字体大小、字体颜色，字符间距、长单词换行 */
	page {
	  background-color: #fdfdfd;
	  font-size: 28rpx;
	  box-sizing: border-box;
	  color: #333;
	  letter-spacing: 0;
	  word-wrap: break-word;
	}
	
	/* 设置常用元素尺寸规则 */
	view,textarea,input,label,form,button,image{box-sizing: border-box;}
	/* 按钮样式处理 */
	button{font-size: 28rpx;}
	/* 取消按钮默认的边框线效果 */
	button:after{border:none;}
	/* 输入框默认字体大小 */
	textarea,input{font-size: 28rpx;};
	
	/* 列式弹性盒子 */
	.flex_col {
	  display: flex;
	  flex-direction: row;
	  flex-wrap: nowrap;
	  justify-content: flex-start;
	  align-items: center;
	  align-content: center;
	}
	/* 行式弹性盒子 */
	.flex_row {
	  display: flex;
	  flex-direction: column;
	  flex-wrap: nowrap;
	  justify-content: flex-start;
	  align-items: flex-start;
	  align-content: flex-start;
	}
	 
	/* 弹性盒子弹性容器 */
	.flex_col .flex_grow{width:0;flex-grow: 1;}
	.flex_row .flex_grow{flex-grow: 1;}
	 
	/* 弹性盒子允许换行 */
	.flex_col.flex_wrap{flex-wrap: wrap;}
	 
	/* 弹性盒子居中对齐 */
	.flex_col.flex_center,.flex_row.flex_center{justify-content: center;}
	 
	/* 列式弹性盒子两端对齐 */
	.flex_col.flex_space{justify-content: space-between;}
	
	/* 弹性盒子快速分栏 ,这里非常郁闷 uniapp 居然不支持 * 选择器 */
	.flex_col.flex_col_2>view{width: 50%;}
	.flex_col.flex_col_3>view{width: 33.33333%;}
	.flex_col.flex_col_4>view{width: 25%;}
	.flex_col.flex_col_5>view{width: 20%;}
	.flex_col.flex_col_6>view{width: 16.66666%;}
	
	/* 字体颜色 */
	.color_333 {color: #333;}
	.color_666 {color: #666;}
	.color_999 {color: #999;}
	.color_ccc {color: #ccc;}
	.color_fff {color: #fff;}
	.color_6dc{color: #6dca6d;}
	.color_d51{color: #d51917;}
	.color_09f{color: #0099ff;}
	 
	/* 背景色*/
	.bg_fff{background-color: #ffffff;}
	 
	/* 字体大小 */
	.size_10 {font-size: 20rpx;}
	.size_12 {font-size: 24rpx;}
	.size_14 {font-size: 28rpx;}
	.size_16 {font-size: 32rpx;}
	.size_18 {font-size: 36rpx;}
	.size_20 {font-size: 40rpx;}
	 
	/* 字体加粗 */
	.font_b{font-weight: bold;}
	 
	/* 对齐方式 */
	.align_c{text-align: center;}
	.align_l{text-align: left;}
	.align_r{text-align: right;}
	 
	/* 遮罩 */
	.shade{
	  position: fixed;
	  top: 0;
	  right: 0;
	  bottom: 0;
	  left: 0;
	  background-color: rgba(0,0,0,0.8);
	  z-index: 100;
	}
	 
	/* 弹窗 */
	.shade_box{
	  position: fixed;
	  top: 0;
	  right: 0;
	  bottom: 0;
	  left: 0;
	  margin: auto;
	  z-index: 101;
	  min-width: 200rpx;
	  min-height: 200rpx;
	}
</style>