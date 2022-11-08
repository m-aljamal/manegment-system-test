import { Level } from 'src/levels/entities/level.entity';
import { Archive } from './../../archive/entity/archive.entity';
import { ObjectType } from '@nestjs/graphql';
import { Human } from 'src/common/interfaces/human.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Division } from 'src/divisions/entities/division.entity';

@Entity()
@ObjectType({ description: 'Student Model', implements: () => [Human] })
export class Student implements Human {
  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @JoinTable()
  @ManyToMany(() => Archive, (archive) => archive.students)
  archives: Archive[];

  @JoinTable()
  @ManyToMany(() => Level, (level) => level.students)
  levels: Level[];

  @JoinTable()
  @ManyToMany(() => Division, (division) => division.students)
  divisions: Division[];
}
