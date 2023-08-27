const loginLimiterConfig = {
    
    windowMs: 15 * 60 * 1000, 
	max: 25, 
	standardHeaders: true, 
	legacyHeaders: false, 

}
const registerLimiterConfig = {
    
    windowMs: 15 * 60 * 1000, 
	max: 5,
	message:'Too many accounts created from this IP, please try again after an hour', 
	standardHeaders: true, 
	legacyHeaders: false, 

}

module.exports = {loginLimiterConfig,registerLimiterConfig}