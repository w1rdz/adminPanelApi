import express from "express"; 
import cors from "cors"; 
import bodyParser from "body-parser"; 
import cookieParser from "cookie-parser"; 

import apiCtrl from "./routes/api.js"
import path from "path"; 
 
const app = express(); 
 
app.use(cors()); 
app.use(bodyParser.json()); 
app.use(cookieParser()); 
app.use(express.urlencoded({ extended: true })); 

app.use(apiCtrl)

 

//response
// app.post("/login", );
// app.post("/users",);
// app.post("/products",);

// app.get("/users",);
// app.get("/products",);
// app.get("/products/{id}",);
// app.get("/orders",);
// app.get("/orders/{id}",);

// app.delete("/users/{id}",);
// app.delete("/products/{id}",);

// app.put("/users/{id}/reset-password",);
// app.put("/product/{id}",);
// app.put("/orders/{id}",)


 
const port = 8800; 
 
app.listen(port, () => { 
    console.log(`Start on port: ${port}`); 
});