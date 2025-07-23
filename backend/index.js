import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import path, {dirname} from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();
const app = express();
app.use(cors({origin: "*"})); 
app.use(express.static(path.join(__dirname, "../frontend/dist")));

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.GOOGLE_CLOUD_API_KEY;

app.get("/api/youtube:lat,:lng,:radius", async (req, res) => {
    const maxResults = 12;
    const {lat, lng, radius} = req.params;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&location=${lat},${lng}&locationRadius=${radius}km&maxResults=${maxResults}&type=video&key=${API_KEY}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch(err) {
        console.error(err.response? err.response.data : undefined || err.message);
        res.status(500).json({error: "YouTube API request failed"})
    }
});

// app.get("/*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
// })


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})