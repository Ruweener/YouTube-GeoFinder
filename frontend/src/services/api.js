
export const fetchYouTubeVideosByLocation = async (lat, lng, radius) => {
    const maxResults = 12;
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';

    const url = `${apiBaseUrl}/api/youtube?lat=${lat}&lng=${lng}&radius=${radius}`;
    

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