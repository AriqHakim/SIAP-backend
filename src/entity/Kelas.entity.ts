import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AsistenPraktikum } from './AsistenPraktikum.entity';
import { Broadcast } from './Broadcast.entity';
import { Pertemuan } from './Pertemuan.entity';
import { UserKelas } from './UserKelas.entity';

@Entity('kelas')
export class Kelas {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  judul: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  deskripsi: string;

  @Column({
    type: 'varchar',
    length: 6,
  })
  kode: string;

  @ManyToOne(() => AsistenPraktikum, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'asisten_id' })
  asisten: AsistenPraktikum;

  @OneToMany(() => Broadcast, (bc) => bc.kelas)
  broadcasts?: Broadcast[];

  @OneToMany(() => Pertemuan, (p) => p.kelas)
  pertemuan?: Pertemuan[];

  @OneToMany(() => UserKelas, (u) => u.kelas)
  userKelas?: UserKelas[];
}
