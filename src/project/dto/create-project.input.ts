import { InputType } from '@nestjs/graphql';

@InputType({ description: 'create project input' })
export class CreateProjectInput {
  name: string;
}
