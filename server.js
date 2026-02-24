const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let latestImage = null;

app.use(bodyParser.text({ limit: "10mb" }));

// Receive image from iPhone/React
app.post("/image", (req, res) => {
    console.log("POST received!");
    console.log("Body length:", req.body.length);
    latestImage = Buffer.from(req.body.split(",")[1], "base64");
    res.sendStatus(200);
});

// Serve the latest image
app.get("/image.jpg", (req, res) => {
    if (!latestImage) return res.status(404).send("No image yet");
    res.writeHead(200, {
        "Content-Type": "image/jpeg",
        "Content-Length": latestImage.length,
    });
    res.end(latestImage);
});

app.listen(process.env.PORT || 5000, () =>
    console.log("Image server running")
);