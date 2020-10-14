const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-Jsdoc');

const options = {
    swaggerDefinition : {
        info : {
            title: 'Text Node Js API',
            version: '1.0.0',
            description: 'Test Node Js Project using Express with Mongo DB.'
        },
        servers: ['http://localhost:3000'],
        basePath: '/'
    },
    apis: ['index.js','./Routes/posts.js']
};

const specs = swaggerJsdoc(options);
module.exports = (app) => {
    app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(specs));
};