const express= require('express');
const router = express.Router();

const productMovementService= require('../services/productMovementService');
const warehouseService= require('../services/warehouseService');


router.get('/test', async (req, res, next) => {
    res.send({"success":true}).status(200);
});


router.post('/createMovement', async (req, res, next)=>{
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