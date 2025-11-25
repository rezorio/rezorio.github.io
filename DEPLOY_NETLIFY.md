# Netlify Deployment Guide

## ✅ Backend Setup Complete

The NestJS backend is ready:
- API endpoints: `/api/generate-reviewer`, `/api/analyze-video`
- Dependencies installed (366 packages)
- Netlify configuration## Troubleshooting

### ✅ Fixed: class-validator Error

**Error**: `Cannot find module 'class-validator'`

**Solution**: Already fixed! The build script now bundles `class-validator` and `class-transformer` instead of excluding them. These packages are also added to `package.json`.

### Build Failscripts configured

## 📝 Frontend Changes Needed

Make these two simple edits to `reviewer.html`:

### 1. Add API Script (line 9)
Add this line in the `<head>` section after the Font Awesome link:
```html
<script src="js/api.js"></script>
```

### 2. Remove API Key (lines 242-243)
Delete these two lines:
```javascript
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const GEMINI_API_KEY = 'AIzaSyD0yPoDs8gg64bNadaaZJIUN056WyJFGXEE';
```

That's it! The `js/api.js` file already exists and will handle backend communication.

## 🚀 Deploy to Netlify

### 1. Push to GitHub
```bash
git add .
git commit -m "Add NestJS backend for secure API"
git push origin main
```

### 2. Connect Netlify
1. Go to [netlify.com](https://app.netlify.com/)
2. "Add new site" → "Import existing project" → GitHub
3. Select `rezorio.github.io`
4. Netlify auto-detects `netlify.toml`

### 3. Set Environment Variable
In Netlify dashboard:
- **Site settings** → **Environment variables**
- Add variable:
  - Key: `GEMINI_API_KEY`
  - Value: `AIzaSyD0yPoDs8gg64bNadaaZJIUN056WyJFGXEE`

### 4. Deploy!
Click "Deploy site" and wait ~2-3 minutes.

## ✅ Test
- Generate reviewer with text
- Upload PDF
- Upload video
- Check browser console (no errors)
- View page source (API key NOT visible!)

## 🔧 Local Testing (Optional)
```bash
cd backend
npm run start:dev
```
Backend runs on `http://localhost:3000`

## 📁 Files Created
```
backend/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── serverless.ts
│   └── gemini/
│       ├── gemini.module.ts
│       ├── gemini.controller.ts
│       └── gemini.service.ts
├── package.json
├── tsconfig.json
├── nest-cli.json
└── build-netlify.js

netlify.toml
js/api.js
```
