import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LevelsResolver } from './levels.resolver';
import { LevelsService } from './levels.service';
import { Level } from './entities/level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Level])],
  providers: [LevelsResolver, LevelsService],
})
export class LevelsModule {}
