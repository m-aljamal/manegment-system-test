import { Module } from '@nestjs/common';
import { LevelsResolver } from './levels.resolver';

@Module({
  providers: [LevelsResolver],
})
export class LevelsModule {}
