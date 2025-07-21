import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors()); 

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.GOOGLE_CLOUD_API_KEY;

app.get("/api/youtube", async (req, res) => {
    const {lat, lng, radius} = req.query;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&location=${lat},${lng}&locationRadius=${radius}km&maxResults=12&type=video&key=${API_KEY}`;
    console.log(url);

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch(err) {
        console.error(err.response? err.response.data : undefined || err.message);
        res.status(500).json({error: "YouTube API request failed"})
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})