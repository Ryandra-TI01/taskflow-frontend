# TaskFlow Client (React + Vite)

The frontend client for TaskFlow, built to provide a seamless and responsive user experience. It leverages **Shadcn UI** for a polished aesthetic and **React Query** for efficient server state management.

## Features

- **Modern UI:** Built with Tailwind CSS and Shadcn UI (Radix Primitives).
- **Responsive Dashboard:** Sidebar navigation with specialized views (Inbox, Completed).
- **Infinite Scroll:** Efficient loading for large task lists.
- **Analytics:** Interactive charts visualizing productivity.
- **Calendar View:** Month and Week views for task planning.
- **Dark Mode Support:** Fully theme-aware components.

## Tech Stack

- **Core:** React 18, Vite
- **Language:** JavaScript / TypeScript (Hybrid)
- **Styling:** Tailwind CSS, Shadcn UI, Lucide Icons
- **State Management:** TanStack Query (React Query) v5
- **Routing:** React Router DOM v6
- **Forms:** React Hook Form (Planned) / Controlled Components

## Installation & Usage

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file in the root of `react-todo` if specific config is needed (defaults usually work for local dev).
```env
VITE_API_BASE_URL=http://localhost:8000
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

## Key Directories

- `src/components/ui` - Shadcn UI reusable components.
- `src/components/tasks` - Task-specific logic (Forms, Lists).
- `src/pages` - Main route views (TaskPage, Analytics, Calendar).
- `src/hooks` - Custom hooks (useTasks, useAuth).
- `src/context` - Global providers (AuthContext, TaskEditContext).
