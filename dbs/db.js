const mongo = require('mongoose')
require('dotenv').config()

// mongoose.set("strictQuery", true);
mongo.Promise = global.Promise;
mongo.connect(process.env.MONGO).then(() => {
    console.log('DB ON')  
}).catch((err) => {
    console.log('DB OFF')
    console.log(err)
})


module.exports = mongo

