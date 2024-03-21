import mysql from "mysql2/promise"


const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"api",
    connectionLimit:"1000"
})

const executeQuery = async (query,params) =>{
    let conn;
    try{
        conn = await pool.getConnection()
        const [rows] = await conn.execute(query,params);
        return rows;
    }catch(err){
        console.error(err)
    }
}

const addUser = async (login,email,pass) => { 
    return executeQuery("INSERT INTO users (login, pass,email) VALUES (?, ?,?)", [login, pass,email]); 
}; 
 
const findUser = async (login, pass) => { 
    try{ 
    return executeQuery("SELECT * FROM users WHERE `login`=? AND `pass`=?", [login, pass]); 
    }catch(err){ 
        console.error(err) 
    } 
}; 
 
const getUser = async () => {
    return executeQuery("SELECT * FROM users");
};

const delUser = async (id) => {
    return executeQuery("DELETE FROM users WHERE `users`.`id` = ?",[id]);
};

const updateUser = async (pass,id) => {
    return executeQuery("UPDATE `users` SET `pass` =? WHERE `users`.`id` = ?;",[pass,id]);
};

const addProd = async (title,desc,price,category,link,img) =>{
    return executeQuery("INSERT INTO product (title,description,price,category,link,img) VALUES(?,?,?,?,?,?)",[title,desc,price,category,link,img])
}

const getProd = async () => {
    return executeQuery("SELECT * FROM product");
};

const idProd = async (id) => {
    return executeQuery("SELECT * FROM product WHERE `product`.`id` = ?",[id]);
};

const delProd = async (id) =>{
    return executeQuery("DELETE FROM product WHERE `product`.`id` =?",[id])
}

    const updateProd = async (title,desc,price,category,link,img,id) => {
        return executeQuery("UPDATE `product` SET `title`=?, `description`=?, `price`=?, `category`=?, `link`=?, `img`=? WHERE `product`.`id` = ?;",[title,desc,price,category,link,img,id]);
    };

const getOrders = async () => {
    return executeQuery("SELECT * FROM orders");
};



const updateOrders = async (name,status,price,id) => {
    return executeQuery("UPDATE `orders` SET `customer_name`=?, `status`=?, `total_amount`=? WHERE `orders`.`id` = ?;",[name,price,status,id]);
};

const getStat = async () => {
    const result = await executeQuery(`
        INSERT INTO statistic (total_sales, total_sales_amount, orders_statuses)
        SELECT 
            (SELECT COUNT(*) FROM orders),
            (SELECT SUM(total_amount) FROM orders),
            (SELECT JSON_OBJECTAGG(status, cnt) FROM (
                SELECT status, COUNT(*) as cnt FROM orders GROUP BY status
            ) AS subquery);
    `);
    return result;
}



export{
    addUser,
    findUser,
    getUser,
    delUser,
    updateUser,

    addProd,
    getProd,
    idProd,
    delProd,
    updateProd,

    getOrders,
    updateOrders,

    getStat,
    
}