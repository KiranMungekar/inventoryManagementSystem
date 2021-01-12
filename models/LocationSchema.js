const mongoose= require('mongoose');
const Schema = mongoose.Schema;


const LocationSchema= new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    locationName:{type:String, required:true},
});

module.exports= mongoose.model('location',LocationSchema, 'WarehouseLocations');