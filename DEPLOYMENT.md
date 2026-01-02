# Deployment Guide

## 🚀 Automatic Deployment to Render

This project includes automatic CI/CD deployment to Render using GitHub Actions.

### 📋 Setup Requirements

#### 1. Render Account Setup
1. Create account at [render.com](https://render.com)
2. Connect your GitHub repository
3. Get your Render API key from dashboard

#### 2. GitHub Secrets Configuration
Add these secrets to your GitHub repository (`Settings > Secrets and variables > Actions`):

```
RENDER_API_KEY=your_render_api_key
RENDER_SERVICE_ID=your_render_service_id
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_DB_URL=your_supabase_database_url
```

#### 3. Render Environment Variables
The following environment variables are automatically configured via `render.yaml`:
- `NODE_ENV=production`
- `PORT=10000` (Render's default)
- `SUPABASE_*` (from secrets)
- `REDIS_URL` (from Render Redis service)

### 🔄 Deployment Process

#### Automatic Deployment
- **Trigger**: Any push to `main` branch
- **Process**: 
  1. Run tests
  2. Build Docker image
  3. Deploy to Render
  4. Health check verification

#### Manual Deployment
- Go to GitHub Actions tab
- Run "Deploy to Render" workflow manually

### 🏗️ Infrastructure

#### Services Created on Render:
- **Web Service**: `openbooks-api` (Docker-based)
- **Redis Service**: `openbooks-redis` (managed Redis)

#### Configuration:
- **Plan**: Free tier
- **Region**: Oregon
- **Health Check**: `/health` endpoint
- **Auto-deploy**: Enabled from `main` branch

### 🔍 Monitoring

#### Health Checks
- **Endpoint**: `https://your-app.onrender.com/health`
- **Frequency**: Every 30 seconds
- **Timeout**: 3 seconds

#### Logs
- View deployment logs in Render dashboard
- GitHub Actions logs for CI/CD process

### 🛠️ Troubleshooting

#### Common Issues:
1. **Build Failures**: Check GitHub Actions logs
2. **Environment Variables**: Verify secrets are set correctly
3. **Health Check Failures**: Ensure `/health` endpoint works
4. **Redis Connection**: Check Redis service status

#### Debug Commands:
```bash
# Test locally with production settings
NODE_ENV=production npm start

# Test Docker build
docker build -t openbooks-api .
docker run -p 10000:10000 openbooks-api
```

### 📊 Performance

#### Free Tier Limitations:
- **Sleep after 15 minutes** of inactivity
- **750 hours/month** runtime
- **Redis**: 25MB storage

#### Production Considerations:
- Upgrade to paid plan for 24/7 uptime
- Monitor memory usage and optimize
- Consider CDN for static assets