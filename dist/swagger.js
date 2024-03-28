const port = process.env.PORT;
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
                url: `http://localhost:${port}`
            }
        ],
    },
    apis: ['./src/router/*.ts'],
};
export default swaggerOptions;
