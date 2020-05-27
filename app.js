const express = require("express");
const bodyparser = require("body-parser");
const request  =require("request");
const https=require("https");


const app=express();
//all static files like images and local files
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));


app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const firstname=req.body.fname;
  const lastname=req.body.lname;
  const email=req.body.email;

  var data={
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME:firstname,
          LNAME:lastname
        }
      }
   ]
 };

 var jsondata=JSON.stringify(data);
const url="https://us18.api.mailchimp.com/3.0/lists/8c729dbed7"
const options={
  method:"POST",
  auth:"kshitij:52bf821e3f3d0bcc5b6b68539f4ed834-us18"
}
 const request = https.request(url,options,function(response){

   if(response.statusCode===200)
   {res.sendFile(__dirname+"/success.html");}
   else
   {res.sendFile(__dirname+"/failure.html");}

   response.on("data",function(data){
     console.log(JSON.parse(data));
   })

 });

 request.write(jsondata);
 request.end();

});


app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
  console.log("Server running on port 3000");
});


//api key mailchimp
//52bf821e3f3d0bcc5b6b68539f4ed834-us18
//unique list id
//8c729dbed7
