function ensureConnection(sequelize, initialWaitTime = 500, connectionAttempts = 10, logger = console.log ) {
  function checkConnection(resolve, reject) {
    return sequelize.authenticate()
    .then(resolve)
    .catch((err) => {
      if (connectionAttempts === 0) {
        return reject(err);
      }
      
      logger(`Attempting to connect again to database. ${connectionAttempts} attempts left.`);

      setTimeout(() => checkConnection(resolve, reject), initialWaitTime);
      initialWaitTime *= 2;
      connectionAttempts -= 1;
    });
  }

  return new Promise((resolve, reject) => {
    checkConnection(resolve, reject);
  });
}

module.exports = ensureConnection;
