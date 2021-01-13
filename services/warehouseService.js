const mongoose = require('mongoose');
const LocationSchema = require('../models/LocationSchema');

module.exports.addLocation= async ({name})=>{
    const product= await LocationSchema({
            _id:mongoose.Types.ObjectId(),
            locationName:name,
            
    });
    return await product.save();
}

module.exports.getLocationtById= async (id)=>{
    return await LocationSchema.findById(id).exec(); 
}

module.exports.updateLocationById= async ({id, name})=>{


    return await LocationSchema.findOneAndUpdate(
            {'_id':id},
            {
                locationName:name
            },
            {useFindAndModify: false}
    )
    
}