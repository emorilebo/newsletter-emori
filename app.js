const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed", 
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);

    const url = "https://us1.api.mailchimp.com/3.0/lists/c692795ec6"

    const options = {
        method: "POST",
        auth: "emori1:302db5c0d7dce9ab75e94227bb2aea83-us1"
    }

    const request = https.request(url, options, (response)=> {

        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }else{
            res.send(__dirname + "/failure.html");
        }

        response.on('data', function (data) {
            console.log(JSON.parse(data))
        })
    })
    //request.write(jsonData)
    request.end()
})

app.post('/failure',(req, res)=>{
    res.redirect('/')
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port 3000`);
});


//API KEY 302db5c0d7dce9ab75e94227bb2aea83-us1

//List Id c692795ec6