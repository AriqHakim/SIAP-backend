import * as dotenv from "dotenv";
dotenv.config();
import { DataSource } from "typeorm";

dotenv.config();

export const AppDataSource: DataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "siap",
  entities: [__dirname + "/entity/**/*{.js,.ts}"],
  migrations: [__dirname + "/migration/**/*{.js,.ts}"],
});

export default AppDataSource;
