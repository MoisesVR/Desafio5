const pool = require("../db/db").pool;
const format = require("pg-format");

const getJoyas = async (limit, page, order_by) => {
    try {
        const [campo, order] = order_by.split("_");
        let offset = 0;
        if (parseInt(page) === 0) {
            offset = page * limit;
        } else {
            offset = (page - 1) * limit;
        }
        const formattedQuery = format(
            "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s",
            campo,
            order,
            limit,
            offset
        );
        const { rows: joyas } = await pool.query(formattedQuery);
        return joyas;
    } catch (e) {
        console.log(e)
    }
}

const getJoyasFilter = async ({ precio_min, precio_max, categoria, metal }) => {
    try {
        SQLquery = {
            text: "SELECT * FROM inventario WHERE precio >= $1 AND precio <= $2 AND categoria= $3 AND metal= $4",
            values: [precio_min, precio_max, categoria, metal]
        };
        const res = await pool.query(SQLquery);
        return res.rows;
    } catch (e) {
        console.log(e)
    }

}

module.exports = { getJoyas, getJoyasFilter }