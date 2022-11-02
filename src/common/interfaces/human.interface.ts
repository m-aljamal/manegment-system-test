import { Field, InterfaceType } from '@nestjs/graphql';
import { Column, CreateDateColumn } from 'typeorm';

@InterfaceType()
export abstract class Human {
  @Field()
  name: string;

  @Field()
  createdAt: Date;
}
