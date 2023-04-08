import * as dotenv from "dotenv";
dotenv.config();
import { DataSource } from "typeorm";
import { Admin } from "./entity/Admin.entity";
import { Admin1680922513935 } from "./migration/1680922513935-Admin";
import { User } from "./entity/User.entity";
import { User1680923243154 } from "./migration/1680923243154-User";

const AppDataSource: DataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Admin, User],
  migrations: [Admin1680922513935, User1680923243154],
  migrationsTableName: "migrations",
  synchronize: false,
  logging: true,
  migrationsRun: true,
});

export default AppDataSource;
