# InvoTrack - Smart Warehouse Management System

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8.svg)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-5-green.svg)](https://vitejs.dev)

## 🚀 Features

**InvoTrack** is a modern inventory management system built with React, TypeScript, TailwindCSS and shadcn/ui components.

- 📦 **Product Management** - Full catalog with SKU tracking
- 📥 **Goods Receipts** - Supplier deliveries & stock updates
- 📤 **Delivery Orders** - Outgoing shipments & stock reduction
- 🔄 **Internal Transfers** - Multi-location movement
- ⚖️ **Stock Adjustments** - Count corrections
- 📊 **Real-time Dashboard** - KPIs & recent movements
- 👤 **Profile Management** - Avatar upload, editable profile, role selection
- 🔐 **Auth Ready** - Supabase integration
- 📱 **Responsive** - Mobile-first design
- 🎨 **Modern UI** - shadcn/ui + TailwindCSS + Framer Motion animations

## 🖼️ Screenshots

| Dashboard | Profile | Login |
|-----------|---------|-------|
| ![Dashboard](public/screenshot-dashboard.png) | ![Profile](public/screenshot-profile.png) | ![Login](public/screenshot-login.png) |

## 🚀 Quick Start

```bash
# Clone the repo
git clone <your-repo-url>
cd stock-harmony-main

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

**Local:** http://localhost:8080

## 📁 Project Structure

```
stock-harmony-main/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   └── TopNavBar.tsx   # Navigation bar
│   ├── pages/              # Page components
│   │   ├── Dashboard.tsx   # Main dashboard
│   │   ├── Profile.tsx     # User profile
│   │   └── Login.tsx       # Authentication pages
│   ├── hooks/              # Custom React hooks
│   └── integrations/       # Supabase auth
├── tailwind.config.ts      # TailwindCSS config
└── vite.config.ts          # Vite config
```

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18, TypeScript 5 |
| **Styling** | TailwindCSS 3, shadcn/ui |
| **Build** | Vite 5 |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Auth** | Supabase |
| **State** | React Query (ready) |
| **Forms** | React Hook Form (ready) |

## 🔧 Development

### Scripts

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Lint code
npm run format    # Format code
```

### Environment Variables

Create `.env` file:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
```

### Adding shadcn/ui Components

```bash
npx shadcn-ui@latest add button
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repo in Vercel
3. Set env vars
4. Deploy!

### Netlify

1. Connect GitHub repo
2. Build: `npm run build`
3. Publish: `dist`

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm ci --only=production
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is MIT licensed.

## 🙏 Acknowledgments

Built with ❤️ using:
- [shadcn/ui](https://ui.shadcn.com)
- [TailwindCSS](https://tailwindcss.com)
- [Vite](https://vitejs.dev)
- [Supabase](https://supabase.com)
- [Lucide Icons](https://lucide.dev)

---

⭐ **Star this repo if you found it useful!**

