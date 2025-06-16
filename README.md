# ✨ Svelte Notes App

![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

> A stunning and modern note-taking application built with SvelteKit and TailwindCSS, featuring a beautiful glass-morphic UI, dark mode, and seamless animations.

## 🌟 Features

### Core Features
- 📝 **Full CRUD Operations** - Create, read, update, and delete notes with ease
- 🎨 **Glass-morphic UI** - Modern, translucent interface with subtle blur effects
- 🌓 **Dark/Light Mode** - Seamless theme switching with system preference detection
- 🔍 **Smart Search** - Real-time search with highlighted results
- 📱 **Responsive Design** - Perfect experience across all devices

### Advanced Features
- ⚡ **Real-time Updates** - Instant UI feedback for all operations
- 🎭 **Smooth Animations** - Polished transitions and micro-interactions
- 🔄 **Smart Sorting** - Multiple sorting options (date, title)
- 💾 **Local Storage** - Persistent theme preferences
- 🛡️ **Error Handling** - Graceful error management with user feedback

## 🚀 Quick Start

### Prerequisites

```bash
node >= 18.0.0
npm >= 7.0.0
```

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/StackOverflowed512/frontend_assign
   cd svelte-notes-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the API server**
   ```bash
   npm run api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open the app**
   ```
   http://localhost:5173
   ```

## 🛠️ Tech Stack

### Frontend
- 🎯 **SvelteKit** - Next-gen web framework
- 💅 **TailwindCSS** - Utility-first CSS framework
- 📦 **TypeScript** - Type-safe JavaScript
- 🎭 **Svelte Transitions** - Built-in animation system

### Backend & Tools
- 🔧 **JSON Server** - Mock API server
- 📝 **ESLint** - Code linting
- 🎨 **Prettier** - Code formatting
- 🧪 **Vite** - Next-gen frontend tooling

## 📱 UI Components

### Core Components
- `Header` - App navigation and theme toggle
- `NoteCard` - Beautiful glass-morphic note display
- `NoteForm` - Intuitive note creation/editing
- `Modal` - Smooth, accessible modal system

### Helper Components
- `ThemeToggle` - Animated theme switcher
- `Spinner` - Loading indicator
- `SearchBar` - Real-time search interface

## 🎯 Code Quality

```typescript
// Example of our type-safe API service
async function createNote(note: Note): Promise<Note> {
  return await api.post('/notes', note);
}
```

## 🔜 Future Enhancements

- [ ] 📊 Note Categories & Tags
- [ ] 📱 PWA Support
- [ ] 🔄 Real-time Sync
- [ ] 📎 File Attachments
- [ ] 👥 Collaborative Editing

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Svelte team for the amazing framework
- TailwindCSS team for the utility-first CSS framework
- All contributors who helped make this project better

---


