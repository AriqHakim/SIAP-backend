import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './User.entity';
import { KelasAsisten } from './KelasAsisten.entity';

@Entity('asisten_praktikum')
export class AsistenPraktikum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  instansi: string;

  @OneToOne(() => User, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => KelasAsisten, (k) => k.asisten)
  asistenKelas?: KelasAsisten[];
}
