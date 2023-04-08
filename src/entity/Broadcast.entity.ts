import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Kategori } from "./Kategori.entity";
import { AsistenPraktikum } from "./AsistenPraktikum.entity";
import { Kelas } from "./Kelas.entity";

@Entity("broadcast")
export class Broadcast {
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
    type: "datetime",
  })
  date: Date;

  @ManyToOne(() => Kelas, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "kelas_id" })
  kelas: Kelas;

  @ManyToOne(() => AsistenPraktikum, {
    nullable: true,
  })
  @JoinColumn({ name: "owner_id" })
  owner?: AsistenPraktikum;

  @ManyToOne(() => Kategori, {
    nullable: true,
  })
  @JoinColumn({ name: "kategori_id" })
  kategori?: Kategori;
}
