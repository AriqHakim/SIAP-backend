import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User.entity";

export enum STATUS_APPROVAL {
  ACCEPTED = "Accepted",
  PENDING = "Pending",
  REJECTED = "Rejected",
}

@Entity("role_approval")
export class RoleApproval {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: STATUS_APPROVAL,
  })
  status: STATUS_APPROVAL;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;
}
