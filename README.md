# YouTube GeoFinder

Explore the YouTube landscape from around the world.

**Badges**: ![CI](https://github.com/OWNER/REPO/actions/workflows/ci.yml/badge.svg)  

**Overview**
- Explore YouTube videos geographically — search and browse videos by location, view embedded players, and preview results on an interactive map.

**Installation**
Clone the repository and install dependencies for both services.

```bash
git clone https://github.com/OWNER/REPO.git
cd youtube-geofinder
cd frontend
npm install
cd ../backend
npm install
```

**Run / Development**
Run frontend and backend in separate terminals.

Frontend (development):
```bash
cd frontend
npm run dev
```

Backend (development):
```bash
cd backend
npm run dev
```

**Environment variables**
- Create a `.env` file in `frontend/` and `backend/` as needed. Do NOT commit secrets.
- Required (examples):
	- VITE_GOOGLE_CLOUD_API_KEY=YOUR_GOOGLE_API_KEY
	- PORT=3001
	- GOOGLE_CLOUD_API_KEY=YOUR_GOOGLE_API_KEY

Store real API keys only in local `.env` files or secret managers. This repo's `frontend/.env` currently contains an API key — remove it before publishing or rotate the key if it was accidentally exposed.

**Usage / Examples**
- Open the frontend dev URL shown by Vite (typically http://localhost:5173) and use the search/slider controls to explore videos by region.

**License**
This project is licensed under the MIT License.

