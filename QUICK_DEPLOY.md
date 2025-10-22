# Quick Deploy - Free Music NYC

## Fastest Way to Deploy (2 minutes)

### 1. Login to Vercel
Go to [vercel.com](https://vercel.com) and sign in with GitHub

### 2. Deploy Backend (1 minute)
1. Click "Add New Project"
2. Import `jacksonspindle/freemusicnyc`
3. Set **Root Directory**: `server`
4. Click Deploy
5. **COPY THE URL** (like `https://freemusicnyc-server.vercel.app`)

### 3. Deploy Frontend (1 minute)
1. Click "Add New Project" again
2. Import `jacksonspindle/freemusicnyc` again
3. Set **Root Directory**: `client`
4. Add Environment Variable:
   - **VITE_API_URL** = `https://your-backend-url.vercel.app/api`
   (Replace with the URL from step 2)
5. Click Deploy
6. **DONE!** Visit your app URL on your phone

### Quick Tip
After deploying, click the "Refresh Events" button in the app to load event data.

---

## Deploy via CLI (Alternative)

If you prefer command line:

```bash
# Login to Vercel
vercel login

# Deploy backend
cd server
vercel --prod

# Copy the backend URL, then deploy frontend
cd ../client
vercel --prod
# When prompted, add VITE_API_URL as environment variable
```

That's it! Your app will be live in under 2 minutes.
