const {Router}=require('express');

const router=Router();


const {
    getServiciosPorRangoFechas
} = require('../controllers/reporteTransporte');

router.post('/', getServiciosPorRangoFechas);

module.exports=router; 

