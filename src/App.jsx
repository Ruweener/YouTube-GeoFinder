import React, { useEffect, useMemo, useState } from "react";
import { fetchYouTubeVideosByLocation } from './services/api';
import "./App.css";
import MapComponent from './components/MapComponent';
import DiscreteSlider from "./components/Slider";
import YouTubeVideoEmbed from "./components/YouTubeVideoEmbed";

function App() {
	const [videoIds, setVideoIds] = useState([]);
	const [radius, setRadius] = useState(500);
	const [clickedCoords, setClickedCoords] = useState({ lat: 43.6532, lng: -79.3832 }) //default coordinates (toronto, ON CA)

	const videoList = useMemo(() => (
		videoIds.map((videoId, id) => {
			return <YouTubeVideoEmbed videoId={videoId} key={id}/>
		})
	), [videoIds]);

	useEffect(() => {
		console.log(clickedCoords);
	}, [clickedCoords])

	async function loadFetchedVideos() {
		const data = await fetchYouTubeVideosByLocation(clickedCoords.lat, clickedCoords.lng);
		if (data && data.items) {
			setVideoIds(data.items.map(video => video.id.videoId));
		}
	}

	const handleSearchClick = () => {
		loadFetchedVideos();
	}

	return (
		<>
			<h1>YouTube GeoFinder</h1>

			<h3>Click on a Location on the map</h3>
			<MapComponent clickedCoords={clickedCoords} setClickedCoords={setClickedCoords} radius={radius}/>

			<h3>{`Search Radius: ${radius}km`}</h3>
			<DiscreteSlider value={radius} setValue={setRadius} />

			<button onClick={handleSearchClick}>Search</button>

			{videoList}

		</>

	);


}

export default App;
