const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema=new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String,required:true},
    price:{type:Number,required:true},
    //currentLocation:{type:mongoose.Schema.Types.ObjectId, ref:'location'}
})

const Product = mongoose.model('product',productSchema,'Products');
module.exports=Product;



