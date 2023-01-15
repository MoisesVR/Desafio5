const { getJoyas, getJoyasFilter } = require("../models/joyasModel");

const getAllJoyas = async (req, res) => {
    try {
        const { limit } = req.query;
        const { order_by } = req.query;
        const { page } = req.query;
        if (limit === undefined || order_by === undefined || page === undefined) {
            res.json({ "Message": "Faltan campos de busqueda por rellenar" });
        } else {
            const joyas = await getJoyas(limit, page, order_by);
            const HATEOAS = prepararHATEOAS(joyas);
            res.json(HATEOAS);
        }
    } catch (e) {
        console.log(e)
    }
};

const getAllJoyasFilter = async (req, res) => {
    try {
        const query = req.query;
        const lengthQuery = Object.values(query).length;
        if (lengthQuery < 4) {
            res.json({ "Message": "Faltan filtros de busqueda en la consulta" });
        }
        else {
            const joyas = await getJoyasFilter(query);
            if (joyas.length === 0) {
                res.json({ "Message": "No se encontraron registros acordes a los filtros" });
            } else {
                res.json(joyas);
            }
        }
    } catch (e) {
        console.log(e);
    }
}

const prepararHATEOAS = (joyas) => {
    try {
        let stockTotal = 0;
        const results = joyas.map((j) => {
            stockTotal += j.stock;
            return {
                name: j.nombre,
                href: `/joyas/joya/${j.id}`,
            };
        }).slice(0, 10);
        const totalJoyas = joyas.length;
        const HATEOAS = {
            totalJoyas,
            stockTotal,
            results,
        };
        if(totalJoyas===0){
            console.log({" Message ": " No se encontraron registros para los filtros seleccionados"});
        }else{
            return HATEOAS;
        }
    } catch (e) {
        console.log(e)      
    }
}

module.exports = { getAllJoyas, getAllJoyasFilter }