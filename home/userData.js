const mongoose = require('mongoose');
const Schema=mongoose.Schema
const userSchema=new Schema(
{
 name:{type:String,required:true},
 email:{type:String,required:true},
 password:{type:String,required:true},
role:{type:String,default:'user'}

});
const userData=mongoose.model('userData',userSchema);

module.exports=userData