import { MongoMemoryServer } from 'mongodb-memory-server';

export const startTestMango = async () => {
  const mongod = await MongoMemoryServer.create({
    instance: { port: 5657 },
  });
  // stop mongod on exit so reset on reload
  async function exitHandler(options, exitCode) {
    if (options.cleanup) {
      await mongod.stop();
    }
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) process.exit();
  }

  //do something when app is closing
  process.on('exit', exitHandler.bind(null, { cleanup: true }));

  //catches ctrl+c event
  process.on('SIGINT', exitHandler.bind(null, { exit: true }));

  // catches "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
  process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

  //catches uncaught exceptions
  process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
  return mongod;
};
