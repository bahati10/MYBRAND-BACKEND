import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const port = process.env.PORT

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PORTFOLIO API',
      version: '1.0.0',
      description: 'API documentation for my Portfolio',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Local Development Server',
      },
      {
        url: 'https://mybrand-backend-2-hey7.onrender.com',
        description: 'Production Server',
      }
    ],
  },
  apis: ['./src/router/*.ts'],
};

  

export default swaggerOptions;
