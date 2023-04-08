import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("kategori")
export class Kategori {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 50,
  })
  judul: string;
}
