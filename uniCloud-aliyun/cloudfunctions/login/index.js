'use strict';
const {appId, appSecret, getToken} = require("wx-common");
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	const db = uniCloud.database();
	
	// jscode2session
	const {code} = event;
	
	
	const res = await uniCloud.httpclient.request(
		"https://api.weixin.qq.com/sns/jscode2session?appid="+appId+"&secret="+appSecret+"&js_code="+code+"&grant_type=authorization_code",
		{
			dataType:"json"
		}
	)
	const openid = res.data.openid;
	const token = getToken(openid);
	

	let dbRes = await db.collection("users").where({
		openid:openid
	}).limit(1).get();
	
	let userdata;
	if(dbRes.data.length<=0){
		userdata = {
			openid : openid,
			nickName : "未登录",
			avatarUrl : "" 
		}
		await db.collection("users").add(userdata) 		 
	}else{
		userdata = dbRes.data[0];
	}
	
	delete userdata["openid"]; 
	userdata["token"] = token;
	//返回数据给客户端
	return userdata;
};
