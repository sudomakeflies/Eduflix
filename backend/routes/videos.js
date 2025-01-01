const express = require('express');
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const router = express.Router();

const rootPath = path.join(__dirname, '..');
const streamsPath = path.join(rootPath, 'hls', 'streams');

// Define the base IP address
const baseIP = process.env.BASE_IP;

router.get('/', (req, res) => {
  fs.readdir(streamsPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error reading streams directory:', err);
      return res.status(500).json({ error: `Error reading streams directory: ${err.message}` });
    }
    console.log('Directory read successfully, files:', files);
    const playlists = files
      .filter((file) => file.isFile() && path.extname(file.name) === '.m3u8')
      .map((file) => ({
        name: path.basename(file.name, path.extname(file.name)),
        url: `${baseIP}/hls/streams/${file.name}`, // Add the base IP to the URL
      }));

    res.json(playlists);
  });
});

router.get('/qr_code', (req, res) => {
  fs.readdir(streamsPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error reading streams directory:', err);
      return res.status(500).json({ error: `Error reading streams directory: ${err.message}` });
    }

    const playlists = files
      .filter((file) => file.isFile() && path.extname(file.name) === '.m3u8')
      .map((file) => ({
        name: path.basename(file.name, path.extname(file.name)),
        url: `${baseIP}/hls/streams/${file.name}`,
      }));

    // Generate QR codes for each playlist
    const playlistsWithQR = [];

    playlists.forEach((playlist) => {
      QRCode.toDataURL(playlist.url, (err, qrCode) => {
        if (err) {
          console.error('Error generating QR code:', err);
          return res.status(500).json({ error: `Error generating QR code: ${err.message}` });
        }

        playlistsWithQR.push({ ...playlist, qrCode });

        // If all QR codes have been generated, render them in HTML
        if (playlistsWithQR.length === playlists.length) {
          const htmlResponse = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>QR Codes</title>
            </head>
            <body>
              <h1>QR Codes for Playlists</h1>
              ${playlistsWithQR.map(playlist => `
                <div>
                  <h2>${playlist.name}</h2>
                  <img src="${playlist.qrCode}" alt="${playlist.name} QR Code">
                </div>
              `).join('')}
            </body>
            </html>
          `;
          res.send(htmlResponse);
        }
      });
    });
  });
});

module.exports = router;
