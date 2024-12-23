import React from 'react';
import VideoList from './components/VideoList';
import VideoUpload from './components/VideoUpload';

function App() {
  return (
    <div>
      
        <h1>Video Streaming Dashboard</h1>
        <VideoUpload />
        <VideoList />
      
    </div>
  );
}

export default App;
