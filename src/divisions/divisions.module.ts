import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DivisionsService } from './divisions.service';
import { DivisionsResolver } from './divisions.resolver';
import { Division } from './entities/division.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Division])],
  providers: [DivisionsResolver, DivisionsService],
})
export class DivisionsModule {}
