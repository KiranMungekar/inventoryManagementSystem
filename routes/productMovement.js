const express= require('express');
const router = express.Router();

const productMovementService= require('../services/productMovementService');


router.get('/test', async (req, res, next) => {
    res.send({"success":true}).status(200);
});


router.post('/createMovement', async (req, res, next)=>{
    try{
         const data= await productMovementService.createMovementOfProduct(req.body);
         res.status(201).send({
             data:{
                 "status":"success",
                 product:{
                     status:data.status,
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