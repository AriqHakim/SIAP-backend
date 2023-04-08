import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("admin")
export class Admin {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 50,
  })
  name: string;

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
}
