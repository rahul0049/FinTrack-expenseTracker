# Deployment Guide (Free Tier)

This guide walks you through hosting your Expense Tracker for free using **Neon** (Database), **Render** (Backend), and **Vercel** (Frontend).

## 1. Database Setup (PostgreSQL on Neon)

1.  Go to [Neon.tech](https://neon.tech/) and sign up.
2.  Create a **New Project**.
3.  Choose a name (e.g., `expense-tracker-db`), select a region close to you (e.g., Singapore `ap-southeast-1` or US East).
4.  Once created, copy the **Connection String** (it looks like `postgres://user:password@ep-xyz.neon.tech/neondb...`).
5.  **Important**: Save this string; you will need it for the Backend configuration.

## 2. Backend Hosting (Render)

1.  Push your code to **GitHub** if you haven't already.
2.  Go to [Render.com](https://render.com/) and sign up.
3.  Click **New +** -> **Web Service**.
4.  Connect your GitHub repository.
5.  **Settings**:
    *   **Root Directory**: `backend` (Important! This tells Render where your server code is).
    *   **Runtime**: `Node`.
    *   **Build Command**: `npm install`.
    *   **Start Command**: `npm start`.
6.  **Environment Variables** (Scroll down to "Environment Variables" section):
    *   Add `PORT` = `5000` (or leave empty, Render assigns one automatically, but your code usually defaults to 5000).
    *   Add `DB_USER`, `DB_HOST`, `DB_DATABASE`, `DB_PASSWORD`, `DB_PORT` using the values from your Neon connection string.
    *   **OR** simply add `DATABASE_URL` = `your_neon_connection_string`. (You might need to update your backend `db.js` to use `process.env.DATABASE_URL` if it's separate).
    *   Add `JWT_SECRET` = `some_secure_random_string`.
7.  Click **Create Web Service**.
8.  Wait for the deployment to finish. Copy your **Service URL** (e.g., `https://expense-tracker-api.onrender.com`).

## 3. Frontend Hosting (Vercel)

1.  Go to [Vercel.com](https://vercel.com/) and sign up.
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  **Configure Project**:
    *   **Framework Preset**: Vite (should detect automatically).
    *   **Root Directory**: Click "Edit" and select `frontend`.
5.  **Environment Variables**:
    *   Add `VITE_API_BASE_URL` = `https://expense-tracker-api.onrender.com/api/v1` (Replace with your actual Render URL).
    *   *Note*: Ensure your frontend code uses `import.meta.env.VITE_API_BASE_URL` instead of hardcoded `localhost`.
6.  Click **Deploy**.

## 4. Final Configuration

1.  **CORS Update (Backend)**:
    *   Once your Frontend is deployed on Vercel, copy its URL (e.g., `https://expense-tracker.vercel.app`).
    *   Go back to your Backend code (`index.js` or `app.js`).
    *   Update the `cors` configuration to allow your Vercel domain:
        ```javascript
        app.use(cors({
            origin: ["https://expense-tracker.vercel.app", "http://localhost:5173"],
            credentials: true
        }));
        ```
    *   Push these changes to GitHub. Render will auto-deploy the update.

## 🎉 Done!
Your app should now be live and accessible globally!
