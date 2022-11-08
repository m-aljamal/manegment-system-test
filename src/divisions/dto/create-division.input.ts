import { InputType } from '@nestjs/graphql';

@InputType({ description: 'create division input' })
export class CreateDivisionInput {
  name: string;

  archiveId: string;

  levelId: string;
}
