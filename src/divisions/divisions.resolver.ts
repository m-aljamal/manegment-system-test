import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DivisionsService } from './divisions.service';
import { CreateDivisionInput } from './dto/create-division.input';
import { Division } from './entities/division.entity';

@Resolver()
export class DivisionsResolver {
  constructor(private readonly divisionsService: DivisionsService) {}

  @Query(() => [Division], { name: 'divisions' })
  async findAll() {
    return this.divisionsService.findAll();
  }

  @Mutation(() => Division, { name: 'createDivision' })
  async create(
    @Args('createDivisionInput') createDivisionInput: CreateDivisionInput,
  ) {
    return this.divisionsService.create(createDivisionInput);
  }
}
