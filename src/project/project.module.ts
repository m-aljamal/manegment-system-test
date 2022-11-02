import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';
import { Project } from './entity/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  providers: [ProjectResolver, ProjectService],
})
export class ProjectModule {}
