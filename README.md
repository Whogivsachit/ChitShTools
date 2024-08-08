# ChitShTools

ChitShTools is your go-to hub for a diverse collection of practical tools and scripts designed to simplify everyday tasks. Frustrated by the need to search for and utilize multiple websites for various utilities, I created ChitShTools to provide a comprehensive solution. This platform is free for everyone, forever. Enjoy seamless access to all the tools you need, all in one place.

![ChitShTools Banner](https://cdn.chit.sh/1RQRsUi4JYtBTPCySWMq40uR.png)
![ChitShTools Screenshot](https://cdn.chit.sh/U8WQcSe8Gayewtod1BuhQ5ta.png)

## Features & Tools

- **Free Forever**: ChitShTools is free for everyone, forever. No hidden costs or premium plans.
- **No Registration Required**: Access all tools without the need to create an account.
- **No Ads**: Enjoy an ad-free experience while using ChitShTools.
- **Open Source**: ChitShTools is open-source, allowing you to contribute and improve the platform.
- **API Access**: Utilize the ChitShTools API to integrate tools into your applications and services.
- **[YT/SC] Media Downloader**: Download media from YouTube and SoundCloud with ease.
- **Game Server Information**: Retrieve detailed information about a game server.
- **Discord Embed Sender**: Send rich embeds to Discord with a simple API.
- **SMTP Sender**: Send emails using the SMTP protocol.
- **Gmod Workshop Generator**: Generate a Garry's Mod workshop collection from a list of addons.
- **Url Shortener**: Shorten URLs to save space and track clicks.
- **QR Code Generator**: Generate QR codes for URLs, text, and more.
- **Base64 Encode/Decode**: Encode and decode text using Base64.
- **Json Beautify**: Beautify JSON data for improved readability.
- **Text Diff Checker**: Compare two blocks of text to identify differences.
- **UUID Generator**: Generate unique identifiers.
- **Password Generator**: Generate secure passwords.
- **PDF Converter**: Convert documents to PDF files.
- **Image Converter**: Convert images to different formats.
- **Video Transcoder**: Transcode videos to different formats.
- **Speedtest**: Test your internet connection speed.
- **SSH Client**: Connect to remote servers using SSH.
- **Nmap Scanner**: Scan networks for open ports and services.
- **CSS Minify/Beautify**: Minify or beautify CSS code.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Whogivsachit/ChitShTools.git
   cd ChitShTools
   ```

2. Create or edit the Servers `.env` file:
   ```
   cd ./server
   cp .env.example .env
   nano .env
   ```
3. Edit the Client global Variables:
    ```
    nano ./client/src/main.js
    ```
    - Specifically the appUrl, the client uses nginx to proxy the requests to the server so the client needs to know the server url.

    ```javascript
    app.config.globalProperties.$apiUrl = '/api'
    app.config.globalProperties.$appName = 'ChitShTools'
    app.config.globalProperties.$appUrl = 'http://localhost:5173' // domain or ip
    app.config.globalProperties.$socketUrl = '/socket'
    ```