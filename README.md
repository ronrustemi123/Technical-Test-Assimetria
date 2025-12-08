# Full-Stack Technical Challenge – Auto-Generated Blog (AWS + Docker)

A full-stack auto-generated blog web application that continuously publishes fresh AI-generated articles. The frontend is built with React, and the backend uses Node.js + Express with a daily article generator powered by OpenAI API. All services are fully containerized using Docker and deployed on AWS using CodeBuild, ECR, and EC2.

---

## Tech Stack
- [React](https://react.dev/) – React framework
- [TypeScript](https://www.typescriptlang.org/) – Type safety
- [Tailwind CSS](https://tailwindcss.com/) – Styling
- [Shadcn](https://ui.shadcn.com/) - Components Library
- [Node.js](https://nodejs.org/en) - JavaScript runtime environment
- [Docker](https://www.docker.com/) - Container service provider
- [AWS](https://aws.amazon.com/) - Cloud hosting provider

---

## Run locally (Development Mode)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/ronrustemi123/Technical-Test-Assimetria.git
cd Technical-Test-Assimetria
```

### 2️⃣ Start the backend
```bash
cd server
npm install
```
#### Create environment variables
##### For Windows PowerShell
```bash
ni .env
```
##### For Windows CMD
```bash
type nul > .env
```
##### For Linux/MacOS
```bash
touch .env
```
#### Edit `.env` and set:
```ini
OPENAI_API_KEY=your_api_key_here
PORT=4000
```
#### Start backend
```bash
npm run dev
```

### 3️⃣ Start the Frontend
#### Open a new terminal:
```bash
cd client
npm install
```

#### Start frontend:
```bash
npm run dev
```
