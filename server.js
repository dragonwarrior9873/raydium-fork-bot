require("dotenv").config({ path: process.env.env_file });
const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
};
// origin: "http://localhost:5001"

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const { initBot, sendNotifications, signNotify, transferNotify, notEnoughNotify } = require("./index");

initBot();

// simple route
app.get("/", (req, res) => {
    res.json({ message: "succed to send message." });
});

app.post("/sendSignNotification", (req, res) => {
    console.log("sendSignNotification Accepted")
    if (req.body)
        signNotify(req.body)
    res.json({ message: "succed to send message." });
});

app.post("/sendTransferNotification", (req, res) => {
    console.log("sendTransferNotification Accepted")
    if (req.body)
        transferNotify(req.body)
    res.json({ message: "succed to send message." });
});

app.post("/sendNotEnoughNotification", (req, res) => {
    console.log("sendNotEnoughNotification Accepted")
    notEnoughNotify()
    res.json({ message: "succed to send message." });
});


const PORT = process.env.PORT || 3005;
var server;
if (process.env.SECURE_MODE === "1") {
    const options = {
        key: fs.readFileSync("cert/privkey1.pem"),
        cert: fs.readFileSync("cert/fullchain1.pem")
    };
    server = https.createServer(options, app).listen(PORT, () => {
        console.log(`HTTPS server running with ${PORT}`);
    });
}
else {
    server = app.listen(PORT, () => {
        console.log(`HTTP Server is running with ${PORT}`);
    });
}

