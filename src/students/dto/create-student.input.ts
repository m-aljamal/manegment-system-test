import { InputType } from '@nestjs/graphql';

@InputType({ description: 'create student input' })
export class CreateStudentInput {
  name: string;

  archives: string[];

  levels: string[];
}
