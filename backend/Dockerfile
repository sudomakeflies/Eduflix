FROM node:16

# Instalar FFmpeg
RUN apt-get update && apt-get install -y ffmpeg

# Crear directorios y copiar archivos de la app
WORKDIR /app/backend
COPY ./backend /app/backend

# Instalar dependencias
RUN npm install

# Exponer puerto
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]
