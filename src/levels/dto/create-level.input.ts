import { InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType({ description: 'create level input' })
export class CreateLevelInput {
  // @Field(() => String) is required when CLI Plugin is disabled
  @MinLength(3)
  name: string;

  levelNumber: number;

  archiveId: string;
}
