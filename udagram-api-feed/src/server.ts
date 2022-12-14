import cors from 'cors';
import express from 'express';
import {sequelize} from './sequelize';

import {IndexRouter} from './controllers/v0/index.router';

import bodyParser from 'body-parser';
import {config} from './config/config';
import {V0_FEED_MODELS} from './controllers/v0/model.index';


(async () => {
    await sequelize.addModels(V0_FEED_MODELS);


    console.debug("Initialize database connection...");
    await sequelize.sync();

    const app = express();
    const port = process.env.PORT || 8080;

    app.use(bodyParser.json());

    // We set the CORS origin to * so that we don't need to
    // worry about the complexities of CORS this lesson. It's
    // something that will be covered in the next course.
   /* app.use(cors({
        allowedHeaders: [
            'Access-Control-Allow-Origin',
            'Origin', 'X-Requested-With',
            'Content-Type', 'Accept',
            'X-Access-Token', 'Authorization',
            'Access-Control-Allow-Headers',
            'Access-Control-Allow-Methods'
        ],
        methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        preflightContinue: true,
        origin: '*',
        credentials: true,

    }));*/
/*app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, 
    Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
    });*/
    app.use(cors());


    app.use('/api/v0/', IndexRouter);

    // Root URI call
    app.get( '/', async ( req, res ) => {
        res.send( '/api/v0/' );
    } );


    // Start the Server
    app.listen( port, () => {
        console.log( `server running ${config.url}` );
        console.log( `press CTRL+C to stop server` );
    } );
})();
