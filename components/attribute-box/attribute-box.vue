<template>
	<view class="attribute-box" :style="{background:color}">
		<image :src="img_url" mode="aspectFill"></image>
		<text v-if="showNum">{{num}}</text>
	</view>
</template>

<script>
	export default {
		name:"attribute-box",
		props:{
			img_url:{
				type:String,
				default:"/static/icon/send.svg"
			},
			num:{
				type:Int16Array,
				default:0
			},
			color:{
				type:String,
				default:'#eee'
			},
			showNum:{
				type:Boolean,
				default:true
			}
		},
		data() {
			return {

			};
		},
	}
</script>

<style lang="scss">
	.attribute-box{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		margin-right: 10px;
		border-radius: 100%;
		image{
			width: 12px;
			height: 12px;
		}
		text{
			margin-top: 2px;
			font-size: 6px;
			font-weight: bold;
			color: #fff;
		}
	}
</style>