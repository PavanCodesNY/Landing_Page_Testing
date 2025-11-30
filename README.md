<div align="center">

# 🎓 N-Mapper

**Play School Like a Game**

*Transform your Canvas LMS courses into an interactive 3D knowledge graph*

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat&logo=typescript)](https://www.typescriptlang.org/)

[Demo](#) · [Features](#features) · [Getting Started](#getting-started) · [Roadmap](#roadmap)

</div>

---

## 🚀 What is N-Mapper?

**N-Mapper** is a spatial learning platform that visualizes your academic journey as a 3D interactive knowledge graph. Instead of navigating through endless Canvas LMS tabs, see all your courses, modules, and assignments as interconnected nodes in 3D space.

### The Problem
- **Canvas LMS is overwhelming** — courses buried in lists, assignments scattered across modules
- **No big picture** — can't see how courses connect or what prerequisites matter
- **Inefficient navigation** — clicking through 5+ menus to find one assignment

### The Solution
N-Mapper transforms your Canvas data into:
- 🌐 **3D knowledge graph** — courses, modules, assignments as visual nodes
- 🎤 **Voice navigation** — "Show me CSE 101" instantly zooms to your course
- 🔗 **Relationship mapping** — see prerequisites and course connections
- ⚡ **Real-time sync** — updates automatically from Canvas API

---

## ✨ Features

### Current Features
- **3D Force-Directed Graph**
  Interactive visualization using Three.js — drag to rotate, scroll to zoom

- **Multi-Level Hierarchy**
  Courses → Modules → Assignments, color-coded and sized by importance

- **Smooth Animations**
  Powered by Framer Motion — 60fps transitions and scroll effects

- **Glassmorphic UI**
  Modern design with Tailwind CSS v4 and OKLCH color space

- **Auto-Rotate Demo**
  3D graph automatically spins when in viewport

### Planned Features (Roadmap)
- [ ] Canvas API integration (live data sync)
- [ ] Voice navigation with Web Speech API
- [ ] Search and filter (find assignments by keyword)
- [ ] Grade visualization (node color = grade status)
- [ ] Assignment reminders (deadline alerts)
- [ ] Export as image/video (share your academic universe)
- [ ] Mobile AR mode (view graph in real space)

---

## 🎨 Screenshots

### Landing Page
![Hero Section](docs/screenshots/hero.png)
*Animated gradient orb with dot grid background*

### 3D Knowledge Graph
![Graph Preview](docs/screenshots/graph-preview.png)
*Interactive force-directed graph showing courses and prerequisites*

### Feature Cards
![Features](docs/screenshots/features.png)
*Glassmorphic cards with smooth hover animations*

---

## 🛠️ Tech Stack

### Core
- **[Next.js 16](https://nextjs.org/)** — App Router, Turbopack, React 19.2
- **[TypeScript](https://www.typescriptlang.org/)** — Type-safe development
- **[Tailwind CSS v4](https://tailwindcss.com/)** — CSS-first configuration, OKLCH colors

### 3D & Animation
- **[Three.js](https://threejs.org/)** — WebGL 3D graphics
- **[react-force-graph-3d](https://github.com/vasturiano/react-force-graph-3d)** — Force-directed graph layout
- **[Framer Motion](https://www.framer.com/motion/)** — Smooth animations and scroll effects

### Future Integrations
- **Canvas LMS API** — Fetch course data
- **Web Speech API** — Voice navigation
- **Supabase** — User data persistence
- **Next Auth** — Canvas OAuth login

---

## 🚦 Getting Started

### Prerequisites
- **Node.js** 20+ ([Download](https://nodejs.org/))
- **npm** or **pnpm**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/n-mapper.git
   cd n-mapper
   ```

2. **Install dependencies**
   ```bash
   cd landing_page
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
n-mapper/
├── landing_page/              # Next.js 16 landing page
│   ├── app/
│   │   ├── page.tsx          # Main landing page
│   │   ├── layout.tsx        # Root layout with fonts
│   │   └── globals.css       # Tailwind v4 config + custom utilities
│   ├── public/               # Static assets
│   └── package.json          # Dependencies
├── Claude.md                 # AI agent context (project guidelines)
├── Agents.md                 # Agent instructions
└── README.md                 # This file
```

### Key Files

| File | Description |
|------|-------------|
| `app/page.tsx` | Landing page with 7 sections (Hero, Graph, Features, etc.) |
| `app/globals.css` | Tailwind v4 config using `@theme` and `@utility` directives |
| `postcss.config.mjs` | PostCSS setup for Tailwind v4 |

---

## 🎯 Roadmap

### Phase 1: Landing Page (Current)
- [x] Hero section with animated orb
- [x] 3D graph preview with demo data
- [x] Feature cards with glassmorphism
- [x] Dashboard mockup section
- [x] Social proof (university logos)
- [x] Final CTA with dual buttons

### Phase 2: Dashboard MVP
- [ ] Canvas API integration
- [ ] User authentication (Canvas OAuth)
- [ ] Real course data visualization
- [ ] Search and filter
- [ ] Mobile responsive graph

### Phase 3: Advanced Features
- [ ] Voice navigation
- [ ] Grade visualization
- [ ] Assignment notifications
- [ ] Export graph as image
- [ ] Mobile AR mode

### Phase 4: Analytics & AI
- [ ] Study pattern insights
- [ ] AI-powered study recommendations
- [ ] Performance predictions
- [ ] Collaborative study groups

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow the code style in `Claude.md` (project context file)
- Use Tailwind CSS v4 syntax (no `tailwind.config.js`)
- Write components with TypeScript
- Use Framer Motion for all animations
- Test on mobile breakpoints

---

## 🐛 Known Issues

- 3D graph performance degrades with 200+ nodes (plan: virtualization)
- Auto-rotate disabled on mobile to save battery
- Voice navigation not yet implemented (Phase 3)

---

## 📜 License

MIT License - see [LICENSE](LICENSE) for details

---

## 🙏 Acknowledgments

- **Inspiration**: "Playing school like a game" mindset
- **Design**: Mobbin for UI patterns
- **Libraries**: Three.js, Framer Motion, Next.js teams
- **University**: UC San Diego students for feedback

---

## 📧 Contact

**Pavan Kumar** — [@yourtwitter](https://twitter.com/yourtwitter)

**Project Link**: [https://github.com/yourusername/n-mapper](https://github.com/yourusername/n-mapper)

---

<div align="center">

**Made with ❤️ for students who want to play school like a game**

⭐ Star this repo if you find it helpful!

</div>
