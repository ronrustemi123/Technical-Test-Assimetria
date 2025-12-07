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
