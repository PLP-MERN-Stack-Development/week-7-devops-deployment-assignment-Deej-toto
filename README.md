# MERN Bug Tracker - Deployment Ready (Render backend + Netlify frontend)

## What this contains
- Complete MERN app (backend + frontend)
- `.env.example` files for backend and frontend
- GitHub Actions CI workflow that runs tests and triggers Render & Netlify deploys
- Instructions to connect to MongoDB Atlas, Render, and Netlify

## Quick local run
1. Backend
   ```bash
   cd backend
   npm install
   cp .env.example .env   # or copy manually on Windows
   npm run dev
   ```
2. Frontend
   ```bash
   cd frontend
   npm install
   npm start
   ```

## Deployment (placeholder/example URLs)
- Backend (Render): https://your-backend.onrender.com
- Frontend (Netlify): https://your-frontend.netlify.app

## GitHub Actions (CI/CD)
The workflow `.github/workflows/ci-cd.yml` will:
1. Run backend and frontend tests
2. If tests pass, trigger a Render deploy and a Netlify deploy using API calls
You must add these GitHub Secrets in your repository settings:
- RENDER_SERVICE_ID
- RENDER_API_KEY
- NETLIFY_SITE_ID
- NETLIFY_AUTH_TOKEN

## Configure MongoDB Atlas
1. Create a free cluster on MongoDB Atlas
2. Create a DB user and whitelist your server IP(s) or allow access temporarily
3. Copy the connection string into `backend/.env` as `MONGO_URI`

## How to use this package
1. Download and unzip.
2. Replace placeholders in `.env.example` and `frontend/.env.production.example`.
3. Commit, push to GitHub, set repository secrets, then GitHub Actions will run on push to main.

## Notes
- This is a ready-to-submit codebase with configurations. You must provide your own Atlas, Render, and Netlify accounts and secrets.
