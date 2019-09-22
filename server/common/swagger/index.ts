import middleware from 'swagger-express-middleware';
import { Application } from 'express';
import path from 'path';
import l from '../logger';

export default function(app: Application, routes: (app: Application) => void) {
  middleware(path.join(__dirname, 'Api.yaml'), app, function(err, middleware) {
    l.info(`Path: ${path}`);
    l.info(`DIRNAME: ${__dirname}`);
    l.info(`path.join: ${path.join(__dirname, 'Api.yaml')}`);

    // Enable Express' case-sensitive and strict options
    // (so "/entities", "/Entities", and "/Entities/" are all different)
    app.enable('case sensitive routing');
    app.enable('strict routing');

    app.use(middleware.metadata());
    l.info(`MetaData: ${middleware.metadata}`);
    l.info(`Files: ${process.env.SWAGGER_API_SPEC}`);
    app.use(
      middleware.files(app, {
        apiPath: process.env.SWAGGER_API_SPEC
      })
    );

    app.use(
      middleware.parseRequest({
        // Configure the cookie parser to use secure cookies
        cookie: {
          secret: process.env.SESSION_SECRET
        },
        // Don't allow JSON content over 100kb (default is 1mb)
        json: {
          limit: process.env.REQUEST_LIMIT
        }
      })
    );

    // These two middleware don't have any options (yet)
    app.use(middleware.CORS(), middleware.validateRequest(), middleware.mock());

    // Error handler to display the validation error as HTML
    app.use(function(err, req, res, next) {
      res.status(err.status);
      res.send(
        '<h1>' + err.status + ' Error</h1>' + '<pre>' + err.message + '</pre>'
      );
    });

    routes(app);
  });
}
