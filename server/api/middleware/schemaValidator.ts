const _ = require('lodash');
const Joi = require('@hapi/joi');
const Schemas = require('./schemas');
import l from '../../common/logger';

module.exports = (useJoiError = false) => {
  // useJoiError determines if we should respond with the base Joi error
  // boolean: defaults to false
  const _useJoiError = _.isBoolean(useJoiError) && useJoiError;

  // enabled HTTP methods for request data validation
  const _supportedMethods: string[] = ['post', 'put', 'patch'];

  // Joi validation options
  const _validationOptions = {
    abortEarly: false, // abort after the last validation error
    allowUnknown: true, // allow unknown keys that will be ignored
    stripUnknown: true, // remove unknown keys from the validated data
    convert: true,
    escapeHtml: true
  };

  // return the validation middleware
  return async (req, res, next) => {
    const route = req.route.path;
    const method = req.method.toLowerCase();
    l.info(`Route: ${route}`);
    l.info(`method: ${method}`);
    let body = req.body;
    l.info(`body: ${body}`);

    if (_.includes(_supportedMethods, method) && _.has(Schemas, route)) {
      // get schema for the current route
      const _schema = _.get(Schemas, route);

      if (_schema) {
        // Validate req.body using the schema and validation options
        try {
          const result = await Joi.validate(
            req.body,
            _schema,
            _validationOptions
          );          
          // Replace req.body with the data after Joi validation
          req.body = result;
          l.info('PASSED VALIDATION');
          next();
        } catch (error) {
          const { details } = error;
          const message = details.map(i => i.message).join(',');
          l.info('FAILED VALIDATION');
          res.status(422).json({ error: message });
        }
      }
    } else {      
      l.info('Validation skipped');
      next();
    }
  };
};
