const mongoose = require('mongoose');
const {LocationSchema,InventorySchema} = require('../models/LocationSchema');

const addLocation= async ({name})=>{
    const product= await LocationSchema({
            _id:mongoose.Types.ObjectId(),
            locationName:name,
            inventory:[]
    });
    return await product.save();
}

const getLocationtById= async (id)=>{
    return await LocationSchema.find({_id:id}).exec(); 
}

const updateLocationById= async ({id, name})=>{
    return await LocationSchema.findOneAndUpdate(
            {'_id':id},
            {
                locationName:name
            },
            {useFindAndModify: false}
    )
    
}

const updateInventoryByLocationId= async (id, inventory)=>{
    return await LocationSchema.findOneAndUpdate(
        {'_id':id},
        {
            inventory:inventory
        },
        {useFindAndModify: false}
    ).exec()
}

const getAllLocations= async()=>{
    return await LocationSchema.find({}).sort({'name':'asc'});
}

const checkWarehouseProduct = async (locationId,productId,qty)=>{
    const location= await getLocationtById();
    if(location != null){
        let currentInventory= location.get('inventory');
        let product= currentInventory.filter(prod=> prod._id === productId);
        console.log(product);
        
    }
}

const updateInventoryByProduct= async (locationId,productId,qty)=>{
    const location= await getLocationtById(locationId);
    if(location != null && location.length > 0){
        let currentInventory= location[0].get('inventory');
        //let product= currentInventory.filter(prod=> prod._id === productId);
        //console.log(product);
        let productIndex=-1;
        if(currentInventory != null && currentInventory.length > 0)
            productIndex= indexOfProduct(currentInventory,productId)//currentInventory.f(item=> item._id === productId); 
        
        updatedInventory= updateOrAddProduct(currentInventory,productIndex, productId, qty);
        return await updateInventoryByLocationId(location[0].get('_id'), updatedInventory);
    }
    throw new Error(`Location not found. locationId:${locationId}`);
}

const indexOfProduct=(inventory, productId)=>{
    let productIndex= -1;
    for(let i=0;i<inventory.length;i++){
        console.log(inventory[i].get('product').toString());
        console.log(productId.toString())
        if(inventory[i].product.toString() == productId){
            productIndex=i;
            break;
        }
    }
    return productIndex;
    
}

const updateOrAddProduct= (inventory, index,productId,qty,)=>{
    if(index != -1){
        let product=inventory[index];
        product.qty+=qty;
    }else{
        const addProduct= InventorySchema({
            product:productId,
            qty
        });
        inventory.push(addProduct);
    }

    return inventory;
}


module.exports={
    addLocation,
    getLocationtById,
    updateLocationById,
    getAllLocations,
    updateInventoryByProduct
}
