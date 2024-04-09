import express  from "express";
import bodyParser  from "body-parser";
import request  from 'request-promise';
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import connectToDatabase from "./connection.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "veiws"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

const logrequest= (req,res,next)=>{
    console.log(`${new Date().toLocaleString()} Request made to ${req.originalUrl}`);
    next();
}
app.listen(5000, function () {
    console.log(__dirname);
});
app.use(logrequest);
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/about.html",function(req,res){
    res.sendFile(__dirname + "/adout.html");
});

app.get("/contact.html",function(req,res){
    res.sendFile(__dirname + "/contact.html");
});

app.post("/contactres", async function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;
    const db = await connectToDatabase();
    const collection = db.collection("contact");
    collection.insertOne({ "Name": name, "Email": email, "Message": message });
    //redirect to home page after successful submission?
    res.redirect('/');
})

app.post("/find-train-between", async function (req, res) {
    try {
        let num1 = req.body.from;
        let num2 = req.body.to;
        let options = {
            method: 'GET',
            uri: `https://api.railwayapi.site/api/v1/trainsBtwStations?fromStation=${num1}&toStation=${num2}&allTrains=true`,
            json: true,
        };
        const response = await request(options);
        const trainDetails = response.data; 
        console.log(trainDetails)
        res.render("train_between", { trainDetails });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/trainno_search", async function (req, res) {
    try {
        let trainNumbers = req.body.pnr;
        let options = {
            method: 'GET',
            uri: `https://api.railwayapi.site/api/v1/schedules/${trainNumbers}?fullSchedule=true`,
            json: true,
        };

        const response1 = await request(options);

        const trainData = {};
        trainData['response1']    = response1.data[0];

        options = {
            method: 'GET',
            uri: `https://api.railwayapi.site/api/v1/trains/${trainNumbers}`,
            json: true,
        };

        const response2 = await request(options);
        trainData['response2']    = response2.data[0];
        console.log(trainData)
        res.render("trainno", { trainData });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

});

app.get("/trainno_search", async function (req, res) {
    try {
        let trainNumbers = req.query.trainno;
        let options = {
            method: 'GET',
            uri: `https://api.railwayapi.site/api/v1/schedules/${trainNumbers}?fullSchedule=true`,
            json: true,
        };

        const response1 = await request(options);

        const trainData = {};
        trainData['response1']    = response1.data[0];

        options = {
            method: 'GET',
            uri: `https://api.railwayapi.site/api/v1/trains/${trainNumbers}`,
            json: true,
        };

        const response2 = await request(options);
        trainData['response2']    = response2.data[0];
        console.log(trainData)
        res.render("trainno", { trainData });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});








