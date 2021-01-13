const express= require('express');
const router = express.Router();

const productService =require('../services/productService');

router.get('/test', async (req, res, next) => {
    res.send({"success":true}).status(200);
});

router.post('/addproduct', async (req, res, next)=>{
   try{
        const productData= await productService.addProduct(req.body);
        res.status(201).send({
            data:{
                "status":"success",
                product:{
                    name:productData.name,
                    price:productData.price
                }
            }
        });
   }catch(err){
        next(err);
   }

});

router.get('/getProduct/:id', async (req, res, next) => {
   try{
    const product= await productService.getProductById(req.params.id);
    res.status(200).send({
        data:{
            "status":"success",
            product
        }
    })
   }catch(err){
    next(err);
   }
});

router.get('/getAllProduct/', async (req, res, next) => {
    try{
     const products= await productService.getAllProducts();
     res.status(200).send({
         data:{
             "status":"success",
             products
         }
     })
    }catch(err){
     next(err);
    }
 });

router.put('/updateProduct', async (req,res,next)=>{
    try{
        const product= await productService.updateProductById(req.body);
        res.status(200).send({
            data:{
                "status":"success",
                product:{
                    name:product.name,
                    price:product.price
                }
            }
        })
    }catch(err){
        next(err);
    }
});

module.exports= router;

 