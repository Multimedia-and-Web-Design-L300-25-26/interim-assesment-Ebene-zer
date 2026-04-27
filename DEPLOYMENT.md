## Step 1: Deploy to Render

### Via Render Dashboard

1. Go to https://render.com/dashboard
2. Click **"New +"** and select **"Web Service"**
3. Connect your GitHub repository
4. Fill in the service settings:
   - **Name**: `interim-assessment-backend` (or similar)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/index.js`
   - **Region**: Choose closest to your users

5. In the **Environment** section, add these variables:
   - `PORT` = `3000` (Render assigns this automatically, but explicit is fine)
   - `NODE_ENV` = `production`
   - `MONGO_URI` = Your MongoDB Atlas connection string
   - `JWT_SECRET` = A strong random string (use a password generator)
   - `JWT_EXPIRES_IN` = `duration` (e.g., `1h`, `7d`)
   - `CLIENT_URL` = Your frontend URL

6. Click **"Create Web Service"**

### Deploy on Push

Once configured, every push to your GitHub repo's main branch auto-deploys.


---

## Step 2: Update Frontend CORS

In your frontend project, update API base URL to point to your Render deployment:

```javascript
const API_URL = 'https://your-render-url.onrender.com';
```

And ensure your frontend's deployment URL is set in the backend's `CLIENT_URL` environment variable.

---

## Troubleshooting

- **Deployment fails**: Check the Render build logs for errors
- **Database connection fails**: Verify MongoDB Atlas IP whitelist and connection string
- **CORS errors**: Ensure `CLIENT_URL` is set to your frontend's actual domain
- **Stuck on "building"**: Check if your GitHub repo is connected and branch is `main`/`master`

---

## Notes

- Free tier on Render spins down after 15 minutes of inactivity;
- MongoDB Atlas free tier has storage limits (~512 MB)
