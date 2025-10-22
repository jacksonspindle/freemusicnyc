# Deployment Guide for Free Music NYC

## Quick Deploy to Vercel (Recommended)

### Step 1: Deploy Backend

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository: `jacksonspindle/freemusicnyc`
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `server`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click "Deploy"
6. Once deployed, copy your backend URL (e.g., `https://your-backend.vercel.app`)

### Step 2: Deploy Frontend

1. Go back to Vercel dashboard
2. Click "Add New Project" again
3. Import the same repository: `jacksonspindle/freemusicnyc`
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. **Add Environment Variable**:
   - Name: `VITE_API_URL`
   - Value: `https://your-backend.vercel.app/api` (use the URL from Step 1)
6. Click "Deploy"
7. Once deployed, you'll get your frontend URL (e.g., `https://your-app.vercel.app`)

### Step 3: Update Backend CORS

After deploying the frontend:
1. Go to your backend project in Vercel
2. Go to Settings → Environment Variables
3. Add a variable:
   - Name: `FRONTEND_URL`
   - Value: Your frontend URL
4. Redeploy the backend

## Alternative: Deploy via CLI

### Prerequisites
```bash
npm install -g vercel
vercel login
```

### Deploy Backend
```bash
cd server
vercel --prod
# Copy the deployment URL
```

### Deploy Frontend
```bash
cd ../client
vercel --prod --build-env VITE_API_URL=https://your-backend.vercel.app/api
```

## Important Notes

1. **Automatic Updates**: In Vercel's serverless environment, the cron job won't work automatically. Users need to manually refresh events using the "Refresh Events" button in the UI.

2. **CORS**: Make sure your backend allows requests from your frontend domain.

3. **Environment Variables**:
   - Frontend needs `VITE_API_URL` pointing to backend
   - Backend can use `FRONTEND_URL` for CORS configuration

4. **Free Tier**: Vercel's free tier should be sufficient for this project.

## Testing

After deployment:
1. Visit your frontend URL on your phone
2. Click "Refresh Events" to populate data
3. Test filtering by neighborhood, date, and genre

## Troubleshooting

- **CORS errors**: Make sure backend allows requests from frontend domain
- **No data showing**: Click "Refresh Events" button to fetch data
- **Build failures**: Check that root directories are set correctly in Vercel
