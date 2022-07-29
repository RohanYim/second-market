const appId = "xxx";
const appSecret = "xxx";
const { open } = require("fs");
const jwt = require("jsonwebtoken");

//使用jwt携带token
function getToken(openid){
	return jwt.sign({openid:openid},appSecret,{expiresIn:60*60*24});
}
function verifyToken(token){
	return jwt.verify(token,appSecret)
}

module.exports = {
	appId : appId,
	appSecret : appSecret,
	getToken : getToken,
	verifyToken : verifyToken
}

