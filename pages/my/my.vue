<template>
	<view v-if="!userInfo.nickName">
	  <view class="login-container">
		<!-- 提示登录的图标 -->
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<!-- 登录按钮 -->
		<button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
	  </view>
	</view>
	<userinfo v-else></userinfo>
</template>

<script>
	// 1. 从 vuex 中按需导入 mapState 辅助函数
	import { mapState } from 'vuex'
	import cloudApi from '../../common/cloudApi.js'
	export default {
		computed: {
		},
		data() {
			return {
				userInfo: null
			};
		},
		
		async onLoad(options){
			uni.login({
				provider:'weixin',
				success: (res) => {
					var code = res.code;
					
					cloudApi.call({
						name:"login",
						data:{
							code:code
						},
						success: (res) => {
							this.userInfo = res.result;
						}
					})
					
				}
			})
		},
		methods: {
			getUserProfile(e) {
				uni.getUserProfile({
				  desc: '请求获得您的基本信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中
				  success: (res) => {
					  cloudApi.call({
						name:"updateuserinfo",
						data:{
							userInfo: res.userInfo
						}
					  })
				  }
				})
			},
		}
		
		
	
	}
</script>

<style lang="scss">
.login-container {
  // 登录盒子的样式
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;

  // 绘制登录盒子底部的半椭圆造型
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    width: 100%;
    height: 40px;
    left: 0;
    bottom: 0;
    background-color: white;
    border-radius: 100%;
    transform: translateY(50%);
  }

  // 登录按钮的样式
  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #71CCE0;
  }

  // 按钮下方提示消息的样式
  .tips-text {
    font-size: 12px;
    color: gray;
  }
}

</style>
