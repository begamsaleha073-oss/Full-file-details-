# 📱 Phone Se GitHub Upload - Step by Step Guide

**Sirf 6 files upload karni hain!** Ek ek karke karo.

---

## 🎯 Repository: 
```
https://github.com/begamsaleha073-oss/Full-file-details-
```

---

## 📝 File 1: README.md

**GitHub pe jao aur:**
1. "Add file" → "Create new file" tap karo
2. Filename: `README.md`
3. Neeche diya hua content **copy-paste** karo
4. "Commit new file" tap karo

**Content:**

```markdown
# OSINT Search Tool

Educational OSINT database search tool.

## Deploy to Vercel

1. Import this repo in Vercel
2. Add environment variables:
   - LEAKOSINT_API_TOKEN
   - ADMIN_PASSWORD
3. Deploy!

Created by Happy 💚
```

---

## 📝 File 2: package.json

1. "Add file" → "Create new file"
2. Filename: `package.json`
3. Content copy-paste karo:

```json
{
  "name": "osint-search-tool",
  "version": "1.0.0",
  "dependencies": {
    "axios": "^1.6.0",
    "bcryptjs": "^2.4.3"
  }
}
```

4. "Commit new file" tap karo

---

## 📝 File 3: vercel.json

1. "Add file" → "Create new file"
2. Filename: `vercel.json`
3. Content:

```json
{
  "version": 2,
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

4. "Commit new file" tap karo

---

## 📝 File 4: index.html

1. "Add file" → "Create new file"
2. Filename: `index.html`
3. Content: (Bahut lamba hai - main alag se deta hoon neeche)
4. "Commit new file" tap karo

**⚠️ IMPORTANT:** Ye file bahut badi hai (200+ lines). 
- Replit Files tab se `github-simple-upload/index.html` kholo
- Poora content copy karo
- GitHub pe paste karo

---

## 📝 File 5: api/search.js

**⚠️ IMPORTANT:** Filename me **slash (/)** lagana hai - folder automatic ban jayega!

1. "Add file" → "Create new file"
2. Filename: `api/search.js` ← Exactly aisa likho!
3. Content: (Replit se `github-simple-upload/api/search.js` copy karo)
4. "Commit new file" tap karo

---

## 📝 File 6: api/admin.js

1. "Add file" → "Create new file"
2. Filename: `api/admin.js`
3. Content: (Replit se `github-simple-upload/api/admin.js` copy karo)
4. "Commit new file" tap karo

---

## ✅ Done! Ab Vercel pe deploy karo:

1. **Vercel.com** kholo
2. **Import Project** → GitHub repo select karo
3. **Environment Variables add karo:**
   ```
   LEAKOSINT_API_TOKEN = your_token
   ADMIN_PASSWORD = your_password
   ```
4. **Deploy** tap karo! 🚀

---

**Created by Happy** 💚
