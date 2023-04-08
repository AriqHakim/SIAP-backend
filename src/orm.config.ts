import * as dotenv from "dotenv";
dotenv.config();
import { DataSource } from "typeorm";
import { Admin } from "./entity/Admin.entity";
import { Admin1680922513935 } from "./migration/1680922513935-Admin";
import { User } from "./entity/User.entity";
import { User1680923243154 } from "./migration/1680923243154-User";
import { RoleApproval } from "./entity/RoleApproval.entity";
import { RoleApproval1680923868308 } from "./migration/1680923868308-RoleApproval";
import { AsistenPraktikum } from "./entity/AsistenPraktikum.entity";
import { AsistenPraktikum1680924698192 } from "./migration/1680924698192-AsistenPraktikum";

const AppDataSource: DataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Admin, User, RoleApproval, AsistenPraktikum],
  migrations: [
    Admin1680922513935,
    User1680923243154,
    RoleApproval1680923868308,
    AsistenPraktikum1680924698192,
  ],
  migrationsTableName: "migrations",
  synchronize: false,
  logging: true,
  migrationsRun: true,
});

export default AppDataSource;
