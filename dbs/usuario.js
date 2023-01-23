const mongo = require('./db')


const UserSchema = mongo.Schema({
    user:{
        type: String,
        require:true,
    },
    pass:{
        type: String,
        require:true
    },
    perm:{
        type: String,
        require:true
    }

})

mongo.model('user', UserSchema)

const usuario = mongo.model('user')

module.exports = usuario
