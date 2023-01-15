const express = require ('express')
const router = express.Router()
const { reportRequest } =require('../middlewares/logger')

const { getAllJoyas, getAllJoyasFilter } = require('../controllers/joyasController')

router.get('/joyas', getAllJoyas)
router.get('/joyas/filtros', getAllJoyasFilter)

router.get("*", (req,res) => {
    res.status(400).send("Esta ruta no existe");
});

module.exports = router;