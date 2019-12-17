const express=require("express");
const bodyParser=require("body-parser");
var request = require('request');

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req, res){
    var crypto=req.body.crypto;
    var fiat=req.body.fiat;
    var amount=req.body.amount;
  
    var options={
      url:"https://apiv2.bitcoinaverage.com/convert/global",
      method:"GET",
      qs:{
          from:crypto,
          to: fiat,
          amount:amount
      }
    }
   request(options, function (error, response, body) {
   
   
    var data=JSON.parse(body);
   var price=data.price;
   console.log(price);
   var currentDate=data.time;
   res.write(`<h1>The current date is ${currentDate}`);
   res.write(`<h1>${amount} ${crypto} is ${price} ${fiat}</h1>`)
   res.send();
   console.log(price);
   
}); 
})
app.listen(3000, function(){
console.log("server is running on port 3000.");
})

