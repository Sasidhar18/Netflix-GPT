const VideoTitle = ({ title, overview }) => {
  return (
    <div className="video-title">
      <h1>{title}</h1>
      <p>{overview}</p>
      <div className="video-buttons">
        <button className="play-btn">▶️ Play</button>
        <button className="info-btn">More Info</button>
      </div>
    </div>
  );
};

export default VideoTitle;
