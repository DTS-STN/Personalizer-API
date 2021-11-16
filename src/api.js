const app = require('../src/app');
const config = require('./config/config');
const logger = require('./config/logger');

const port = config.port;

app.listen(port, () => {
  logger.info(`server started at port:${port}`);
});
