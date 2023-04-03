import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class Admin {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  name: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  password: string;
}
