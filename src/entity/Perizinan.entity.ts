import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { STATUS_KEHADIRAN } from "./Presensi.entity";
import { Pertemuan } from "./Pertemuan.entity";
import { User } from "./User.entity";

@Entity("perizinan")
export class Perizinan {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "datetime",
  })
  date: Date;

  @Column({
    type: "enum",
    enum: STATUS_KEHADIRAN,
  })
  status: STATUS_KEHADIRAN;

  @Column({
    type: "varchar",
  })
  bukti: string;

  @ManyToOne(() => Pertemuan, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "pertemuan_id" })
  pertemuan: Pertemuan;

  @ManyToOne(() => User, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: User;
}
