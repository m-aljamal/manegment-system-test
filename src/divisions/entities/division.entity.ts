import { ObjectType } from '@nestjs/graphql';
import { Archive } from 'src/archive/entity/archive.entity';
import { Level } from 'src/levels/entities/level.entity';
import { Student } from 'src/students/entities/student.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType({ description: 'Division Model' })
export class Division {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Archive, (archive) => archive.divisions)
  archive: Archive;

  @Column()
  archiveId: string;

  @ManyToOne(() => Level, (level) => level.divisions)
  level: Level;

  @Column()
  levelId: string;

  @ManyToMany(() => Student, (student) => student.divisions)
  students: Student[];
}
