import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Equipo {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  codigo!: string;

  @Column()
  nombre!: string;
}
