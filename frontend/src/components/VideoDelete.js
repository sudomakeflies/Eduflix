import React, { useState } from 'react';
import axios from 'axios';

function VideoDelete() {
  const [videoId, setVideoId] = useState('');

  const handleDelete = () => {
    if (!videoId) {
      alert('Please enter a video ID');
      return;
    }

    axios.delete(`/videos/${videoId}`)
      .then(response => {
        alert('Video deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting video:', error);
        alert('Error deleting video');
      });
  };

  return (
    <div>
      <h2>Delete Video</h2>
      <input
        type="text"
        placeholder="Enter video ID"
        value={videoId}
        onChange={(e) => setVideoId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default VideoDelete;
