import express from "express"; 
import { addUser, getUser,delUser, findUser,updateUser,addProd, getProd,idProd } from "../database/db.js"; 
 
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
    // console.log(allUsers);
    // allUsers.forEach(user=>{
    //     // console.log(user.name);
    //     // console.log(user.pass);
    //     const id = user.id;
    //     const name = user.name;
    //     const pass = user.pass;
    //     res.json({
    //         "id": id,
    //         "name": name,
    //         "pass": pass
    //     })
    // })
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
    const {login,email,pass} = req.body;
    const newUser = await addUser(login,email,pass)

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
    const {pass} = req.body;
    const resPass = await updateUser(pass,userId)
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






export default api;