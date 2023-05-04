import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource } from 'typeorm';
import { Admin } from './entity/Admin.entity';
import { Admin1680922513935 } from './migration/1680922513935-Admin';
import { User } from './entity/User.entity';
import { User1680923243154 } from './migration/1680923243154-User';
import { RoleApproval } from './entity/RoleApproval.entity';
import { RoleApproval1680923868308 } from './migration/1680923868308-RoleApproval';
import { AsistenPraktikum } from './entity/AsistenPraktikum.entity';
import { AsistenPraktikum1680924698192 } from './migration/1680924698192-AsistenPraktikum';
import { Kelas } from './entity/Kelas.entity';
import { Kelas1680928192303 } from './migration/1680928192303-Kelas';
import { UserKelas } from './entity/UserKelas.entity';
import { UserKelas1680928495302 } from './migration/1680928495302-UserKelas';
import { Kategori } from './entity/Kategori.entity';
import { Kategori1680928792339 } from './migration/1680928792339-Kategori';
import { Broadcast } from './entity/Broadcast.entity';
import { Broadcast1680939543362 } from './migration/1680939543362-Broadcast';
import { Attachment } from './entity/Attachment.entity';
import { Attachment1680940858600 } from './migration/1680940858600-Attachment';
import { Pertemuan } from './entity/Pertemuan.entity';
import { Pertemuan1680941170378 } from './migration/1680941170378-Pertemuan';
import { Presensi } from './entity/Presensi.entity';
import { Presensi1680942631095 } from './migration/1680942631095-Presensi';
import { Perizinan } from './entity/Perizinan.entity';
import { Perizinan1680943216115 } from './migration/1680943216115-Perizinan';
import { AlterEmail1682998991704 } from './migration/1682998991704-AlterEmail';
import { KelasAsisten } from './entity/KelasAsisten.entity';
import { KelasAsisten1683211544604 } from './migration/1683211544604-KelasAsisten';
import { RemoveOneToManyAsistenKelas1683211761622 } from './migration/1683211761622-RemoveOneToManyAsistenKelas';

const AppDataSource: DataSource = new DataSource({
  type: 'mysql',
  host: process.env.HOST,
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
    Pertemuan,
    Presensi,
    Perizinan,
    KelasAsisten,
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
    Pertemuan1680941170378,
    Presensi1680942631095,
    Perizinan1680943216115,
    AlterEmail1682998991704,
    KelasAsisten1683211544604,
    RemoveOneToManyAsistenKelas1683211761622,
  ],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: true,
  migrationsRun: true,
});

export default AppDataSource;
