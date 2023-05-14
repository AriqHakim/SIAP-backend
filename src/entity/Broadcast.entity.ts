import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AsistenPraktikum } from './AsistenPraktikum.entity';
import { Kelas } from './Kelas.entity';
import { Attachment } from './Attachment.entity';

@Entity('broadcast')
export class Broadcast {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  judul: string;

  @Column({
    type: 'text',
  })
  deskripsi: string;

  @Column({
    type: 'datetime',
  })
  date: Date;

  @ManyToOne(() => Kelas, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'kelas_id' })
  kelas: Kelas;

  @ManyToOne(() => AsistenPraktikum, {
    nullable: true,
  })
  @JoinColumn({ name: 'owner_id' })
  owner?: AsistenPraktikum;

  @OneToMany(() => Attachment, (a) => a.broadcast)
  attachment?: Attachment[];
}
