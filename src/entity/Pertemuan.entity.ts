import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Kelas } from "./Kelas.entity";
import { Presensi } from "./Presensi.entity";

@Entity("pertemuan")
export class Pertemuan {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 50,
  })
  judul: string;

  @Column({
    type: "text",
  })
  deskripsi: string;

  @Column({
    name: "start_date",
    type: "datetime",
  })
  startDate: Date;

  @Column({
    name: "end_date",
    type: "datetime",
  })
  endDate: Date;

  @Column({
    name: "index_pert",
    type: "tinyint",
  })
  indexPert: number;

  @ManyToOne(() => Kelas, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "kelas_id" })
  kelas: Kelas;

  @OneToMany(() => Presensi, (p) => p.pertemuan)
  presensi?: Presensi[];
}
