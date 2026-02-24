const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.text({ limit: "10mb" }));

let latestImage = null;

// POST endpoint to receive image
app.post("/image", (req, res) => {
    console.log("POST received, length:", req.body.length);
    latestImage = Buffer.from(req.body.split(",")[1], "base64");
    res.sendStatus(200);
});

// GET endpoint to serve the latest image
app.get("/image.jpg", (req, res) => {
    if (!latestImage) return res.status(404).send("No image yet");
    res.writeHead(200, {
        "Content-Type": "image/jpeg",
        "Content-Length": latestImage.length,
    });
    res.end(latestImage);
});

app.listen(process.env.PORT || 5000, () =>
    console.log("Image server running on port 5000")
);