# Openframe-WebApp

A responsive front-end web app for Openframe.

### Local Development Setup

Install the dependencies: `npm i`

Create a `.env` file using `.env-sample` as an example. Make sure to set the `API_HOST` variable to point to the desired API host. For example:
- for a local Openframe API server: `API_HOST=http://0.0.0.0:8888`
- for the official Openframe production API server: `API_HOST=https://api.openframe.io/v0/`

Run the web app via the webpack dev server: `npm start`
