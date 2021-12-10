// Extended: https://swagger.io/specification/
// swagger object

//const swaggerOptions={
//	swaggerDefinition:{
//		info:{
//			title:'Customer API',
//			description:"Customer API Information",
//			contact:{
//				name:"Amazing Developer"
//		    },
//			servers: ["http://localhost:3000"]
//		}
		
//	},
//	// ['./routes/*.js'] // documenatation
//    apis:["app.js"] // Tell the documentor where to look for api
//}

//const swaggerDocs=swaggerJsDoc(swaggerOptions);




//server.register([
//	inert,
//	vision,
//	{
//		register:swaggered,
//		options: {
//			info: {
//				title:'Customer API',
//				description:"Customer API Information",
//				contact:{
//					name:"Amazing Developer"
//				},
//				version:'1.0',
//			},
//		},
//	},
//	{
//		register: swaggeredUI,
//		options: {
//			title:'Customer API',
//			path: '/api-docs',
//			swaggerOptions: {
//				validatorUrl: null,
//			},
//		},
//	}
//],(err)=>{
//	if(err){
//		throw err;
//	}
//	console.log(`Server running at:${server.info.uri} `);
//});


'use strict'

const Hapi = require("hapi");
//const { required } = require("joi");
const Joi = require("@hapi/joi");
//const swaggerJsDoc=require("swagger-jsdoc");
const swaggerUi=require("hapi-swagger");
//const swaggered = require('hapi-swaggered');
//const swaggeredUI = require('hapi-swaggered-ui');
const Vision = require('@hapi/vision')
const Inert = require('@hapi/inert');
//import inert from '@hapi/inert'



const server = new Hapi.Server({ port: 3000, host: 'localhost' });


server.route({
    method: 'GET',
    path: '/{name}',
	options: {
		tags: ['api'],
        description: 'Says hello!',
        notes: 'Some important notes when using this',
	},
    handler: async (request, h)=> {
        return (`Hello, ${request.params.name}!`);
		//return "Hello World";
    },
   
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {

        return 'Hello World!';
    },
});

server.route({
    method:'GET',
    path:'/account/{user}',
    handler: function (request, h) {

        var accountMock={};
        if(request.params.user=="Sidharth"){
            accountMock={
                "user":"Sidharth",
                "Password":"1234",
                "Website":"Changekaro.com"
            }    
        }
        return accountMock;
        // return `Hello ${request.params.user}!`;
    }
});

//server.route({
//    method:"POST",
//    path:"/account",

//    options:{
//        auth:false,
//        validate:{
//            payload:{
               
//            }
//        }
        
//    },
   
//    handler: function (request, h) {

//        const payload = request.payload;

//        return `Welcome ${payload.username}!`;
//    },
    
    
//});


const swaggerOptions ={
	info: {
		title:'Customer API',
		version:'1.0',

	}
}


const init = async () => {

    await server.register([
		Inert,
		Vision,
		{
			plugin: swaggerUi,
			options: swaggerOptions
		}
	]);

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};



init();



//server.start(error=>{
//    if(error){
//        throw error;
//    }
//    console.log("Listening at" + server.info.uri);
//});

// options: {
//     auth: false,
//     validate: {
//         payload: {
//             // username: Joi.string().min(1).max(20)
//         }
//     }
// }

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

(async () => {
    const server =  new Hapi.Server({
        host: 'localhost',
        port: 3000,
    });

    const swaggerOptions = {
        info: {
                title: 'Test API Documentation',
                version: '1.0',
            },
        };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch(err) {
        console.log(err);
    }

	server.route({
		method: 'GET',
		path: '/',
		handler: function (request, h) {
	
			return 'Hello World!';
		},
	});
})();


//======================================//

const Hapi = require("hapi");
const Inert = require('inert');
const Vision = require('vision');
const Joi = require("joi");
const Pino=require('hapi-pino');
const HapiSwagger = require("hapi-swagger");

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
		load: { sampleInterval: 1000 } 

    });

    
	const swaggeroptions = {
		info: {
		  title: "Test API Documentation",
		  version: "0.0.1"
		}
	  };
	  
	server.register(require('vision'), (err) => {
 
		if (err) {
			console.log("Failed to load vision.");
		}
	});
    server.route({
		method: 'GET',
		path:'/',
		handler: function (request, h) {	
			return 'Hello World!';
		},
	})
	await server.start();
    console.log('Server running on %s', server.info.uri);
};

init();
