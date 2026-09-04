# Deployment Guide — Manar Al Khair Cargo

This guide explains how to build and deploy **both** the Next.js frontend and the Express backend to a live server.

---

## Architecture Overview

```
Browser  ->  Next.js Server (port 3000)  ->  Express Backend (port 4000)  ->  MongoDB
```

The Next.js app fetches data from the Express backend using the `NEXT_PUBLIC_BACKEND_URL` environment variable.

---

## 1. Changing the Backend URL (Most Important)

When you go live, your backend will run on a real domain or IP. Change ONE value in `.env`:

**File: `cargo/.env`**
```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend-domain.com
BACKEND_URL=https://your-backend-domain.com
```

> WARNING: NEXT_PUBLIC_ prefix is required for browser access.

---

## 2. Building the Next.js Frontend

```bash
cd cargo
npm run build
```

### Files to deploy to your server:
- `.next/`
- `public/`
- `next.config.ts`
- `package.json`
- `package-lock.json`
- `.env` (with production values)

### Start Next.js in production:
```bash
npm install --production
npm start
```

---

## 3. Deploying the Express Backend

Deploy files from `cargo/backend/`:
- `src/`
- `package.json`
- `package-lock.json`
- `.env` (backend env)

### Backend `.env`:
```env
PORT=4000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/cargo
JWT_SECRET=your-very-secret-key-change-this
NODE_ENV=production
ALLOW_ORIGIN=https://your-frontend-domain.com
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Start with PM2:
```bash
npm install -g pm2
pm2 start src/index.js --name cargo-backend
pm2 save && pm2 startup
```

---

## 4. Seeding the Database (First Time Only)

```bash
cd backend
node src/seedContent.js
node src/seedAbout.js
node src/seedEmailTemplates.js
```

---

## 5. Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection upgrade;
        proxy_set_header Host $host;
    }

    location /api/ {
        proxy_pass http://localhost:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 6. Pre-Launch Checklist

- [ ] Set NEXT_PUBLIC_BACKEND_URL and BACKEND_URL in frontend .env
- [ ] Set MONGODB_URI to production MongoDB Atlas connection string
- [ ] Change JWT_SECRET to a strong random string
- [ ] Change ADMIN_USER and ADMIN_PASSWORD
- [ ] Set ALLOW_ORIGIN to your frontend domain
- [ ] Configure Cloudinary credentials
- [ ] Set up SMTP in admin panel -> Email Settings
- [ ] Run all seed scripts on fresh DB
- [ ] Install SSL with: sudo certbot --nginx -d yourdomain.com
- [ ] Test admin at: https://yourdomain.com/admin/login
