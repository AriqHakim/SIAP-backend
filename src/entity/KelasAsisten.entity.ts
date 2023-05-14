import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AsistenPraktikum } from './AsistenPraktikum.entity';
import { Kelas } from './Kelas.entity';

@Entity('kelas_asisten')
export class KelasAsisten {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AsistenPraktikum, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'asisten_id' })
  asisten: AsistenPraktikum;

  @ManyToOne(() => Kelas, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'kelas_id' })
  kelas: Kelas;
}
