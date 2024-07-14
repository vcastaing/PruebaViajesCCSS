const {Router}=require('express');

const router=Router();


const {
    getAllServicios,
    getServiciosPorRangoFechas
} = require('../controllers/reporteTransporte');

router.get('/', getAllServicios);
router.post('/fecha', getServiciosPorRangoFechas);

module.exports=router; 

