import * as Joi from 'joi';

export const CONFIG_OPTIONS_PROVIDER = {
  isGlobal: true,
  validationSchema: Joi.object({
    PROJECT_NAME: Joi.string().required(),
    ENV: Joi.string().required(),
    APP_PORT: Joi.number().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
  }),
};
