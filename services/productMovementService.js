const mongoose = require('mongoose');
const MovemomentSchema = require('../models/ProductMovementSchema');

const PRE_TRANSIT='PRE_TRANSIT';
const IN_TRANSIT='IN_TRANSIT';
const DELIVERED='DELIVERED';

module.exports.createMovementOfProduct= async ({name,fromLocationId,toLocationId,status,productId,qty})=>{
    const product= await MovemomentSchema({
            _id: mongoose.Types.ObjectId(),
            status:PRE_TRANSIT,
            from_location:fromLocationId,
            to_location:toLocationId,
            timestamp: Date.now(),
            statusUpdateTimestamp: Date.now(),
            product_id: productId,
            qty
    });

    
    return await product.save();
}

module.exports.getMovementById= async (id)=>{
    return await MovemomentSchema.findById(id).exec(); 
}

module.exports.getAllProductsInMovement= async (id)=>{
    return await MovemomentSchema.find({}).sort({'timestamp':'desc'}).exec(); 
}

module.exports.updateMovementStatus= async ({id, status})=>{

    return await MovemomentSchema.findOneAndUpdate(
            {'_id':id},
            {
                status,
                statusUpdateTimestamp:Date.now()
            },
            {useFindAndModify: false}
    )
    
}