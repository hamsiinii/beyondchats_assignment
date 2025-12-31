# the assignment round for the position of Full Stack Web Developer Intern at BeyondChats.

## Work in Progress

This project is being actively developed as part of the BeyondChats internship assignment.

## Project Overview

A full-stack application that:

1. Scrapes articles from BeyondChats blogs
2. Uses AI to rewrite articles based on top-ranking Google results
3. Displays original and updated articles in a responsive UI

## Tech Stack

**Backend:** Node.js, Express, Prisma, PostgreSQL  
**Frontend:** React, Vite, TailwindCSS  
**AI:** Claude API  
**Deployment:** Render (Backend), Vercel (Frontend)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm

### Setup

1. **Clone or download the project**

```bash
   cd beyondchats_assignment
```

2. **Install dependencies**

```bash
   npm install
```

3. **Set up Prisma**

   Prisma is used for database interaction.

   1. install Prisma

```bash
npm install -g prisma
```

2. Initialize the database

```bash
   npx prisma migrate dev --name init
```

3. Generate Prisma client

```bash
npx prisma generate
```

4. **Configure environment variables**

Create a .env file in backend/:
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
PORT=3000

5. **Run the scraper**

```bash
   node src/scripts/runScraper.js
```

this is for phase 1.

6. **Start the server**

```bash
    node src/server.js
```

## System Flow Diagram

![System Flow Diagram](diagrams/Group 22.png)

## Live Links

- Frontend: _Deploying soon_
- Backend API: _Deploying soon_

---

**Last Updated:** December 31, 2024
