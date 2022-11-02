import { InputType, PartialType } from '@nestjs/graphql';
import { CreateLevelInput } from './create-level.input';

@InputType()
export class UpdateLevelInput extends PartialType(CreateLevelInput) {}
