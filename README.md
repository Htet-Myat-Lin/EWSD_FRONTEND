# EWSD Frontend

A React frontend application built with Vite for the UOG Final Year EWSD project.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 16 or higher)
- npm (comes with Node.js) or yarn
- Git

## How to Clone and Install Dependencies

### 1. Clone the Repository

```bash
git clone <repository-url>
cd EWSD_FRONTEND
```

### 2. Install Dependencies

```bash
npm install
```

Alternatively, if you prefer yarn:
```bash
yarn install
```

### 3. Start the Development Server

```bash
npm run dev
```

The application will typically be available at `http://localhost:3000`

## Troubleshooting

### Merge Conflicts After Cloning

If you encounter merge conflict markers (like `<<<<<<< HEAD`, `=======`, `>>>>>>>`) in your files after cloning, follow these steps:

1. **Check for conflicted files:**
   ```bash
   git status
   ```

2. **Resolve conflicts in affected files:**
   - Open the conflicted file(s) in your editor
   - Remove the conflict markers (`<<<<<<< HEAD`, `=======`, `>>>>>>>`)
   - Choose which version of the code to keep
   - Save the file

3. **Stage the resolved files:**
   ```bash
   git add <resolved-files>
   ```

4. **Complete the merge:**
   ```bash
   git commit
   ```

5. **Then install dependencies:**
   ```bash
   npm install
   ```

### Alternative: Reset to Clean State

If merge conflicts persist, you can reset to a clean state:

```bash
git reset --hard HEAD
npm install
```

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **HeroUI** - React component library
