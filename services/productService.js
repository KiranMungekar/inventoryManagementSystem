const mongoose = require('mongoose');
const ProductSchema = require('../models/ProductSchema');


const addProduct= async ({name,price})=>{
    const product= await ProductSchema({
            _id:mongoose.Types.ObjectId(),
            name,
            price
    });
    return await product.save();
}

const getProductById= async (id)=>{
    return await ProductSchema.findById(id).exec(); 
}

const updateProductById= async ({id, name, price})=>{
    
    return await ProductSchema.findOneAndUpdate(
            {'_id':id},
            { name, price},
            {useFindAndModify: false}
        )
    
}

const getAllProducts = async ()=>{
    return await ProductSchema.find({}).sort('name');
}


module.exports={
    getAllProducts,
    updateProductById,
    addProduct,
    getProductById
}