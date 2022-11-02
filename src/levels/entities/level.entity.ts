import { ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'Level Model' })
export class Level {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  // @Field(() => String) is required when CLI Plugin is disabled
  @Column()
  name: string;
}
