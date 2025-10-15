# SvelteKit To-Do App

A modern, front-end built with **SvelteKit**. To see the backend to the this full stack web app see my other repo here :
https://github.com/Tompweston/WIL_backend

---

## 📖 About the Project

This is a productivity app where users can:

- Create, edit, and delete tasks
- Authenticate securely (login/signup)
- Store user-specific data

This is my first attempt at web dev as well as using TS, CSS and HTML.

---

## 🛠 Tech Stack

| Layer    | Technology             |
| -------- | ---------------------- |
| Frontend | SvelteKit (TypeScript) |
| Runtime  | Bun                    |
| Backend  | FastAPI + UV           |
| Database | MongoDB                |
| Auth     | Better Auth            |
| Styling  | CSS                    |

---

## ⚙️ Prerequisites

Before you begin, make sure you have bun installed:

### You can download it here

https://bun.com/

### Or check if you have bun by running the following:

```bash
bun --version
```

## 📦 Installation

1. Clone this repository using
   ```
   git clone https://github.com/Tompweston/WIL_frontend.git
   cd WIL_frontend
   ```
2. Install dependencies using:

   ```
   bun install
   ```

3. Run the project in dev mode using:
   ```
   bun run dev
   ```
   or use the following to build a preview of a production version:
   ```
   bun run ./build/index.js
   bun run preview
   ```
4. Make sure you have an instance of the backend running!!!
   You can find that here:
   https://github.com/Tompweston/WIL_backend
