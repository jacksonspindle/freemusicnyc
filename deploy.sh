#!/bin/bash

echo "🎸 Free Music NYC - Deployment Script"
echo "======================================"
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if logged in
if ! vercel whoami &> /dev/null; then
    echo "Please login to Vercel:"
    vercel login
fi

echo ""
echo "Step 1: Deploying Backend..."
echo "----------------------------"
cd server
BACKEND_URL=$(vercel --prod --yes | grep -o 'https://[^ ]*' | tail -1)
echo "✅ Backend deployed to: $BACKEND_URL"
cd ..

echo ""
echo "Step 2: Deploying Frontend..."
echo "-----------------------------"
cd client
echo "Setting API URL to: ${BACKEND_URL}/api"
vercel --prod --yes --build-env VITE_API_URL="${BACKEND_URL}/api"
FRONTEND_URL=$(vercel --prod --yes | grep -o 'https://[^ ]*' | tail -1)
echo "✅ Frontend deployed to: $FRONTEND_URL"
cd ..

echo ""
echo "🎉 Deployment Complete!"
echo "======================="
echo ""
echo "Backend:  $BACKEND_URL"
echo "Frontend: $FRONTEND_URL"
echo ""
echo "Open the frontend URL on your phone to view the app!"
echo ""
