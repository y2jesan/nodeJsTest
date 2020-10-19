const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-Jsdoc');

const options = {
    openapi: "3.0.1",
    swaggerDefinition : {
        info : {
            title: 'Text Node Js API',
            version: '1.0.0',
            description: 'Test Node Js Project using Express with Mongo DB.'
        },
        servers: ['http://localhost:3000'],
        basePath: '/',        
        securityDefinitions:{
            ApiKeyAuth:{
                type: 'apiKey',
                in: 'header',
                name: 'auth-token'
            }
        },
        security: [
            {
                apiKey : []
            }
        ]
    },
    apis: ['index.js','./Routes/posts.js','./Routes/auth.js','./Routes/verifyToken.js']
};

const specs = swaggerJsdoc(options);
module.exports = (app) => {
    app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(specs));
};