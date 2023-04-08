import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pertemuan } from "./Pertemuan.entity";
import { User } from "./User.entity";

export enum STATUS_KEHADIRAN {
  HADIR = "Hadir",
  SAKIT = "Sakit",
  IZIN = "Izin",
  TIDAK_HADIR = "Tidak Hadir",
}

@Entity("presensi")
export class Presensi {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  bukti: string;

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
    name: "is_validate",
    type: "bool",
  })
  isValidate: boolean;

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
