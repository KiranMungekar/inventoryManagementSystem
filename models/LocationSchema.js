const mongoose= require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema= require('./ProductSchema');


const InventorySchema= new Schema({
    product:{type:mongoose.Schema.Types.ObjectId, ref:'product'},
    qty:{type:Number}
});

const LocationSchema= new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    locationName:{type:String, required:true},
    inventory: [InventorySchema]
});




module.exports.InventorySchema = mongoose.model('Inventory',InventorySchema);

module.exports.LocationSchema= mongoose.model('location',LocationSchema, 'WarehouseLocations');