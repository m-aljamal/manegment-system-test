import { Archive } from './../../archive/entity/archive.entity';
import { ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}
