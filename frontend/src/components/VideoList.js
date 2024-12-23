import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VideoList() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/videos')
      .then(response => {
        setVideos(response.data);
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
      });
  }, []);

  return (
    <div>
      <h2>Video List</h2>
      <ul>
        {videos.map(video => (
          <li key={video.name}>
            {video.name} - <a href={video.url}>Play</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VideoList;
