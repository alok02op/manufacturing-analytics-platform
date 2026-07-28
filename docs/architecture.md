# Manufacturing Analytics Platform - Architecture

## Overview

The project follows a layered architecture to keep the codebase modular, scalable, and maintainable.

```
                React Frontend
                      │
                HTTP (REST API)
                      │
              Express Backend
                      │
        ┌─────────────┴─────────────┐
        │                           │
     Middleware                 Routes
                                    │
                               Controllers
                                    │
                                Services
                                    │
                              Repositories
                                    │
                              Prisma Client
                                    │
                               PostgreSQL
```

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM

### Database

- PostgreSQL

---

## Project Structure

### Backend

```
backend/
├── prisma/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── prisma/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
```

### Frontend

```
frontend/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
```

---

## Current Architecture

### Backend

- Express server initialized
- Global middleware configured
- Health endpoint implemented
- Prisma connected to PostgreSQL
- Layered folder structure prepared

### Frontend

- React application initialized
- Tailwind CSS configured
- React Router configured
- Axios client configured
- Shared dashboard layout created

---

## Planned Modules

- Authentication (JWT)
- User Management
- Factory Management
- Production Lines
- Machine Management
- Sensor Data Processing
- CSV Upload Pipeline
- Production Analytics
- Dashboard & Reports

---

## Development Principles

- Layered architecture
- Separation of concerns
- Environment-based configuration
- Type-safe APIs
- Reusable UI components
- Scalable folder structure
- Prisma as the data access layer