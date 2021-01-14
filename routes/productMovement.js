const express= require('express');
const router = express.Router();

const productMovementService= require('../services/productMovementService');
const warehouseService= require('../services/warehouseService');


router.get('/test', async (req, res, next) => {
    res.send({"success":true}).status(200);
});


router.post('/createToMovement', async (req, res, next)=>{
    try{
        //First create product transaction;
        const data= await productMovementService.moveTheProductTo(req.body);
        console.log(data);
        //second update warehouse inventory;
        const updatedInventory= await warehouseService.updateInventoryByProduct(data.get('to_location').toString(), data.get('product').toString(), data.get('qty'));
         res.status(201).send({
             data:{
                 "status":"success",
                 product:{
                     inventory:updatedInventory.get('inventory')
                 }
             }
         });
    }catch(err){
         next(err);
    }
 
});

router.post('/movementFromXToY', async (req, res, next)=>{
    try{

         //First create product avaibility in warehouse location;
        const isAvailable=await warehouseService.checkWarehouseProductAvailability(req.body);

        if(isAvailable){
            //second create product transaction;
            const data= await productMovementService.moveTheProductTo(req.body);
            console.log(data);
            //third update warehouse inventory;
            const updatedInventory= await warehouseService.updateInventoryByProduct(req.body);
            res.status(201).send({
                data:{
                    "status":"success",
                    product:{
                        inventory:updatedInventory.get('inventory')
                    }
                }
            });
        }
        
    }catch(err){
         next(err);
    }
 
});

router.get('/getAllMovements', async (req, res, next)=>{
    try{
         const data= await productMovementService.getAllProductsInMovement();
         res.status(201).send({
             data:{
                "status":"success",
                products:data
             }
         });
    }catch(err){
         next(err);
    }
 
});

router.get('/updateMovementStatus', async (req, res, next)=>{
    try{
         const data= await productMovementService.updateMovementStatus();
         res.status(201).send({
             data:{
                "status":"success",
                products:data
             }
         });
    }catch(err){
         next(err);
    }
 
});

module.exports= router