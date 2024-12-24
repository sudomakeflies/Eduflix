#!/bin/bash

#ej. desde la raiz del proyecto ejecutar (debe existir hls/videos/diegoenlaNasa.mp4): ./convert_to_hls.sh diegoenlaNasa
# Verificar que se proporcione un parámetro de entrada
if [ -z "$1" ]; then
    echo "Uso: $0 <nombre_video>"
    exit 1
fi

# Definir el nombre del video de entrada
INPUT_VIDEO="$1"

# Definir rutas base
INPUT_DIR="hls/videos"
OUTPUT_DIR="hls/streams"

# Crear directorios de salida dinámicos basados en el nombre del video
OUTPUT_480P="$OUTPUT_DIR/${INPUT_VIDEO}_stream_480p"
OUTPUT_360P="$OUTPUT_DIR/${INPUT_VIDEO}_stream_360p"

mkdir -p "$OUTPUT_480P" "$OUTPUT_360P"

# Convertir video a 480p
ffmpeg -i "$INPUT_DIR/${INPUT_VIDEO}.mp4" \
    -vf "scale=-2:480" \
    -c:v h264 -profile:v main -crf 20 -sc_threshold 0 \
    -g 48 -keyint_min 48 \
    -b:v 2500k -maxrate 2675k -bufsize 3750k \
    -c:a aac -b:a 128k \
    -hls_time 4 \
    -hls_playlist_type vod \
    -hls_segment_filename "$OUTPUT_480P/${INPUT_VIDEO}_480p_%03d.ts" \
    "$OUTPUT_480P/${INPUT_VIDEO}_480p.m3u8"

# Convertir video a 360p
ffmpeg -i "$INPUT_DIR/${INPUT_VIDEO}.mp4" \
    -vf "scale=-2:360" \
    -c:v h264 -profile:v main -crf 20 -sc_threshold 0 \
    -g 48 -keyint_min 48 \
    -b:v 1500k -maxrate 1600k -bufsize 2250k \
    -c:a aac -b:a 128k \
    -hls_time 4 \
    -hls_playlist_type vod \
    -hls_segment_filename "$OUTPUT_360P/${INPUT_VIDEO}_360p_%03d.ts" \
    "$OUTPUT_360P/${INPUT_VIDEO}_360p.m3u8"

# Crear playlist master
cat > "$OUTPUT_DIR/${INPUT_VIDEO}_master.m3u8" << EOF
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-STREAM-INF:BANDWIDTH=2628000,RESOLUTION=854x480
${INPUT_VIDEO}_stream_480p/${INPUT_VIDEO}_480p.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=1628000,RESOLUTION=640x360
${INPUT_VIDEO}_stream_360p/${INPUT_VIDEO}_360p.m3u8
EOF

echo "Conversión completada. Los archivos HLS se han generado en los directorios:"
echo "- $OUTPUT_480P"
echo "- $OUTPUT_360P"