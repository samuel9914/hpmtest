const limiterConfig = {
    
    windowMs: 15 * 60 * 1000, 
	max: 50, 
	standardHeaders: true, 
	legacyHeaders: false, 

}

module.exports = limiterConfig