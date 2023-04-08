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
import { Kelas } from "./entity/Kelas.entity";
import { Kelas1680928192303 } from "./migration/1680928192303-Kelas";
import { UserKelas } from "./entity/UserKelas.entity";
import { UserKelas1680928495302 } from "./migration/1680928495302-UserKelas";
import { Kategori } from "./entity/Kategori.entity";
import { Kategori1680928792339 } from "./migration/1680928792339-Kategori";
import { Broadcast } from "./entity/Broadcast.entity";
import { Broadcast1680939543362 } from "./migration/1680939543362-Broadcast";
import { Attachment } from "./entity/Attachment.entity";
import { Attachment1680940858600 } from "./migration/1680940858600-Attachment";

const AppDataSource: DataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    Admin,
    User,
    RoleApproval,
    AsistenPraktikum,
    Kelas,
    UserKelas,
    Kategori,
    Broadcast,
    Attachment,
  ],
  migrations: [
    Admin1680922513935,
    User1680923243154,
    RoleApproval1680923868308,
    AsistenPraktikum1680924698192,
    Kelas1680928192303,
    UserKelas1680928495302,
    Kategori1680928792339,
    Broadcast1680939543362,
    Attachment1680940858600,
  ],
  migrationsTableName: "migrations",
  synchronize: false,
  logging: true,
  migrationsRun: true,
});

export default AppDataSource;
