# Docker Setup Guide

## 🐳 Docker Configuration

This project includes Docker support for consistent development and deployment environments.

### Architecture
- **Node.js App Container**: Main application
- **Redis Container**: Caching layer
- **External Supabase**: PostgreSQL database

## 🚀 Quick Start

### Development Environment
```bash
# Start all services
npm run docker:dev

# Stop all services
npm run docker:down
```

### Production Environment
```bash
# Start production services
npm run docker:prod
```

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `npm run docker:build` | Build application image |
| `npm run docker:dev` | Start development environment |
| `npm run docker:prod` | Start production environment |
| `npm run docker:down` | Stop all containers |

## 🔧 Environment Variables

Make sure your `.env` file contains:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
SUPABASE_DB_URL=your_supabase_db_url
REDIS_URL=redis://redis:6379
PORT=5000
WEBSITE_URL=https://books.toscrape.com
MAX_REQUEST_PER_IP=100
```

## 🏥 Health Checks

- **Application**: `http://localhost:5000/health`
- **Redis**: Built-in health check with `redis-cli ping`

## 📊 Volumes

- **Redis Data**: Persistent storage for cache data
- **Development**: Live code reloading with volume mounts

## 🔍 Troubleshooting

### Container Issues
```bash
# View logs
docker-compose logs app
docker-compose logs redis

# Restart services
docker-compose restart

# Rebuild containers
docker-compose up --build --force-recreate
```

### Redis Connection Issues
```bash
# Test Redis connection
docker-compose exec redis redis-cli ping
```