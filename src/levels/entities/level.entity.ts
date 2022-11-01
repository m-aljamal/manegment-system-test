import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Level {
  id: number;
  name: string;
}
