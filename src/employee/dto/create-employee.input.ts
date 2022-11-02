import { InputType } from '@nestjs/graphql';

@InputType({
  description: 'create employee input',
})
export class CreateEmployeeInput {
  name: string;
}
