import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AsistenPraktikum } from "./AsistenPraktikum.entity";

@Entity("kelas")
export class Kelas {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 50,
  })
  judul: string;

  @Column({
    type: "varchar",
    length: 50,
  })
  deskripsi: string;

  @Column({
    type: "varchar",
    length: 6,
  })
  kode: string;

  @ManyToOne(() => AsistenPraktikum, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "asisten_id" })
  asisten: AsistenPraktikum;
}
