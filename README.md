# Blog Application

A full-stack blog application with user authentication, CRUD operations for blog posts, and blog sharing functionality.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Setup](#setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Prisma Schema](#prisma-schema)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [User](#user)
  - [Blogs](#blogs)
- [Frontend Structure](#frontend-structure)
- [Screenshots](#screenshots)
  - [Home Page](#home-page)
  - [User Dashboard](#user-dashboard)
  - [Create New Blog](#create-new-blog)
- [Deployed URLs](#deployed-urls)

## Features

- User registration and authentication
- Create, read, update, and delete blog posts
- Share blogs with other users
- Search blogs/ filtering
- User dashboard
- Responsive design
- Dark mode toggle

## Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma (ORM)
- PostgreSQL
- JSON Web Tokens (JWT) for authentication

### Frontend
- React
- Redux Toolkit for state management
- React Router for navigation
- Material-UI for styling
- Axios for API requests

## Setup

### Backend Setup

1. Clone the repository:
   ```
   git clone https://github.com/shubhsardana29/vecros-blog-app
   cd vecros-blog-app/backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your PostgreSQL database and update the `.env` file:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/blogdb?schema=public"
   JWT_SECRET="your-secret-key"
   PORT=5000
   ```
4. Run Prisma migrations:
   ```
   npx prisma migrate dev
   ```
5. Start the server:
   ```
   npm run dev
   ```
The server will start on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd ../blog-frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React app:
   ```
   npm run dev
   ```
The application will open in your default browser at `http://localhost:3000`.

## Prisma Schema

```prisma
generator client {
provider = "prisma-client-js"
}

datasource db {
provider = "postgresql"
url      = env("DATABASE_URL")
}

model User {
id        Int      @id @default(autoincrement())
email     String   @unique
password  String
name      String
blogs     Blog[]
sharedBlogs SharedBlog[]
}

model Blog {
id        Int      @id @default(autoincrement())
title     String
content   String
category  String
authorId  Int
author    User     @relation(fields: [authorId], references: [id])
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
sharedWith SharedBlog[]
}

model SharedBlog {
id        Int      @id @default(autoincrement())
blogId    Int
blog      Blog     @relation(fields: [blogId], references: [id])
userId    Int
user      User     @relation(fields: [userId], references: [id])
permission String
}
```
## API Endpoints

### Authentication
- POST /auth/register: Register a new user
 ```
{
    "name": "Shubh",
    "email": "shubh@example.com",
    "password": "password"
}
```
- POST /auth/login: Login user
```
{
    "email": "johnupdated@ecena.com",
    "password": "securepassword1234"
}
```

## User
- GET /users/profile: Get user profile
- PUT /users/profile: Update user profile

## Blogs

- GET /blogs: Get all blogs
- GET /blogs/:id: Get a specific blog
  
- POST /blogs: Create a new blog
  ```
  {
     "title": "My First Blog Post",
     "content": "This is the content of my first blog post.",
     "category": "Technology"
  }
  ```
  
- PUT /blogs/:id: Update a blog
  ```
  {
     "title": "Updated Blog Post"",
     "content": "This is the updated content of my blog post.",
     "category": "Fintech"
  }
  ```
- DELETE /blogs/:id: Delete a blog
- POST /blogs/share: Share a blog with another user
  ```
  {
    "blogId": 6,
    "userId": 3,              // userid of person you want to share a particular blog with
    "permission": "edit"       // type of permission: 'view' || 'edit'
  }
  ```
  
- GET /blogs/shared: Get shared blogs with you
- GET /blogs/category/:category: Get blogs by category


## Frontend Structure
```
src/
├── components/
│   ├── Auth/
│   ├── Blog/
│   ├── Common/
│   ├── Dashboard/
│   └── Layout/
├── pages/
├── redux/
│   ├── slices/
│   └── thunks/
├── services/
├── types/
├── utils/
├── App.tsx
└── main.tsx

```

## Screenshots

### Home Page
![Screenshot 2024-06-30 at 3 54 17 PM](https://github.com/shubhsardana29/vecros-blog-app/assets/52607235/ea70fb2f-0836-4100-a66b-8b1d92bc32e2)

### User Dashboard
![Screenshot 2024-06-30 at 3 56 55 PM](https://github.com/shubhsardana29/vecros-blog-app/assets/52607235/a6d2165d-e3bb-4679-8640-b4d372add4d7)

### Create New Blog 
![Screenshot 2024-06-30 at 3 57 54 PM](https://github.com/shubhsardana29/vecros-blog-app/assets/52607235/14caf41f-64f3-4519-b402-4b5b80960e8f)

## Deployed URLs

- Backend API: [https://vecros-blog-app-cyzb.onrender.com](https://vecros-blog-app-cyzb.onrender.com)
- Frontend Application: [https://vecros-blog-app-redux.netlify.app](https://vecros-blog-app-redux.netlify.app/)

