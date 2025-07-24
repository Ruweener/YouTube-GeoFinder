import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import path, {dirname} from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();
const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
};

app.use(cors(corsOptions)); 

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.GOOGLE_CLOUD_API_KEY;

app.get("/api/youtube", async (req, res) => {
    const {lat, lng, radius, maxResults = 12} = req.query;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&location=${lat},${lng}&locationRadius=${radius}km&maxResults=${maxResults}&type=video&key=${API_KEY}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch(error) {
        console.error("Error fetching from YouTube API:", error.response ? error.response.data : error.message);
        res.status(500).json({error: "YouTube API request failed"})
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})