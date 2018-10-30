var port= process.env.PORT||3000;
var path= require('path');
var express= require('express');
var app=express();
var http = require('http');
app.use(express.static(path.join(__dirname,'home')));
var Request = require("request");
 app.get("/getDetails", (req, res, next) => {
     console.log("hi");
   var url='http://api.walmartlabs.com/v1/search?apiKey=bwwkxupm3s275sdcnb42bekg&query='+req.query.searchTerm;
    Request.get(url,(error,response,body)=>{
        if(error){
            console.log(error);
        }
        console.log(JSON.parse(body));
        res.send(JSON.parse(body));
    });
});
app.listen(port);