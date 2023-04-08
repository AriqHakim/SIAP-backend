import * as dotenv from "dotenv";
dotenv.config();
import { DataSource } from "typeorm";
import { Admin } from "./entity/Admin.entity";
import { Admin1680922513935 } from "./migration/1680922513935-Admin";

const AppDataSource: DataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Admin],
  migrations: [Admin1680922513935],
  migrationsTableName: "migrations",
  synchronize: false,
  logging: true,
  migrationsRun: true,
});

export default AppDataSource;
