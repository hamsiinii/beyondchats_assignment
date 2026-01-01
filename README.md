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
**AI:** OPENAI API  
**Deployment:** Render (Backend), Vercel (Frontend)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm

### Setup

this is for phase 1.

1. **Clone or download the project**

```bash
   cd beyondchats_assignment
```

2. **Install dependencies**

```bash
npm install
npm install cors (in backend)
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

6. **Start the server**

```bash
node src/server.js
```

## For Phase 2:

7. **Get api Key from OPENAI and SerpAI**
   add to .env like:

OPEN_AI KEY = "YOUR KEY"
SERPAPI_KEY =" YOUR KEY"

8. **Install openai package**

```bash
npm instal openai
```

9. **to work with llm api and fetch 2 links**

```bash
npm run rewrite
```

## For phase 3

Although the problem statement mentions Laravel APIs, the backend was implemented using Node.js + Express with RESTful endpoints.
So, using laveral api is not considered.

10. **Run frontend and Backend**

```bash
npm run dev
```

11. **Open localhosts**

- http://localhost:5173/
- http://localhost:3000/api/articles

## System Flow Diagram

<p align="center">
  <img src="diagrams/Group 22.png" alt="System Flow Diagram" style="max-width:70%; height:auto;" />
</p>

## Live Links

## Note

⚠️ Note on OpenAI API Usage

The rewrite pipeline successfully integrates with the OpenAI API.
However, execution may fail if the OpenAI account has no active
billing or exceeds quota limits (HTTP 429).

to use other free tier API then use gemini api or any open source llm api
