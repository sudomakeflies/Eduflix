#!/bin/bash

# Definir rutas base
INPUT_DIR="hls/videos"
OUTPUT_DIR="hls/streams"

# Crear directorios para los diferentes streams
mkdir -p "$OUTPUT_DIR/stream_480p" "$OUTPUT_DIR/stream_360p"

# Convertir video a 480p
ffmpeg -i "$INPUT_DIR/input.mp4" \
    -vf "scale=-2:480" \
    -c:v h264 -profile:v main -crf 20 -sc_threshold 0 \
    -g 48 -keyint_min 48 \
    -b:v 2500k -maxrate 2675k -bufsize 3750k \
    -c:a aac -b:a 128k \
    -hls_time 4 \
    -hls_playlist_type vod \
    -hls_segment_filename "$OUTPUT_DIR/stream_480p/480p_%03d.ts" \
    "$OUTPUT_DIR/stream_480p/480p.m3u8"

# Convertir video a 360p
ffmpeg -i "$INPUT_DIR/input.mp4" \
    -vf "scale=-2:360" \
    -c:v h264 -profile:v main -crf 20 -sc_threshold 0 \
    -g 48 -keyint_min 48 \
    -b:v 1500k -maxrate 1600k -bufsize 2250k \
    -c:a aac -b:a 128k \
    -hls_time 4 \
    -hls_playlist_type vod \
    -hls_segment_filename "$OUTPUT_DIR/stream_360p/360p_%03d.ts" \
    "$OUTPUT_DIR/stream_360p/360p.m3u8"

# Crear playlist master
cat > "$OUTPUT_DIR/master.m3u8" << EOF
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-STREAM-INF:BANDWIDTH=2628000,RESOLUTION=854x480
stream_480p/480p.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=1628000,RESOLUTION=640x360
stream_360p/360p.m3u8
EOF

echo "Conversión completada. Los archivos HLS se han generado en los directorios $OUTPUT_DIR/stream_480p y $OUTPUT_DIR/stream_360p"
