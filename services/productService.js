const mongoose = require('mongoose');
const ProductSchema = require('../models/ProductSchema');


module.exports.addProduct= async ({name,price})=>{
    const product= await ProductSchema({
            _id:mongoose.Types.ObjectId(),
            name,
            price
    });
    return await product.save();
}

module.exports.getProductById= async (id)=>{
    return await ProductSchema.findById(id).exec(); 
}

module.exports.updateProductById= async ({id, name, price})=>{
    
    return await ProductSchema.findOneAndUpdate(
            {'_id':id},
            { name, price},
            {useFindAndModify: false}
        )
    
}

module.exports.getAllProducts = async ()=>{
    return await ProductSchema.find({}).sort('name');
}