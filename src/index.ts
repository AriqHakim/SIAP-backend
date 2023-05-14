import dotenv from 'dotenv';
dotenv.config();

import bodyParser from 'body-parser';
import AppDataSource from './orm.config';
import ExpressServer, { Express, Request, Response } from 'express';
import cors from 'cors';

import authRouter from './modules/auth/Auth.route';
import adminRouter from './modules/admin/Admin.route';
import kelasRouter from './modules/kelas/Kelas.route';
import asistenRouter from './modules/asisten/Asisten.route';
import userRouter from './modules/user/User.route';
import pertRouter from './modules/pertemuan/pertemuan.route';
import broadcastRouter from './modules/broadcast/Broadcast.route';
import perizinanRouter from './modules/perizinan/Perizinan.route';

const PORT: number = parseInt(process.env.PORT || '3000');

async function main() {
  const server: Express = ExpressServer();
  await AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });

  server.use(cors());
  server.use(bodyParser.json());

  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  server.get('/', (req: Request, res: Response) => {
    res.send('Rest API SIAP-backend model created!');
  });

  server.use('/', authRouter);
  server.use('/admin', adminRouter);
  server.use('/kelas', kelasRouter);
  server.use('/asisten', asistenRouter);
  server.use('/user', userRouter);
  server.use('/', pertRouter);
  server.use('/', broadcastRouter);
  server.use('/', perizinanRouter);
}

main();
