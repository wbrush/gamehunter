const express = require("express")
require("dotenv").config();

const app = express();
const port = process.env.PORT || 9000;

app.listen(port,()=>{
    console.log(`server listening on port ${port}`)
});

app.get("/",(req,res)=>{
    return res.status(200).json({message : "Cloud Run and Cloud Build Demo - CI CD Pipeline"})
})

app.get("/api/v1/healthz",(req,res)=>{
    acceptHeader = req.header('Accept')
    if (acceptHeader.includes('json')) {
        res.status(200).json({status : "Ok"})
    } else if (acceptHeader.includes('plain')) {
        res.set('Content-Type', 'text/html');
        res.status(200).send("Health: Ok");
    } else {
        res.status(412).json({error : "Invalid Accept Header"})
    }
    return
})

app.get("/echo/:text",(req,res)=>{
    const {text}  = req.params;
    return res.status(200).json({message : "Echo Route",data : text})
})