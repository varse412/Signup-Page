const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const https=require('https');
const { request } = require('http');
const res = require('express/lib/response');
// const request=require('request');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    console.log("on route");
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
      const firstName=req.body.first;
      const lastName=req.body.last;
      const email=req.body.email;
      console.log(firstName,lastName,email);
      const data={
          members: [
              {
                email_address:email,
                status: "subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
              }
          ]
      };
      const jsonData=JSON.stringify(data);
      const url="https://us14.api.mailchimp.com/3.0/lists/e1546f63d1";
      const option={
          method:"POST",
          auth:"varunContacts:2cd5913c3e0beaac40b6ba8bb62cf782-us14"
      };
     const request= https.request(url,option,function(response){
        
         if(response.statusCode===200){
             res.sendFile(__dirname+"/sucess.html");
         }else{
             res.sendFile(__dirname+"/failure.html");
         }
          response.on("data",function(data){
              console.log(JSON.parse(data));
          });
      });
      request.write(jsonData);
      request.end();
});

app.post("/failure",function(req,res){
    console.log("hi");
    res.redirect("/");
});

app.listen(process.env.PORT||"3000",function(){
    console.log("Serving on port 3000");
});


//API key
// 2cd5913c3e0beaac40b6ba8bb62cf782-us14
//Audience id/list id
// e1546f63d1

//https://us14.api.mailchimp.com/3.0/lists/e1546f63d1

