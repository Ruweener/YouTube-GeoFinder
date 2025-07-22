import React, { useEffect, useMemo, useState } from "react";
import { fetchYouTubeVideosByLocation } from './services/api';
import "./css/App.css"
import MapComponent from './components/MapComponent';
import DiscreteSlider from "./components/Slider";
import YouTubeVideoEmbed from "./components/YouTubeVideoEmbed";
import logo from "./assets/logo.png";
import { FaArrowPointer, FaLocationArrow, FaYoutube, FaGithub} from "react-icons/fa6";



function App() {
	const [videoIds, setVideoIds] = useState([]);
	const [radius, setRadius] = useState(0);
	const [clickedCoords, setClickedCoords] = useState({ lat: 43.6532, lng: -79.3832 }) //default coordinates (toronto, ON CA)
	const [videoMessage, setVideoMessage] = useState("");

	const videoList = useMemo(() => (
		<div className="video-list">
			{videoIds.map((videoId, id) => {
				return <YouTubeVideoEmbed videoId={videoId} key={id} />
			})}
		</div>

	), [videoIds]);

	useEffect(() => {
		setVideoMessage(`${videoIds.length} Videos Found `)
	}, [videoIds])

	useEffect(() => {
		setVideoMessage("Click search to see results");
	}, [])

	async function loadFetchedVideos() {
		const data = await fetchYouTubeVideosByLocation(clickedCoords.lat, clickedCoords.lng, radius);
		if (data && data.items) {
			setVideoIds(data.items.map(video => video.id.videoId));
		} else {
			setVideoMessage("No Videos Found")
		}
	}

	const handleSearchClick = () => {
		loadFetchedVideos();
	}

	return (
		<div className="app">

			<h1 className="Title">YouTube GeoFinder</h1>
			<img className="logo" src={logo} alt="logo" />
			<p className="description">Explore the YouTube landscape from around the world!</p>
			

			<div className="input-container">
				<div className="map-container">
					<h3 className="map-message">Click Map to Select Location {<FaArrowPointer />}</h3>
					<MapComponent clickedCoords={clickedCoords} setClickedCoords={setClickedCoords} radius={radius} />
				</div>

				<div className="radius-slider-container">
					<h3>{`Search Radius: ${radius}km`}</h3>
					<DiscreteSlider value={radius} setValue={setRadius} />
				</div>

				<button className="search-button" onClick={handleSearchClick}>Search {<FaLocationArrow />} </button>
			</div>

			<div className="video-container">
				<h2 className="video-message">{videoMessage} <FaYoutube /></h2>
				{videoIds.length > 0 && videoList}
			</div>
			
			<footer className="footer">
				<a href="https://github.com/Ruweener/YouTube-GeoFinder" target="_blank" rel="noopener noreferrer">
				<button className="github-button">View on GitHub {<FaGithub />}</button>
				</a>
				<p>© 2025 Ruween M. All Rights Reserved.</p>
			</footer>
		</div>
		
	);


}

export default App;