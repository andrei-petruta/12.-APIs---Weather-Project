const express = require("express");
const https = require("https");

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {

    const city = req.body.cityName;
    const apiKey = "246c8a7f1d251a0543d8ccfeb07f95e5";
    const unit = "metric";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

    https.get(url, function(response){
        
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = Math.round(Number(weatherData.main.temp));
            const weatherDescription = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            res.write(`<h1>The temperature in ${city} is ${temp} degrees Celsius.</h1>`);
            res.write(`<h2>Current conditions: ${weatherDescription}</h2>`);
            res.write(`<img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png"></img>`);
            res.send();
        })
    })
})



app.listen(3000, function() {
    console.log("Server is running on port 3000!");
})