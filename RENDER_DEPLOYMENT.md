# Deploying to Render - Step by Step Guide

## Prerequisites

✅ Your code is pushed to GitHub repository: `MANVITH14/Crop-Price-Prediction`  
✅ You have a Render account (sign up at https://render.com if needed)

## Deployment Steps

### Step 1: Prepare Your Repository

All necessary files are already created:
- ✅ `Procfile` - Tells Render how to run your app
- ✅ `requirements.txt` - All dependencies including gunicorn
- ✅ `render.yaml` - Optional configuration file
- ✅ `app.py` - Updated to use PORT environment variable

### Step 2: Create New Web Service on Render

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com
   - Sign in or create an account

2. **Create New Web Service**
   - Click "New +" button
   - Select "Web Service"

3. **Connect Your Repository**
   - Click "Connect account" if not connected
   - Select your GitHub account
   - Choose repository: `Crop-Price-Prediction`
   - Click "Connect"

4. **Configure Service Settings**

   **Basic Settings:**
   - **Name**: `crop-price-prediction` (or any name you prefer)
   - **Region**: Choose closest to your users (e.g., Singapore, Mumbai)
   - **Branch**: `main`
   - **Root Directory**: Leave empty (or `.` if needed)
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`

   **Advanced Settings (Optional):**
   - **Environment Variables**: 
     - `FLASK_DEBUG`: `False` (for production)
     - `PYTHON_VERSION`: `3.11.0` (optional)

5. **Choose Plan**
   - **Free Tier**: Good for testing (spins down after inactivity)
   - **Starter Plan**: $7/month (always on)
   - Choose based on your needs

6. **Click "Create Web Service"**

### Step 3: Wait for Deployment

- Render will:
  1. Clone your repository
  2. Install dependencies (this may take 5-10 minutes)
  3. Generate sample data
  4. Train the ML model (this may take 2-5 minutes)
  5. Start the web service

**Note**: First deployment takes longer due to model training!

### Step 4: Access Your Application

- Once deployed, you'll get a URL like:
  ```
  https://crop-price-prediction.onrender.com
  ```
- Click the URL to access your application

## Important Notes for Render

### 1. Free Tier Limitations

- **Spins down after 15 minutes of inactivity**
- First request after spin-down takes 30-60 seconds
- **Solution**: Use a cron job or uptime monitor to ping your site

### 2. File System Persistence

- **Render's file system is ephemeral**
- Model files and data files will be regenerated on each deploy
- **For production**: Consider using:
  - Render Disk (persistent storage)
  - External database (PostgreSQL)
  - Cloud storage (AWS S3, etc.)

### 3. Daily Updates

- The scheduler will work, but:
  - On free tier, if app spins down, scheduler stops
  - Consider using Render Cron Jobs for daily updates
  - Or use external cron service (cron-job.org, etc.)

### 4. Environment Variables

You can set these in Render Dashboard → Environment:

```
FLASK_DEBUG=False
PYTHON_VERSION=3.11.0
```

## Troubleshooting

### Build Fails

**Issue**: Build command fails
- **Check**: Look at build logs in Render dashboard
- **Common causes**: 
  - Missing dependencies in requirements.txt
  - Python version mismatch
  - Memory issues during model training

**Solution**: 
- Check build logs for specific error
- Ensure all dependencies are in requirements.txt
- Try reducing model complexity for faster builds

### App Crashes on Startup

**Issue**: Service crashes immediately
- **Check**: Service logs in Render dashboard
- **Common causes**:
  - Port not configured correctly
  - Missing model files
  - Import errors

**Solution**:
- Verify `Procfile` has: `web: gunicorn app:app`
- Check that app.py uses `os.environ.get('PORT', 5000)`
- Review logs for specific error messages

### Model Training Takes Too Long

**Issue**: Build timeout or slow startup
- **Solution**: 
  - Pre-train model and commit to repo (not recommended for large files)
  - Use lighter model parameters
  - Train model asynchronously after startup

### First Request is Slow

**Issue**: First prediction takes very long
- **Reason**: Model training on first startup
- **Solution**: This is normal, subsequent requests will be fast

## Using Render Cron Jobs (Recommended for Daily Updates)

Instead of the in-app scheduler, use Render Cron Jobs:

1. **Go to Render Dashboard**
2. **Create Cron Job**
3. **Settings**:
   - **Schedule**: `0 2 * * *` (daily at 2 AM)
   - **Command**: `curl -X POST https://your-app.onrender.com/update`
   - **Service**: Your web service

This ensures updates run even if the app spins down.

## Monitoring

- **Logs**: Available in Render Dashboard → Logs
- **Metrics**: CPU, Memory usage in Dashboard
- **Alerts**: Set up in Render Dashboard → Alerts

## Updating Your App

1. **Push changes to GitHub**
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

2. **Render auto-deploys**
   - Render automatically detects changes
   - Triggers new deployment
   - Your app updates automatically

## Production Checklist

- [ ] Test locally before deploying
- [ ] Set `FLASK_DEBUG=False` in production
- [ ] Use persistent storage for model/data (if needed)
- [ ] Set up cron job for daily updates
- [ ] Monitor logs for errors
- [ ] Test all features after deployment
- [ ] Set up custom domain (optional)

## Quick Reference

**Your Render URL**: `https://your-app-name.onrender.com`

**Manual Update**: `POST https://your-app-name.onrender.com/update`

**API Endpoint**: `POST https://your-app-name.onrender.com/api/predict`

---

**Your app is now live on Render! 🚀**

