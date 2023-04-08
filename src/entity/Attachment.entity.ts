import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Broadcast } from "./Broadcast.entity";

@Entity("attachment")
export class Attachment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 50,
  })
  judul: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  url: string;

  @ManyToOne(() => Broadcast, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "broadcast_id" })
  broadcast: Broadcast;
}
