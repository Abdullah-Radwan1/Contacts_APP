# Contacts

A small MEAN-stack contacts directory. The Express API reads contacts from MongoDB, and the Angular client displays the name, email address, and phone number for each contact.

## Requirements

- Node.js 20.19 or newer
- MongoDB running locally, or a MongoDB connection string

## Run locally

1. Start MongoDB.
2. In a terminal, start the API:

   ```powershell
   cd server
   Copy-Item .env.example .env
   npm install
   npm start
   ```

   The server connects to `mongodb://127.0.0.1:27017/contacts` by default. Set `MONGODB_URI` in `server/.env` to use another database. The first server startup inserts the sample contacts if the collection is empty.
3. In a second terminal, start the Angular app:

   ```powershell
   cd client
   npm install
   npm start
   ```

4. Open <http://localhost:4200>. The Angular development proxy forwards `/api` requests to the Express server on port 3000.

The contacts endpoint is `GET http://localhost:3000/v1/contacts?page=1&limit=5`. It returns a `data` array and pagination metadata (`page`, `limit`, `totalItems`, and `totalPages`). The backend validates pagination parameters with Zod and sends errors through a global error handler, using custom application errors for client-facing failures. The Angular client also validates API responses with Zod and provides Previous/Next controls for server-side pagination. The backend is organized into `server/src/routes`, `server/src/controllers`, and `server/src/models`. Helmet sets security headers, CORS allows the configured frontend origins, and the API is limited to 100 requests per IP per 15 minutes by default. Set `CORS_ORIGINS` in `server/.env` to a comma-separated list of allowed origins when deploying or using a different frontend URL.
