const mongoose = require('mongoose');
const MovemomentSchema = require('../models/ProductMovementSchema');

const warehouseService= require('../services/warehouseService');

//Ignore
module.exports.createMovementOfProduct= async ({name,fromLocationId,toLocationId,status,productId,qty})=>{
    const product= await MovemomentSchema({
            _id: mongoose.Types.ObjectId(),
            from_location:fromLocationId,
            to_location:toLocationId,
            timestamp: Date.now(),
            product: productId,
            qty
    });

    
    return await product.save();
}

module.exports.moveTheProductTo= async ({fromLocationId,toLocationId,productId,qty})=>{
    if(toLocationId !== null && toLocationId !== ''){
        return await createMovementLog(fromLocationId,toLocationId,productId,qty)
    }else{
        throw new Error(`To location not present`);
    }
}

module.exports.moveTheProductFrom= async ({fromLocationId,toLocationId,productId,qty})=>{
    if(toLocationId !== null && fromLocationId !== null){
        return await createMovementLog(fromLocationId,toLocationId,productId,qty)
    }else{
        throw new Error(`fromLocationId: ${fromLocationId} and toLocationId:${toLocationId}`);
    }
}

module.exports.getMovementById= async (id)=>{
    return await MovemomentSchema.findById(id).exec(); 
}

module.exports.getAllProductsInMovement= async (id)=>{
    return await MovemomentSchema.find({})
                                        .populate('from_location')
                                        .populate('to_location')
                                        .populate('product')
                                        .sort({'timestamp':'desc'})
                                        .exec(); 
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


const createMovementLog=async (fromLocationId,toLocationId,productId,qty)=>{
    const movement= await MovemomentSchema({
        _id: mongoose.Types.ObjectId(),
        from_location:fromLocationId,
        to_location:toLocationId,
        timestamp: Date.now(),
        product: productId,
        qty
    });
    return await movement.save();
}