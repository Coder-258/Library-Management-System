const bcrypt=require('bcrypt');
const mongoose=require('mongoose');
const schema=mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    issuedBooks:[{type:mongoose.Schema.Types.ObjectId,ref:'Book'}]
});
const User=mongoose.model('User',schema);
module.exports=User;