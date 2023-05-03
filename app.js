const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req,res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    console.log(firstName, lastName, email);

    var listId = 'cae6ff54d2';
   
    axios.post(
        'https://us21.api.mailchimp.com/3.0/lists/'+listId+'?skip_merge_validation=false&skip_duplicate_check=false',
        {
            "members": [
                {
                    "email_address": email,
                    "status":"subscribed",
                    "merge_fields": {
                        "FNAME": firstName,
                        "LNAME": lastName
                    }
                }
            ],
            "sync_tags": false,
            "update_existing": false
        },
        {
            headers: {
              'Content-Type': 'application/json'
            },
            auth: {
                username: "random",
                password: 'dcb6e3d48dc1eb92c592dd2da6e7ed66-us21'
              }
          }
    ).then(function (response) {
        // handle success
        console.log(response);
        res.sendFile(__dirname +"/success.html" );

      })
      .catch(function (error) {
        // handle error
        console.log("error ayo")
        console.log(error);
        res.sendFile(__dirname + "/failure.html");
        
      })
      .finally(function () {
        // always executed
      });

});

app.post("/failure" , function(req,res){
    res.redirect("/")
});


app.listen(3000, function(){
    console.log("Server is running on port 3000");
});



//API key:dcb6e3d48dc1eb92c592dd2da6e7ed66-us21
//List id or audience id:cae6ff54d2