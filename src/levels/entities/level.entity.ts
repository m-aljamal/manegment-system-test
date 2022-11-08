import { Archive } from './../../archive/entity/archive.entity';
import { ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from 'src/students/entities/student.entity';
import { Division } from 'src/divisions/entities/division.entity';

@Entity()
@ObjectType({ description: 'Level Model' })
export class Level {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  // @Field(() => String) is required when CLI Plugin is disabled
  @Column()
  name: string;

  @ManyToOne(() => Archive, (archive) => archive.levels)
  archive: Archive;

  @Column()
  archiveId: string;

  @Column()
  levelNumber: number;

  @ManyToMany(() => Student, (student) => student.levels)
  students: Student[];

  @OneToMany(() => Division, (division) => division.level)
  divisions: Division[];
}
