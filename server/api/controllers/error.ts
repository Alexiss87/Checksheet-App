'use strict';

function errorHandler(error, request, response, next) {
  console.log(error);
  return response.status(error.status || 500).json({
    error: {
      status: error.status || 500,
      message: error.message || 'Ooops somethiing went wrong'
    }
  });
}
module.exports = errorHandler;
