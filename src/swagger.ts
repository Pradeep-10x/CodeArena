import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CodeArena API',
      version: '1.0.0',
      description: 'API documentation for CodeArena Backend',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://codearena-backend.onrender.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            username: { type: 'string' },
            avatar: { type: 'string' },
            skillLevel: { type: 'string' },
            role: { type: 'string' },
            globalRank: { type: 'number' },
            totalMatches: { type: 'integer' },
            matchesWon: { type: 'integer' },
            rating: { type: 'integer' },
            tokenVersion: { type: 'integer' },
            githubId: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Contest: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            startTime: { type: 'string', format: 'date-time' },
            endTime: { type: 'string', format: 'date-time' },
            status: { type: 'string' },
            creatorId: { type: 'string' },
            slug: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Question: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            difficulty: { type: 'string' },
            points: { type: 'integer' },
            testCases: { type: 'array', items: { type: 'object' } },
            timeLimit: { type: 'number' },
            memoryLimit: { type: 'number' },
            constraints: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Submission: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            code: { type: 'string' },
            language: { type: 'string' },
            status: { type: 'string' },
            metrics: { type: 'object' },
            score: { type: 'number' },
            message: { type: 'string' },
            passedCases: { type: 'integer' },
            totalCases: { type: 'integer' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Match: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            player1Id: { type: 'string' },
            player2Id: { type: 'string' },
            winnerId: { type: 'string' },
            status: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            endTime: { type: 'string', format: 'date-time' },
          },
        },
        Otp: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            otp: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            expiresAt: { type: 'string', format: 'date-time' },
          },
        },
        Session: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            userId: { type: 'string' },
            device: { type: 'string' },
            ip: { type: 'string' },
            location: { type: 'string' },
            lastLogin: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/swagger.ts'], // Path to the API docs
};

export const swaggerSpec = swaggerJSDoc(options);
