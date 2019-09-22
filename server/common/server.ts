import express from 'express';
import { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';
import swaggerify from './swagger';
import l from './logger';
import Mongoose from './mongoose';
import { HttpError } from './errors';
import * as HttpStatus from 'http-status-codes';
import { NextFunction } from 'connect';
const errorHandler = require('../api/controllers/error');
const cors = require('cors');

const app = express();
const mongoose = new Mongoose();
const expressSwagger = require('express-swagger-generator')(app);

let options = {
  swaggerDefinition: {
    info: {
      description: 'This is rest api for Checksheets',
      title: process.env.APP_Id,
      version: '1.0.0'
    },
    host: `localhost:${process.env.PORT}`,
    basePath: '/api/v1',
    produces: ['application/json'],
    schemes: ['http', 'https'],
    securityDefinitions: {}
  },
  basedir: __dirname, //app absolute path
  files: ['.././api/controllers/examples/*.ts'] //Path to the API handle folder
};
expressSwagger(options);

export default class ExpressServer {
  constructor() {
    const root = path.normalize(__dirname + '/../..');
    //app.set('appPath', root + 'client');
    app.use(bodyParser.json());
    //app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(express.static(`${root}/public`));
    app.use(cors());
  }

  router(routes: (app: Application) => void): ExpressServer {
    l.info(`routes : ${routes}`);
    //swaggerify(app, routes);
    routes(app);

    app.use(function(req, res, next) {
      let err = new HttpError(HttpStatus.NOT_FOUND);
      next(err);
    });
    this.initErrorHanler(app);
    return this;
  }

  private initErrorHanler(app): void {
    app.use(errorHandler);
    ///return this;
  }

  listen(p: string | number = process.env.PORT): Application {
    const welcome = port => () =>
      l.info(
        `up and running in ${process.env.NODE_ENV ||
          'development'} @: ${os.hostname()} on port: ${port}}`
      );
    http.createServer(app).listen(p, welcome(p));
    mongoose.init();
    return app;
  }
}
