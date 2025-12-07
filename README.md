# Technical Test – Auto-Generated Blog (Assimetria)

This repository contains my implementation of the **Full-Stack Technical Challenge – Auto-Generated Blog** for Assimetria.

The project is a small full-stack application that:

- Exposes a **Node.js/Express** backend that:
  - Stores blog articles in a simple persistent JSON store
  - Provides REST endpoints to read articles
  - Uses an AI provider to **generate new articles automatically**
  - Schedules **1 new article per day** using `node-cron`
- Provides a **React + Vite** frontend that:
  - Lists all articles
  - Shows full content when an article is selected
- Is fully **Dockerized** (separate images for frontend and backend)
- Is designed to be deployed to **AWS EC2**, with images built and pushed by **AWS CodeBuild** into **ECR**, then pulled and run on EC2 via `docker-compose`.

You can find the three main parts in:

- `client/` – React frontend
- `server/` – Node.js backend
- `infra/` – Build & deployment configuration (CodeBuild + docker-compose)

---

## 1. Live URL & Submission

- **Live URL (EC2):**  
  [http://16.171.253.245/](http://16.171.253.245)


- **GitHub Repository:**  
  `https://github.com/ronrustemi123/Technical-Test-Assimetria`

- **Video (30–120 seconds):**  
  `https://<video-link>`


---

## 2. Tech Stack

### Frontend

- **React 19** + **Vite**
- **TypeScript**
- **React Router v7**
- **Tailwind CSS v4** + **Shadcn**
- Deployed as a **Docker container** (served on port 80 inside container)

### Backend

- **Node.js** (ES modules)
- **Express**
- **CORS**
- **node-cron** – for daily article generation
- **dotenv** – for environment variables
- Deployed as a **Docker container** (default port: `4000`)

### Storage

- Simple **JSON file** used as a persistent data store on the EC2 instance.  
  (Using JSON for the sake of simplicity)

### AI / Text Generation

- Backend integrates with an **OpenAI API** (configured via environment variables).

---

## 3. Application Overview

### Frontend (React)

The frontend provides:

- A **Home page** that:
  - Displays a list of articles fetched from the backend
  - Allows filtering by category
  - Shows the latest article as a “Featured Article” hero
- An **Article page**:
  - Fetched by ID using React Router’s data loaders
  - Displays the full content of the selected article

Routing is handled via **React Router v7** with loaders that fetch data from `/articles` and `/articles/:id`.

### Backend (Node.js / Express)

The backend exposes REST endpoints under `/articles`:

- `GET /articles`
  - Returns the list of all articles
  - Supports pagination on the server side (offset/limit) for potential infinite scroll / “load more” on the frontend.
- `GET /articles/:id`
  - Returns a single article by its `id`.
- [`POST /articles/generate` (optional/manual trigger)]
  - When present, triggers generation of a new article using the AI client and persists it.

Articles are stored in a JSON file on disk (e.g., under a `db`/data folder). The backend reads and writes this file to maintain persistence.

---

## 4. Automatic Article Generation (Scheduling)

To satisfy:

> “Automatically generate 1 new article per day”  
> “Already contain at least 3 articles when we check it”

The backend uses **`node-cron`**:

- A scheduler is configured in `server/services/scheduler.js` (imported and called from `server/index.js`):
  - On startup, it schedules a **daily job** that:
    1. Calls the AI client to generate a new article (title, headline, content, category).
    2. Appends the new article to the JSON data store.
- The repository includes **initial seed articles** so that at least 3 articles exist even on first deployment.

You can also manually trigger article generation (depending on the route you expose) for testing.

---

## 5. Infrastructure & Deployment (AWS + Docker)

### Docker Images

Both frontend and backend have **separate Dockerfiles** (in `client/` and `server/` respectively). Images are built by **CodeBuild** and pushed to **ECR**.

- Backend image:  
  `452202271953.dkr.ecr.eu-north-1.amazonaws.com/auto-blog-backend:<tag>`
- Frontend image:  
  `452202271953.dkr.ecr.eu-north-1.amazonaws.com/auto-blog-frontend:<tag>`

A **docker-compose** file is provided in `infra/docker-compose.yml` and is used on the EC2 instance to run both services together.

### `infra/buildspec.yml` (AWS CodeBuild)

`infra/buildspec.yml` defines the CodeBuild pipeline:

- Logs into ECR
- Builds backend & frontend Docker images from `./server` and `./client`
- Tags images both with the commit hash and `latest`
- Pushes both tags to ECR

This matches the required flow:

1. **Push code to GitHub**
2. **CodeBuild**:
   - Pulls repo
   - Builds Docker images
   - Pushes to **ECR**
3. **EC2**:
   - Pulls latest images from ECR
   - Runs them via `docker-compose`

### `infra/docker-compose.yml` (EC2 runtime)

The EC2 instance uses `docker-compose` to orchestrate the two containers:

- **Backend service**
  - Image: `auto-blog-backend:latest`
  - Port mapping: `4000:4000`
  - Loads environment from `backend.env`
- **Frontend service**
  - Image: `auto-blog-frontend:latest`
  - Depends on backend
  - Port mapping: `80:80`

A typical deployment flow on EC2:

```bash
# On EC2
git clone https://github.com/ronrustemi123/Technical-Test-Assimetria.git
cd Technical-Test-Assimetria/infra

# Log in to ECR (same command as in buildspec)
aws ecr get-login-password --region eu-north-1 \
  | docker login --username AWS --password-stdin 452202271953.dkr.ecr.eu-north-1.amazonaws.com

# Pull latest images
docker pull 452202271953.dkr.ecr.eu-north-1.amazonaws.com/auto-blog-backend:latest
docker pull 452202271953.dkr.ecr.eu-north-1.amazonaws.com/auto-blog-frontend:latest

# Start containers
docker compose up -d
