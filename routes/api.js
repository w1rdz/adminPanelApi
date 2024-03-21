import express from "express"; 
import { addUser, getUser,delUser, findUser,updateUser,addProd, getProd,idProd,delProd,updateProd, getOrders,updateOrders,getStat} from "../database/db.js"; 
 
const api = express.Router(); 


api.post("/login", async (req, res) => {
    const {login, password} = req.body;

    if(!login || !password){
        res.status(400).json({
            "type": "/problem/types/400",
            "title": "Bad r",
            "status": 400,
            "detail": "..."
        }
        )
        return;
    }

    console.log(login, password);
    const dataUser = await findUser(login, password)
    console.log(dataUser);
    if (dataUser.length > 0) {
        const userRoles = dataUser[0].roles;
        if(userRoles >= 2){
            res.cookie("token", `${login}:${password}`)
        }
    } else {
        res.status(403).json({
            "type": "/problem/types/400",
            "title": "No user",
            "status": 403,
            "detail": "No user"
        });
        return
    }
    
    res.json({
        "login": login,
        "password": password
    })
})
 
api.get("/users", async (req,res) => {
    const {token} = req.cookies;
    if(!token){
        res.status(403).json({
            "type": "/problem/types/400",
            "title": "No user",
            "status": 403,
            "detail": "No user"
        });
        return
    }
    const allUsers = await getUser();
    res.json({
        allUsers
    })    
})

api.post("/users", async (req,res)=>{
    const {token} = req.cookies;
    if(!token){
        res.redirect("/login")
        return;
    }
    const {login,email,password} = req.body;
    const newUser = await addUser(login,email,password)

    res.json({
        newUser
    })
})

api.delete("/users/:id", async (req,res)=> {
    const {token} = req.cookies;
    if(!token){
        res.status(403).json({
            "type": "/problem/types/400",
            "title": "No user",
            "status": 403,
            "detail": "No user"
        });
        return
    }
    const userId = req.params.id;
    const deletUser = await delUser(userId)
    res.redirect("/users")

})

api.put("/users/:id/reset-password", async (req,res)=>{
    const {token} = req.cookies;
    if(!token){
        res.status(403).json({
            "type": "/problem/types/400",
            "title": "No user",
            "status": 403,
            "detail": "No user"
        });
        return
    }
    const userId = req.params.id;
    const {password} = req.body;
    const resPass = await updateUser(password,userId)
    return res.redirect("/users")
})

api.get("/products", async(req,res)=>{
    const {token} = req.cookies;
    if(!token){
        res.status(403).json({
            "type": "/problem/types/400",
            "title": "No user",
            "status": 403,
            "detail": "No user"
        });
        return
    }
    const allProd = await getProd();
    res.json({
        allProd
    })
})

api.post("/products", async (req,res)=>{
    const {token} = req.cookies;
    if(!token){
        res.status(403).json({
            "type": "/problem/types/400",
            "title": "No user",
            "status": 403,
            "detail": "No user"
        });
        return
    }
    const {title,desc,price,category,link,img} = req.body;
    const newProd = await addProd(title,desc,price,category,link,img);

    res.json({
        newProd
    })
})

api.get("/products/:id", async(req,res)=>{
    const {token} = req.cookies;
    if(!token){
        res.status(403).json({
            "type": "/problem/types/400",
            "title": "No user",
            "status": 403,
            "detail": "No user"
        });
        return
    }
    const prodId = req.params.id;
    const productId = await idProd(prodId)
    res.json({
        productId
    })
})

api.put("/products/:id", async(req,res)=>{
    const {token} = req.cookies;
    if(!token){
        res.status(403).json({
            "type": "/problem/types/400",
            "title": "No user",
            "status": 403,
            "detail": "No user"
        });
        return
    }
    const prodId = req.params.id;
    const {title,desc,price,category,link,img} = req.body;
    const resProd = await updateProd(title,desc,price,category,link,img,prodId)
    res.json({
        resProd
    })

})

api.delete("/products/:id", async(req,res)=>{
    const {token} = req.cookies;
    if(!token){
        res.status(403).json({
            "type": "/problem/types/400",
            "title": "No user",
            "status": 403,
            "detail": "No user"
        });
        return
    }
    const prodId = req.params.id;
    const delProductId = await delProd(prodId)
    res.json({
        delProductId
    })
})

api.get("/orders", async (req,res)=>{
    const {token} = req.cookies;
    if(!token){
        res.status(403).json({
            "type": "/problem/types/400",
            "title": "No user",
            "status": 403,
            "detail": "No user"
        });
        return
    }
    const allOrders = await getOrders();
    res.json({
        allOrders
    })   
})

api.put("/orders/:id", async (req,res)=>{
    const {token} = req.cookies;
    if(!token){
        res.status(403).json({
            "type": "/problem/types/400",
            "title": "No user",
            "status": 403,
            "detail": "No user"
        });
        return
    }
    const orderId = req.params.id;
    const {name,status,price} = req.body;
    const upOrders = await updateOrders(name,price,status,orderId)


    res.json({
        upOrders
    })
})



api.get("/statistics", async (req,res)=>{
    const {token} = req.cookies;
    if(!token){
        res.status(403).json({
            "type": "/problem/types/400",
            "title": "No user",
            "status": 403,
            "detail": "No user"
        });
        return
    }
    const statSales = await getStat()


    res.json({
        statSales,

    })
})

export default api;