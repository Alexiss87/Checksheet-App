// load Joi module
const joi = require('@hapi/joi');

const checkSheetDataSchema = joi.object().keys({
  comments: joi.array().items(
    joi.object().keys({
      checksheet: joi.string().trim(),
      text: joi
        .string()
        .required()
        .trim()
    })
  ),
  checks: joi.array().items(
    joi.object().keys({
      description: joi
        .string()
        .lowercase()
        .trim()
        .required(),
      status: joi
        .string()
        .valid(['ok', 'not ok', 'job raised'])
        .lowercase()
        .trim()
        .required(),
      date: joi.date(),
      checksheet: joi.string().trim()
    })
  ),
  machineName: joi
    .string()
    .lowercase()
    .required()
    .trim(),
  completedBy: joi
    .string()
    .lowercase()
    .required()
    .trim(),
  supervisor: joi
    .string()
    .lowercase()
    .required()
    .trim()
    .normalize()
});

// export the schemas
module.exports = {
  '/checksheet': checkSheetDataSchema
};
