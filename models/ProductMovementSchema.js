const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const MovemomentSchema= new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    timestamp:{type:Date, required:true},
    from_location:{type:mongoose.Schema.Types.ObjectId, ref:'location'},
    to_location:{type:mongoose.Schema.Types.ObjectId, ref:'location'},
    product:{type:mongoose.Schema.Types.ObjectId, ref:'product'},
    qty:{type:Number, required:true}
});

module.exports= mongoose.model('ProductMovement',MovemomentSchema, 'ProductMovements');