#!/usr/bin/env node
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const videoPath = process.argv[2];
const outputDir = process.argv[3];

if (!videoPath || !outputDir) {
  console.error('Usage: video_converter.js <video_path> <output_dir>');
  process.exit(1);
}

const createOutputDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

const generateHLS = async (videoPath, outputDir) => {
    createOutputDir(outputDir);
    const baseName = path.basename(videoPath, path.extname(videoPath));
    const output480p = path.join(outputDir, '480p');
    const output360p = path.join(outputDir, '360p');
    createOutputDir(output480p);
    createOutputDir(output360p);

    const hlsMasterPlaylistPath = path.join(outputDir, 'index.m3u8');

    const ffmpegCommand = `ffmpeg -i ${videoPath} \\\\n    -vf \\"scale=854:480\\" -c:v libx264 -preset veryfast -hls_time 10 -hls_list_size 0 -hls_segment_filename ${output480p}/segment%03d.ts ${output480p}/index.m3u8 \\\\n    -vf \\"scale=640:360\\" -c:v libx264 -preset veryfast -hls_time 10 -hls_list_size 0 -hls_segment_filename ${output360p}/segment%03d.ts ${output360p}/index.m3u8 \\\\n    -f hls -hls_time 10 -hls_playlist_type vod -master_pl_name index.m3u8 \\\\n    -var_stream_map \\"v:0,a:0 v:1,a:0\\" ${hlsMasterPlaylistPath}`.replace(/`/g, '\\`').replace(/\$/g, '\\$').replace(/\{/g, '\\{').replace(/\}/g, '\\}');

    return new Promise((resolve, reject) => {
        exec(ffmpegCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(\`Error converting video: \${error.message}\`);
                reject(error);
                return;
            }
            if (stderr) {
                console.error(\`ffmpeg stderr: \${stderr}\`);
            }
            console.log(\`Video converted successfully to HLS: \${outputDir}\`);
            resolve();
        });
    });
};

generateHLS(videoPath, outputDir).catch(error => {
    console.error('Error during HLS conversion:', error);
    process.exit(1);
});
