'use strict'

const Hapi=require('hapi')
const Inert = require('inert');
const Vision = require('vision');
const Joi = require('joi');
const HapiSwagger = require('hapi-swagger');
const HapiPino = require('hapi-pino');
const pkg=require('./package.json');

const server = new Hapi.Server({ port: 3000, host: 'localhost' });

const options = {
    info: {
        'title': 'Test API Documentation',
        'version': pkg.version,
    }
};
const plugins=[Inert,Vision,HapiSwagger];
const init = async () => {


	await server.register([
		Inert,
		Vision,
		HapiPino,
		{
			plugin:HapiSwagger,
			options:options
		}
	]);

	server.route({
		method: 'GET',
		path: '/test',
		
		handler: function (request, h) {

			return 'test passed';
		}
	});

	server.route({
		method: 'GET',
		path: '/todo/{id}/',
		handler: function (request, h) {

			return 'test failed';
		},
		options: {
			description: 'Get todo',
			notes: 'Returns a todo item by the id passed in the path',
			tags: ['api'], // ADD THIS TAG
			validate: {
				params: Joi.object({
					id : Joi.number()
							.required()
							.description('the id for the todo item'),
				})
			}
		},
	});

	server.route({
		path: '/api/add',
		method: 'POST',
		config: {
			handler: (request, h) => {
				var sum = parseInt(request.payload.a) + parseInt(request.payload.b);
				return h.response(sum);
			},
			description: 'Get algebraic sum',
			notes: 'Pass two numbers as a & b and returns sum',
			tags: ['api'],
			validate: {
				payload: {
					a : Joi.number()
							.required(),
					b : Joi.number()
							.required(),
				}
			}
		}
	});

   
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init();
