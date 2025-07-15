import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { API_KEY } from '../services/api';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const defaultCenter = {
    lat: 43.6532,
    lng: -79.3832,
};

function MapWithClick({clickedCoords, setClickedCoords}) {

    const { isLoaded, errorCode } = useJsApiLoader({
        googleMapsApiKey: API_KEY // Replace with your key
    });

    const handleClick = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setClickedCoords({ lat, lng });
        console.log('Clicked coordinates:', lat, lng);
    }

    return (

        <>
            {errorCode && <p>`Error with loading Google Maps: ${errorCode}`</p>}
            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={defaultCenter}
                    zoom={5}
                    onClick={handleClick}
                >
                    {clickedCoords && <Marker position={clickedCoords} />}
                </GoogleMap>
            ) : <p>Loading Map...</p>}
        </>


    )


}

export default MapWithClick;
