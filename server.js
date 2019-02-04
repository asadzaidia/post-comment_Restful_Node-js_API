const express=require('express');//absolute path
require('express-async-errors');
const app=express();
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const morgan=require('morgan');


//body parser middleware injection

app.use(bodyparser.json());
app.use(morgan());

//database connection
require('./mongo');

//Models
require("./models/Post");
require("./models/Comment");

//Routers

app.use('/posts',require ("./routes/postRoute.js"));

//middle ware for errors
//404 router not found error

app.use((req,res,next)=>{
    req.status=404;
    const error=new Error("Routes not found");
    next(error);
});

//error handler
//now error is avaible everywhere
app.use((error,req,res,next)=>{
    res.status(req.status||500).send({

        message:error.message

    });

});

app.listen(3000,()=>{
    console.log("server is running at port 3000");
});
