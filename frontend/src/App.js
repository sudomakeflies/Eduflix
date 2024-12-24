import React, { useState } from 'react';
import './App.css';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';

function App() {
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

  const handleSelectVideo = (url) => {
    setSelectedVideoUrl(url);
  };

  return (
    <div className="App">
      <h1>Eduflix</h1>
      <VideoList onSelectVideo={handleSelectVideo} />
      {selectedVideoUrl && <VideoPlayer videoUrl={selectedVideoUrl} />}
    </div>
  );
}

export default App;
