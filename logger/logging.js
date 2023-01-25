const log1 = (req,res,next)=>{
console.log('log1 is rouning')
next()
}

module.exports = log1