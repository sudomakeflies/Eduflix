import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './VideoPlayer.css'; // Archivo CSS para estilos personalizados

const VideoPlayer = ({ videoUrl }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const initializePlayer = () => {
      if (!videoRef.current) {
        console.warn('Video element is not part of the DOM');
        return;
      }

      if (playerRef.current) {
        playerRef.current.dispose();
      }

      const options = {
        controls: true,
        preload: 'auto',
        responsive: true, // Habilitar diseño responsivo
        fluid: true,      // Ajustar el reproductor al contenedor padre
        playbackRates: [0.5, 1, 1.5, 2], // Velocidades de reproducción
        controlBar: {
          volumePanel: { inline: false }, // Control de volumen desplegable
        },
        sources: [
          {
            src: videoUrl,
            type: 'application/x-mpegURL',
          },
        ],
      };

      playerRef.current = videojs(videoRef.current, options);
    };

    const timeoutId = setTimeout(initializePlayer, 0);

    return () => {
      clearTimeout(timeoutId);
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [videoUrl]);

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        className="video-js vjs-custom-skin"
        playsInline
      />
    </div>
  );
};

export default VideoPlayer;