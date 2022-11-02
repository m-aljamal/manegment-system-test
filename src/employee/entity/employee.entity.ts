import { ObjectType } from '@nestjs/graphql';
import { Human } from 'src/common/interfaces/human.interface';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
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
}
