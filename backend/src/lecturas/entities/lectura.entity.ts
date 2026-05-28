    import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn
} from 'typeorm';

import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Pozo } from '../../pozos/entities/pozo.entity';

@Entity()
export class Lectura {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Usuario)
  usuario!: Usuario;

  @ManyToOne(() => Pozo)
  pozo!: Pozo;

  @Column('decimal')
  megaohmios_l1!: number;

  @Column('decimal')
  megaohmios_l2!: number;

  @Column('decimal')
  megaohmios_l3!: number;

  @Column('decimal')
  voltaje_l1!: number;

  @Column('decimal')
  voltaje_l2!: number;

  @Column('decimal')
  voltaje_l3!: number;

  @Column('decimal')
  amperaje_l1!: number;

  @Column('decimal')
  amperaje_l2!: number;

  @Column('decimal')
  amperaje_l3!: number;

  @Column()
  observacion!: string;

  @Column({
  type: 'timestamp',
  default: () => 'CURRENT_TIMESTAMP',
  })
  fecha!: Date;
  
}
