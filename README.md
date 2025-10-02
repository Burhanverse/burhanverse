# Burhanverse Portfolio 🚀

A modern, TypeScript-based portfolio website with GitHub integration.

![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Build-Vite-646CFF?logo=vite)
![GitHub API](https://img.shields.io/badge/API-GitHub-181717?logo=github)

## ✨ Features

- **100% TypeScript** - Full type safety and modern JavaScript
- **Vite** - Lightning-fast development and optimized builds
- **GitHub API Integration** - Display your repositories with Octokit
- **Custom Cursor** - Smooth cursor tracking with hover effects
- **Live Clock** - Real-time clock display (updates every 5s)
- **Day Progress Bar** - Visual progress through the day
- **Blinking Cursor Animation** - Animated subtitle effect
- **Secure** - Environment variables and XSS protection
- **Responsive Design** - Works on all devices
- **Dark/Light Theme** - Theme toggle with persistence
- **Fast Performance** - Optimized bundle (~30KB)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:8000` 🎉

## 🛠️ Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure GitHub (Optional)
Create a `.env` file:
```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_GITHUB_TOKEN=your_token_here  # Optional (get from github.com/settings/tokens)
VITE_GITHUB_USERNAME=Burhanverse
```

> **Note:** Token is optional. Without it: 60 requests/hour. With it: 5000/hour.

## 📦 Scripts

```bash
npm run dev          # Start dev server (localhost:8000)
npm run build        # Build for production (→ dist/)
npm run preview      # Preview production build
npm run type-check   # TypeScript type checking
```

## 📁 Project Structure

```
website/
├── src/                # TypeScript source
│   ├── main.ts        # Entry point
│   ├── bodyLoad.ts    # Initialization
│   ├── githubApi.ts   # GitHub API client
│   ├── listRepo.ts    # Repo fetching
│   ├── repoRenderer.ts # DOM rendering
│   ├── navigation.ts  # Page navigation
│   ├── theme.ts       # Theme system
│   ├── customCursor.ts # Custom cursor
│   ├── clock.ts       # Time display
│   ├── dateDisplay.ts # Date formatting
│   ├── dayProgress.ts # Progress bar
│   └── subtitleStyling.ts # Subtitle animation
├── res/               # Static assets
├── style/             # CSS files
├── index.html         # Main HTML
└── .env               # Config (create this)
```

## 🎨 Customization

### Update Your Info
Edit `index.html`:
- Your name and title
- Featured projects
- Social links

### Change Repo Display
Edit `src/listRepo.ts`:
```typescript
// Show first 9 repos (default)
const first9 = repos.slice(0, 9);

// Filter forks
const noForks = repos.filter(r => !r.fork);

// Sort by stars
const popular = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
```

## 📊 Tech Stack

| Technology | Purpose |
|------------|---------|
| TypeScript | Type-safe JavaScript |
| Vite | Build tool & dev server |
| Octokit | GitHub API client |
| CSS3 | Modern styling |
| HTML5 | Semantic markup |

## 🎯 Key Improvements

✅ **No jQuery** - Pure TypeScript  
✅ **Type Safe** - Catch errors early  
✅ **Fast Builds** - Vite optimization  
✅ **Clean Code** - Modular structure  
✅ **70% Smaller** - Bundle size reduced  

## 📚 Documentation

- `README.md` - This file (Getting Started)
- `COMPLETE_MIGRATION.md` - Full migration details & technical overview
- `SETUP_GUIDE.md` - Detailed setup instructions
- `CLEANUP_SUMMARY.md` - Technical cleanup details

## 🤝 Contributing

Fork and customize for your own portfolio!

## 📄 License

MIT License - Free to use as a template.

---

**Made with ❤️ and TypeScript**
