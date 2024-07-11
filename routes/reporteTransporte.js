const {Router}=require('express');

const router=Router();


const {
    getAllServicios
}=require('../controllers/reporteTransporte');

router.get('/',   getAllServicios);

module.exports=router; 

