export const API_KEY = import.meta.env.VITE_GOOGLE_CLOUD_API_KEY;

export const fetchYouTubeVideosByLocation = async (lat, lng, radius) => {
    const maxResults = 12;

    const url = `/api/youtube?lat=${lat}&lng=${lng}&radius=${radius}`;
    

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            console.log(`Videos found:`, data.items);
            return data;
        } else {
            console.log('No video found for this location');
            return data;
        }
    } catch (err) {
        console.error(err);
    }
}