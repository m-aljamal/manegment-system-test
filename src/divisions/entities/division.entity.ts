import { ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'Division Model' })
export class Division {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
