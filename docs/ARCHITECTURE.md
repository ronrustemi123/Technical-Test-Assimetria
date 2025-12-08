# Architecture Documentation


## Project Overview


**Technical-Test-Assimetria** is a full-stack application with a clear separation between client (frontend) and server (backend), along with infrastructure configuration. The project integrates OpenAI's API for AI-powered functionality.


## System Architecture

### High-Level Architecture

```
┌────────────────────────────────────────────────────────────┐
│                       Client (Frontend)                    │
│                                                            │
│  ┌────────────────────────────────────────────────────┐    │
│  │         React/TypeScript Application               │    │
│  │                                                    │    │
│  │  - User Interface Components                       │    │
│  │  - State Management                                │    │
│  │  - API Client                                      │    │
│  └────────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────┘
                           │
                           │ HTTP/REST
                           │
┌─────────────────────────▼────────────────────────────────┐
│                     Server (Backend)                     │
│                                                          │
│  ┌──────────────────────────────────────────────────┐    │
│  │         Node.js/TypeScript Server                │    │
│  │                                                  │    │
│  │  - Express.js API Routes                         │    │
│  │  - Business Logic                                │    │
│  │  - Node Cron Job                                 │    │
│  │  - OpenAI Integration                            │    │
│  │  - Error Handling & Validation                   │    │
│  └──────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
                           │
                           │ API Calls
                           │
┌─────────────────────────▼────────────────────────────────┐
│                  External Services                       │
│                                                          │
│  ┌──────────────────────────────────────────────────┐    │
│  │            OpenAI API                            │    │
│  │  - GPT Models                                    │    │
│  │  - Text Generation                               │    │
│  └──────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
```

## Directory Structure

```
Technical-Test-Assimetria/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page-level components
│   │   ├── assets/        # Assets
│   │   ├── misc/          # Miscellaneous functions
│   │   ├── types/         # TypeScript types
│   │   ├── lib/           # Library modules
│   │   └── App.tsx        # Main application component
│   ├── public/            # Static assets
│   ├── package.json       # Frontend dependencies
│   ├── Dockerfile         # Dockerfile
│   └── tsconfig.json      # TypeScript configuration
│
├── server/                # Backend application
│   ├── src/
│   │   ├── routes/        # API route handlers
│   │   ├── controllers/   # Business logic controllers
│   │   ├── services/      # Service layer (OpenAI integration)
│   │   └── index.js      # Server entry point
│   ├── .env               # Environment variables
│   ├── package.json       # Backend dependencies

│
├── infra/                 # Infrastructure configuration
│   ├── buildspec.yml      # Build specifications
│   ├── docker-compose.yml # Docker compose specifications
│   └── scripts/           # Deployment scripts
│
├── .gitignore
└── README.md
```

## Technology Stack

### Frontend (Client)

- **Framework**: React
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS + Shadcn

### Backend (Server)

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: JavaScript
- **Port**: 4000
- **External API**: OpenAI API

### Infrastructure

- **Version Control**: Git/GitHub
- **Package Manager**: npm
- **Environment Management**: dotenv

## API Integration

### OpenAI Integration

```javascript
Environment Variables:
- OPENAI_API_KEY: API authentication key
- PORT: Server port (default: 4000)

Flow:
1. Backend receives request from node cron job
2. Service layer formats request for OpenAI
3. Makes API call to OpenAI endpoints
4. Processes and validates response
5. Returns formatted data to frontend
```

## Development Workflow

### Local Development Setup

1. **Clone Repository**

```bash
   git clone https://github.com/ronrustemi123/Technical-Test-Assimetria.git
   cd Technical-Test-Assimetria
```

2. **Backend Setup**

```bash
   cd server
   npm install
   # Create .env file with required variables
   npm run dev
```

3. **Frontend Setup**

```bash
   cd client
   npm install
   npm run dev
```

### Development Ports

- **Frontend**: Typically runs on port 5173 (Vite default)
- **Backend**: Runs on port 4000 (configurable)

## Security Considerations

### Environment Variables

- OpenAI API key stored securely in `.env`
- `.env` file excluded from version control via `.gitignore`
- Environment-specific configurations

## Future Enhancements

### Potential Improvements

1. **Database Integration**: Add persistent storage layer
2. **Authentication**: Implement user authentication/authorization
3. **Caching**: Redis for API response caching
4. **Testing**: Comprehensive unit and integration tests
5. **CI/CD**: Automated testing and deployment pipelines

## Development Best Practices

### Code Organization

- TypeScript for type safety
- Modular component architecture
- Separation of concerns
- Single responsibility principle

### Version Control

- Feature branch workflow
- Meaningful commit messages
- Pull request reviews
- Semantic versioning
