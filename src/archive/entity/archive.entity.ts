import { Student } from './../../students/entities/student.entity';
import { ObjectType } from '@nestjs/graphql';
import { Level } from 'src/levels/entities/level.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Archive {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Level, (level) => level.archive)
  levels: Level[];

  @ManyToMany(() => Student, (student) => student.archives)
  students: Student[];
}
