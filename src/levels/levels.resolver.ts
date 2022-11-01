import { Resolver, Query } from '@nestjs/graphql';
import { Level } from './entities/level.entity';
@Resolver()
export class LevelsResolver {
  @Query(() => [Level], { name: 'levels' })
  async levels() {
    return [];
  }
}
