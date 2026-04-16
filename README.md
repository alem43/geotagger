# Geotagger

Geotagger is a full-stack web application where users upload geotagged photos and challenge others to guess their location on an interactive map.

The closer your guess is to the real location, the higher your score.

---

## Features

- Upload geotagged images
- Interactive map guessing system
- Distance-based scoring algorithm
- Authentication (login/register)
- User profiles with uploaded locations
- Fast, optimized frontend (Vite + React)
- Full-stack architecture (frontend + backend)

---

## Tech Stack


### Frontend
- React
- TypeScript
- Vite


### Backend

- Node.js
- Hono



### Other
- Leaflet (maps)

---

## Getting Started

### Prerequisites
- Node.js
- pnpm

---

## Installation

Clone the repository:

```bash

git clone https://github.com/alem43/geotagger
cd geotagger

```

Install dependencies:

```bash
# frontend
cd web
pnpm install

# backend
cd api
pnpm install
```

---

## Running the App

Start backend:

```bash
cd api
pnpm dev

```

Start frontend:

```bash
cd web
pnpm dev
```

Frontend: http://localhost:3000
Backend: http://localhost:8787

---

## Project Structure

```

GEOTAGGER/
│
├── api/
│   ├── drizzle/
│   │   └── meta/
│   │       ├── 0000\_furry\_jack\_murdock.sql
│   │       ├── 0001\_lying\_carmella\_unuscione.sql
│   │       ├── 0002\_wise\_king\_cobra.sql
│   │       ├── 0004\_tan\_sleepwalker.sql
│   │       └── 0005\_busy\_ozymandias.sql
│   │
│   ├── node\_modules/
│   ├── src/
│   │   ├── db/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── types/
│   │   └── index.ts
│   │
│   ├── uploads/
│   ├── .env
│   ├── .gitignore
│   ├── drizzle.config.ts
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── README.md
│   ├── sqlite.db
│   └── tsconfig.json
│
├── web/
│   ├── .tanstack/
│   ├── .vscode/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── images/
│   │   ├── routes/
│   │   │   ├── auth/
│   │   │   ├── homePage/
│   │   │   └── profile/
│   │   │
│   │   ├── __root.tsx
│   │   ├── index.tsx
│   │   ├── router.tsx
│   │   ├── routeTree.gen.ts
│   │   └── styles.css
│   │
│   ├── .cta.json
│   ├── .env
│   ├── .gitignore
│   ├── .prettierignore
│   ├── eslint.config.js
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── prettier.config.js
│   ├── README.md
│   ├── tsconfig.json
│   └── vite.config.ts
```

---

## Environment Variables

Create a `.env` file inside the api folder:

```
MAPILLARY_TOKEN=
```

Create a `.env` file inside the web folder:

```
VITE_API_URL=
VITE_GEOAPIFY_KEY=
```

## License

This project is licensed under the MIT License.

