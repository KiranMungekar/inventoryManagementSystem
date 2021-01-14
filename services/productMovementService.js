const mongoose = require('mongoose');
const MovemomentSchema = require('../models/ProductMovementSchema');

const warehouseService= require('../services/warehouseService');


const moveTheProductTo= async ({fromLocationId,toLocationId,productId,qty})=>{
    if(toLocationId !== null && toLocationId !== ''){
        return await createMovementLog(fromLocationId,toLocationId,productId,qty)
    }else{
        throw new Error(`To location not present`);
    }
}

const moveTheProductFrom= async ({fromLocationId,toLocationId,productId,qty})=>{
    if(toLocationId !== null && fromLocationId !== null){
        return await createMovementLog(fromLocationId,toLocationId,productId,qty)
    }else{
        throw new Error(`fromLocationId: ${fromLocationId} and toLocationId:${toLocationId}`);
    }
}

const getMovementById= async (id)=>{
    return await MovemomentSchema.findById(id).exec(); 
}

const getAllProductsInMovement= async (id)=>{
    return await MovemomentSchema.find({})
                                        .populate('from_location')
                                        .populate('to_location')
                                        .populate('product')
                                        .sort({'timestamp':'desc'})
                                        .exec(); 
}

const updateMovementStatus= async ({id, status})=>{

    return await MovemomentSchema.findOneAndUpdate(
            {'_id':id},
            {
                status,
                statusUpdateTimestamp:Date.now()
            },
            {useFindAndModify: false}
    )
    
}

module.exports={
    updateMovementStatus,
    getAllProductsInMovement,
    getMovementById,
    moveTheProductFrom,
    moveTheProductTo
}

const createMovementLog=async (fromLocationId,toLocationId,productId,qty)=>{
    if(fromLocationId == '')
        fromLocationId= null
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

