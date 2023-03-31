import mongoose from 'mongoose'

const userSchame=mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    }, 
    password:{
        type:String,
        require:true
    }
})
const User=mongoose.model('Users',userSchame);

export default User