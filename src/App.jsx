import React, { useEffect, useMemo, useState } from "react";
import { fetchYouTubeVideosByLocation } from './services/api';
import "./App.css";
import MapComponent from './components/MapComponent';
import DiscreteSlider from "./components/Slider";

function App() {
	const [videoIds, setVideoIds] = useState([]);
	const [radius, setRadius] = useState(500);
	const [clickedCoords, setClickedCoords] = useState({ lat: 43.6532, lng: -79.3832 }) //default coordinates (toronto, ON CA)

	const videoList = useMemo(() => (
		videoIds.map(videoId => {
			return <YouTubeEmbed videoId={videoId} />
		})
	), [videoIds]);

	async function loadFetchedVideos() {
		const data = await fetchYouTubeVideosByLocation(clickedCoords.lat, clickedCoords.lng);
		if (data && data.items) {
			setVideoIds(data.items.map(video => video.id.videoId));
		}
	}

	function YouTubeEmbed({ videoId }) {
		return (
			<div style={{ margin: '1rem 0' }}>
				<iframe
					width="560"
					height="315"
					src={`https://www.youtube.com/embed/${videoId}`}
					title="YouTube video player"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
			</div>
		);
	}

	const handleSearchClick = () => {
		loadFetchedVideos();
	}

	return (
		<>
			<h1>YouTube GeoFinder</h1>

			<h3>Click on a Location on the map</h3>
			<MapComponent clickedCoords={clickedCoords} setClickedCoords={setClickedCoords} />


			<h3>{`Search Radius: ${radius}km`}</h3>
			<DiscreteSlider value={radius} setValue={setRadius} />

			<button onClick={handleSearchClick}>Search</button>

			{videoList}

		</>

	);


}

export default App;
