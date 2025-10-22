# Node.js Version Fix

## Problem
You're getting this error:
```
You are using Node.js 20.10.0. Vite requires Node.js version 20.19+ or 22.12+
```

## Quick Fix (2 minutes)

### Option 1: Using NVM (Recommended)

If you have nvm installed:

```bash
# Install the required Node version
nvm install 22.12.0

# Use it
nvm use 22.12.0

# Make it default (optional)
nvm alias default 22.12.0

# Verify the version
node --version
# Should show: v22.12.0
```

Then try running the client again:
```bash
cd client
npm run dev
```

### Option 2: Using NVM with .nvmrc

The project now includes a `.nvmrc` file that specifies the correct Node version:

```bash
# In the project root
nvm use

# This will automatically use the version specified in .nvmrc
```

### Option 3: Manual Node.js Upgrade

If you don't have nvm:

1. **Download Node.js v22.12.0+** from [nodejs.org](https://nodejs.org/)
2. Install it
3. Verify:
   ```bash
   node --version
   ```
4. Run the client again:
   ```bash
   cd client
   npm run dev
   ```

## Installing NVM (if you don't have it)

### macOS/Linux:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

Then restart your terminal and run:
```bash
nvm install 22.12.0
nvm use 22.12.0
```

### Windows:
Download [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) and install it.

## After Upgrading

Once you've upgraded Node.js:

1. **Start the backend:**
   ```bash
   cd server
   npm run dev
   ```

2. **Start the frontend (in a new terminal):**
   ```bash
   cd client
   npm run dev
   ```

3. **Open your browser:**
   Visit `http://localhost:5173`

That's it! Your app should now run without errors.

## Why This Error?

The latest version of Vite (7.x) uses Node.js features that were added in Node.js 20.19+. Your current version (20.10.0) doesn't have these features, specifically the `crypto.hash` function.

## Files Updated

I've added these files to help prevent this issue:
- `.nvmrc` - Specifies Node v22.12.0
- `package.json` engines field - Documents Node version requirement
- Updated README.md - Added Prerequisites section with Node requirements
