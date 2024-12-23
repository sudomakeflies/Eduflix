  const express = require('express');
const router = express.Router();
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', '..', 'hls', 'videos'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const rootPath = path.join(__dirname, '..', '..');

router.get('/', (req, res) => {
    const videos = [
        {
            name: 'stream_360p',
            url: '/hls/streams/stream_360p/360p.m3u8',
        },
        {
            name: 'stream_480p',
            url: '/hls/streams/stream_480p/480p.m3u8',
        },
    ];
    res.json(videos);
});

router.post('/', upload.single('video'), (req, res) => {
  const videoPath = path.join(__dirname, '..', '..', 'hls', 'videos', req.file.filename);
  const videoName = path.basename(req.file.filename, path.extname(req.file.filename));
    const hlsPath = `hls/playlists/${videoName}`;
  const m3u8Path = `${hlsPath}/index.m3u8`;

  fs.mkdir(hlsPath, { recursive: true }, (err) => {
    if (err) {
      console.error('Error creating directory:', err);
      return res.status(500).json({ error: `Error creating directory: ${err.message}` });
    }
    ffmpeg(videoPath)
    .outputOptions([
      '-hls_time 10',
      '-hls_list_size 0',
      '-hls_segment_filename', `${hlsPath}/segment%03d.ts`,
    ])
    .output(m3u8Path)
    .on('end', () => {
      res.json({
        message: 'Video uploaded and processed successfully',
        hlsUrl: `/hls/playlists/${videoName}/index.m3u8`,
      });
    })
    .on('error', (err) => {
      console.error('Error processing video:', err);
      res.status(500).json({ error: `Error processing video: ${err.message}` });
    })
    .run();
  });
});

router.delete('/:id', (req, res) => {
  const videoId = req.params.id;
  const hlsPath = `hls/playlists/${videoId}`;

  fs.rm(hlsPath, { recursive: true }, (err) => {
    if (err) {
      console.error('Error deleting video:', err);
      return res.status(500).json({ error: 'Error deleting video' });
    }
    res.json({ message: 'Video deleted successfully' });
  });
});

module.exports = router;
