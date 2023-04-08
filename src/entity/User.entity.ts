import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from "typeorm";
import { RoleApproval } from "./RoleApproval.entity";
import { AsistenPraktikum } from "./AsistenPraktikum.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 50,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  password: string;

  @Column({
    type: "varchar",
    length: 50,
  })
  name: string;

  @Column({
    type: "varchar",
    length: 12,
  })
  npm: string;

  @Column({
    name: "no_telp",
    type: "varchar",
    length: 20,
  })
  noTelp: string;

  @OneToMany(() => RoleApproval, (r) => r.user)
  approval?: RoleApproval[];

  @OneToOne(() => AsistenPraktikum, (a) => a.user)
  asisten?: AsistenPraktikum;
}
