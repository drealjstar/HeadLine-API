const express = require('express');
const Cors = require('cors')
const request = require('request');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(Cors());

app.get("/", (req, res) => {
   return res.json({
        message: 'Welcome to Headline news'
    });
});

app.get('/news/:country',  (req, res) => {
      const code = req.params.country;
    request(`https://newsapi.org/v2/top-headlines?country=${code}&apiKey=${process.env.API_KEY}`,  (error, response, data) => {
        if(error) {
            // If there is an error, tell the user 
            res.send('An erorr occured', error)
        }
        // Otherwise do something with the API data and send a response
        else {
            res.send({
                data  : JSON.parse(data)          })
        }
    });
});

app.listen(port, () => console.log(`application running on port ${port}`))
