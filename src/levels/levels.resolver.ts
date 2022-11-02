import { ParseIntPipe } from '@nestjs/common';
import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { CreateLevelInput } from './dto/create-level.input';
import { UpdateLevelInput } from './dto/update-level.input';
import { Level } from './entities/level.entity';
import { LevelsService } from './levels.service';
@Resolver()
export class LevelsResolver {
  constructor(private readonly levelsService: LevelsService) {}
  @Query(() => [Level], { name: 'levels' })
  async findAll() {
    return this.levelsService.findAll();
  }

  @Query(() => Level)
  async FindOne(@Args('id') id: string) {
    return this.levelsService.findOne(id);
  }

  @Mutation(() => Level, { name: 'createLevel' })
  async create(@Args('createLevelInput') createLevelInput: CreateLevelInput) {
    return this.levelsService.create(createLevelInput);
  }

  @Mutation(() => Level, { name: 'updateLevel' })
  async update(
    @Args('id') id: string,
    @Args('updateLevelInput') updateLevelInput: UpdateLevelInput,
  ) {
    return this.levelsService.update(id, updateLevelInput);
  }

  @Mutation(() => Level, { name: 'removeLevel' })
  async remove(@Args('id') id: string) {
    return this.levelsService.remove(id);
  }
}
