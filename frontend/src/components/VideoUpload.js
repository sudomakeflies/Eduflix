import React, { useState } from 'react';
import axios from 'axios';

function VideoUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('video', selectedFile);

    axios.post('http://localhost:3000/videos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        alert('Video uploaded successfully');
      })
      .catch(error => {
        console.error('Error uploading video:', error);
        alert('Error uploading video');
      });
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default VideoUpload;
