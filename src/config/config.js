const dotenv = require("dotenv");
const Joi = require("joi");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(3000),
    NODE_ENV: Joi.string().valid("prod", "test", "dev").required(),
    ACCESS_TOKEN_SECRET: Joi.string().required().description("Access token"),
    PERSONALIZER_SERVICE_KEY: Joi.string()
      .required()
      .description("personalizer key"),
    PERSONALIZER_BASE_URL: Joi.string()
      .required()
      .description("personalizer endpoint"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  console.log("Config validation error: " + error.message);
}

module.exports = {
  port: envVars.PORT,
  env: envVars.NODE_ENV,
  accessToken: envVars.ACCESS_TOKEN_SECRET,
  serviceKey: envVars.PERSONALIZER_SERVICE_KEY,
  baseUri: envVars.PERSONALIZER_BASE_URL,
};
