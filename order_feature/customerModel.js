const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const User=new Schema({
       name:{type: String,required:true},
       address: { type: String, required: true},
    phone: { type: Number, required: true},
  
});
module.exports=mongoose.model('user',User);
