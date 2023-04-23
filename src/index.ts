import dotenv from 'dotenv';
dotenv.config();

import AppDataSource from './orm.config';
import ExpressServer, { Express } from 'express';
import cors from 'cors';

const PORT: number = parseInt(process.env.PORT || '3000');

async function main() {
  // await initializeDatabase(ormConfig)
  // const init_router: Router = await initializeEndpoints()
  const server: Express = ExpressServer();
  await AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });
  server.use(cors());
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  //   server.use("/");
}

main();
