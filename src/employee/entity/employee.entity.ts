import { Archive } from 'src/archive/entity/archive.entity';
import { ObjectType } from '@nestjs/graphql';
import { Human } from 'src/common/interfaces/human.interface';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
@ObjectType({ description: 'employee Model', implements: () => [Human] })
export class Employee implements Human {
  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @JoinTable()
  @ManyToMany(() => Archive, (archive) => archive.employees)
  archives: Archive[];
}
