# Stage 1: Build the frontend
FROM node:16-alpine AS builder
WORKDIR /app/frontend
# Add cache layer for node_modules
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
# Add build arguments and environment variables
ARG BASE_IP
ENV BASE_IP=$BASE_IP
ENV REACT_APP_BASE_IP=$BASE_IP
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine
# Copy nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf
# Copy built frontend files from builder stage
COPY --from=builder /app/frontend/build /usr/share/nginx/html
# Expose port 80
EXPOSE 80