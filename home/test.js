const mongoose = require('mongoose');
const Schema=mongoose.Schema
const adminSchema=new Schema(
{
 name:{type:String,required:true},

 age:{type:Number,required:true},

});
const User=mongoose.model('Test',adminSchema);

module.exports=User;