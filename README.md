# web-app-cloner

Web App cloner exploits misconfigured web apps with source maps exposed to download complete website source code for SAST analysis. 

## Installation

- Using npm

  ```bash
  npm install -g web-app-cloner@latest
  ```

## Usage

- Get map files by enumerating target or google dorks

  ```
  ext:map intext:react inurl:app.js.map
  ```

- Start Cli using below cmd

  ```bash
  web-app-cloner
  ```
  
- Enter url and output dir

## License

MIT License

