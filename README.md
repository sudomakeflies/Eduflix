# 🎬 Eduflix: Educational Streaming Platform 🚀

Eduflix is a robust educational streaming application designed for environments with limited resources and intermittent internet connectivity. It provides a seamless video streaming experience, optimized for offline access and local network usage.

## 🌟 Key Features

-   **Offline-First Design:** 📴 Access educational content even without a stable internet connection.
-   **Adaptive Streaming:** ⚙️ Dynamically adjusts video quality (480p/360p) to ensure smooth playback on various devices and network conditions.
-   **Local Network Focus:** 🌐 Optimized for local network environments, ideal for educational institutions with limited bandwidth.
-   **Scalable Backend:** ⚙️ Built with Node.js, NGINX, and FFmpeg to efficiently manage and serve video content.
-   **Progressive Web App (PWA):** 📱 Frontend developed in React, providing a native-like app experience accessible through web browsers.
-   **Concurrent User Support:** 🧑‍🤝‍🧑 Supports up to 20 simultaneous users, making it suitable for small to medium-sized classrooms.
-   **HLS Video Format:** 📹 Utilizes HTTP Live Streaming (HLS) for reliable and adaptive video delivery.
-   **Simplified Deployment:** 🐳 Easy to deploy using Docker and Docker Compose.

## 🛠️ Tech Stack

-   **Backend:** Node.js ⚙️
-   **Web Server:** NGINX 🌐
-   **Video Processing:** FFmpeg 📹
-   **Frontend:** React ⚛️ (PWA)
-   **Containerization:** Docker 🐳 and Docker Compose

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone [repository-url]
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd Eduflix
    ```
3.  **Build and run the application using Docker Compose:**
    ```bash
    docker-compose up -d
    ```
4.  **Access the application:** Open your web browser and navigate to the specified address.

## 📝 Notes

-   Ensure Docker and Docker Compose are installed on your system.
-   The application is designed to handle up to 20 concurrent users.
-   Video quality will adapt based on network conditions and device capabilities.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to discuss improvements or report bugs.

## 📜 License

[License information]
