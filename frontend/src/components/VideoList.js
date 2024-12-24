import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VideoList.css'; // Archivo CSS para estilos personalizados

const VideoList = ({ onSelectVideo }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://192.168.0.104:3000/videos');
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="video-list-container">
      <h2 className="video-list-title">Videos disponibles</h2>
      <ul className="video-list">
        {videos.map((video) => (
          <li key={video.name} className="video-list-item">
            <button
              className="video-select-button"
              onClick={() => onSelectVideo(video.url)}
            >
              {video.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
