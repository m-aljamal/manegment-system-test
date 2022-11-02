import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateArchiveInput {
  name: string;
}
