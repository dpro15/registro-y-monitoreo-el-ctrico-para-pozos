import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class Pozo {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;
}
