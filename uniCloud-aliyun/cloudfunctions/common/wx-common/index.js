const appId = "wxa5bbeceb7101506f";
const appSecret = "8ec0d4123ae6eaf2afba76f6bb4762be";
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

