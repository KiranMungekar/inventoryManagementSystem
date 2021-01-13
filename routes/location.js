const express= require('express');
const router = express.Router();

const warehouseService= require('../services/warehouseService');


router.get('/test', async (req, res, next) => {
    res.send({"success":true}).status(200);
});


router.post('/addLocation', async (req, res, next) => {
   try{ 
        const location= await warehouseService.addLocation(req.body);
        res.status(201).send({
            data:{
                location
            }
        })

   }catch(err){
        next(err);
   }
});

router.get('/getLocation/:id', async (req, res, next) => {
    try{ 
         const location= await warehouseService.getLocationtById(req.params.id);
         res.status(200).send({
            data:{
                location
            }
        })
 
    }catch(err){
         next(err);
    }
});

router.put('/updateLocation/:id', async (req, res, next) => {
    try{ 
         const location= await warehouseService.updateLocationById(req.body);
         res.status(200).send({
            data:{
                location
            }
        })
 
    }catch(err){
         next(err);
    }
});

router.get('/getAllLocations', async (req, res, next) => {
    try{ 
         const locations= await warehouseService.getAllLocations();
         res.status(200).send({
            data:{
                locations
            }
        })
 
    }catch(err){
         next(err);
    }
});

module.exports= router;