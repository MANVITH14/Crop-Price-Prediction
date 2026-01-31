# GitHub Setup Instructions

## Repository Details
- **GitHub Username**: MANVITH14
- **Repository Name**: Crop-Price-Prediction

## Steps to Push Code to GitHub

### Option 1: If Repository Already Exists on GitHub

1. **Verify the repository exists** at: `https://github.com/MANVITH14/Crop-Price-Prediction`

2. **Push using one of these methods:**

   **Method A: Using Personal Access Token (Recommended)**
   ```bash
   git remote set-url origin https://github.com/MANVITH14/Crop-Price-Prediction.git
   git push -u origin main
   ```
   When prompted, use your GitHub username and a Personal Access Token (not password)

   **Method B: Using SSH (if you have SSH keys set up)**
   ```bash
   git remote set-url origin git@github.com:MANVITH14/Crop-Price-Prediction.git
   git push -u origin main
   ```

### Option 2: If Repository Doesn't Exist Yet

1. **Create the repository on GitHub:**
   - Go to https://github.com/new
   - Repository name: `Crop-Price-Prediction`
   - Make it Public or Private (your choice)
   - **DO NOT** initialize with README, .gitignore, or license
   - Click "Create repository"

2. **Then push your code:**
   ```bash
   git remote set-url origin https://github.com/MANVITH14/Crop-Price-Prediction.git
   git push -u origin main
   ```

### Creating a Personal Access Token

If you need to create a Personal Access Token:

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name (e.g., "Crop Price Project")
4. Select scopes: Check `repo` (full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again)
7. Use this token as your password when pushing

### Current Status

✅ Git repository initialized  
✅ All files committed  
✅ Remote configured  
⏳ Ready to push (needs authentication)  

### Quick Push Command

Once you have the repository set up and authentication ready:

```bash
git push -u origin main
```

If you get authentication errors, use a Personal Access Token instead of your password.

