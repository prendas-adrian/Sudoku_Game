# Render.com Deployment Guide

## Option 1: Automatic Deployment with render.yaml (Recommended)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add Render deployment config"
git push origin main
```

### Step 2: Connect to Render
1. Go to https://render.com
2. Sign in with GitHub
3. Click "New +" → "Blueprint"
4. Select your Sudoku_Game repository
5. Render will detect `render.yaml` automatically
6. Click "Create New Services"

This will:
- ✅ Create MongoDB service
- ✅ Deploy Node.js backend
- ✅ Set up environment variables
- ✅ Configure health checks

---

## Option 2: Manual Deployment (Alternative)

### Step 1: Connect Repository
1. Go to https://render.com/dashboard
2. Click "New Web Service"
3. Select "Connect Repository" → Your Sudoku_Game repo
4. Choose branch: `main` or `master`

### Step 2: Configure Web Service
- **Name**: `sudoku-backend`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Free tier

### Step 3: Set Environment Variables
In the dashboard, set:
```
NODE_ENV = production
PORT = 8080
```

### Step 4: Add MongoDB Atlas
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Get connection string (looks like: `mongodb+srv://user:pass@cluster.mongodb.net/sudoku?retryWrites=true&w=majority`)
5. Add to Render environment:
```
MONGODB_URI = mongodb+srv://user:password@cluster.mongodb.net/sudoku?retryWrites=true&w=majority
```

### Step 5: Deploy
- Click "Create Web Service"
- Wait for build and deployment to complete

---

## Important Notes

### MongoDB Connection
- **Option A** (render.yaml): Uses Render's managed MongoDB (included in blueprint)
- **Option B** (Manual): Use MongoDB Atlas free tier for better reliability

### Frontend Deployment (Angular)
The current setup only deploys the backend. For full-stack deployment:

1. Build Angular frontend:
```bash
cd client
npm run build
```

2. Serve built files from Node backend:
   - Update `app.js` to serve static files from `public/` directory
   - Or deploy frontend separately on Render/Vercel

3. Or split deployment:
   - Backend on Render: `https://sudoku-backend.onrender.com`
   - Frontend on Vercel: Update `global.ts` API URL to backend URL

---

## Troubleshooting

### Deployment fails
- Check build logs on Render dashboard
- Verify Node version compatibility
- Ensure all npm scripts are correct

### MongoDB connection fails
- Verify connection string format
- Check IP whitelist in MongoDB Atlas
- Confirm credentials in environment variables

### Cold start issues
- Render may pause free services after 15 min inactivity
- Response time may be slow on first request
- Upgrade to paid plan for always-on service

---

## Post-Deployment

### Test Backend
```bash
curl https://sudoku-backend.onrender.com/api/users
```

### Update Frontend API
Edit `client/src/app/services/global.ts`:
```typescript
export const GLOBAL = {
  url: 'https://sudoku-backend.onrender.com/api/'
};
```

### Rebuild and Deploy Frontend
```bash
cd client
npm run build
```

---

## Environment Variables Reference

| Variable | Example | Required |
|----------|---------|----------|
| `NODE_ENV` | production | Yes |
| `PORT` | 8080 | No (default 8080) |
| `MONGODB_URI` | mongodb+srv://... | Yes |

---

## Free Tier Limitations
- Services spin down after 15 min inactivity
- 0.5 GB RAM, shared CPU
- Monthly usage limits
- No custom domain SSL (unless upgraded)

For production, consider upgrading to **Starter Plan** ($7/month).
