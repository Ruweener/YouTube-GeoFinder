import { GoogleMap, useJsApiLoader, Marker, Circle } from '@react-google-maps/api';
import { useState } from 'react';
import { API_KEY } from '../services/api';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const defaultCenter = {
    lat: 43.6532,
    lng: -79.3832,
};

function MapWithClick({ clickedCoords, setClickedCoords, radius = 0 }) {
    const { isLoaded, errorCode } = useJsApiLoader({
        googleMapsApiKey: API_KEY
    });


    const handleClick = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setClickedCoords({ lat, lng });
        console.log(e);
    };

    return (
        <>
            {errorCode && <p>{`Error with loading Google Maps: ${errorCode}`}</p>}
            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={defaultCenter}
                    zoom={5}
                    onClick={handleClick}
                >
                    {clickedCoords && <Marker position={clickedCoords} />}
                    {clickedCoords && (
                        <Circle
                            center={clickedCoords}
                            radius={radius * 1000}
                            options={{
                                fillColor: "#2196f3",
                                fillOpacity: 0.2,
                                strokeColor: "#2196f3",
                                strokeOpacity: 0.5,
                                strokeWeight: 2,
                            }}
                        />
                    )}
                </GoogleMap>
            ) : (
                <p>Loading Map...</p>
            )}
        </>
    );
}

export default MapWithClick;
