function YouTubeVideoEmbed({ videoId }) {
    return (
        <div className="video-item-wrapper">
            <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}

export default YouTubeVideoEmbed;