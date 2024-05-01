const { Router } = require('express');
const { serve, setup } = require('swagger-ui-express');
const docrouter = Router();
const dotenv = require('dotenv');

dotenv.config();
const local = process.env.LOCAL_HOST;
const heroku = process.env.DB_CONNECT;

const options = {
    openapi: '3.0.1',
    info: {
        title: 'Miracle Center',
        version: '1.0.0',
        description: 'Church Backend',
    },
    host: process.env.NODE_ENV === 'production' ? heroku : local, // Corrected line
    basePath: '/api',
    security: [
        {
            bearerAuth: [],
        }
    ],
    tags: [
        { name: 'Users', description: 'Users' },
        { name: 'Blog', description: 'Blogs' },
        { name: 'Message', description: 'Messages' }
    ],
    components: {
        schemas: {
            User: {
                type: 'object',
                properties: {
                    username: {
                        type: 'string'
                    },
                    email: {
                        type: 'string',
                        format: 'email'
                    },
                    password: {
                        type: 'string'
                    }
                },
                required: ['username', 'email', 'password']
            }
        }
    },
    paths: {
        '/users/signup': { // Corrected path
            post: {
                tags: ['Users'],
                description: 'User SignUp',
                security: [],
                parameters: [],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/User',
                            },
                            example: {
                                username: 'John Doe',
                                email: 'admin@gmail.com',
                                password: '123456',
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    201: {
                        description: 'New User was created successfully',
                    },
                    400: {
                        description: 'Bad Request',
                    },
                    500: {
                        description: 'Internal Server Error'
                    }
                },
            },
        },
    }
}

docrouter.use('/', serve); // Changed
docrouter.get('/', setup(options)); // Changed
module.exports = docrouter;
