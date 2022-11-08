import { DivisionsModule } from './../divisions/divisions.module';
import { ArchiveModule } from './../archive/archive.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { StudentsResolver } from './students.resolver';
import { StudentsService } from './students.service';
import { Student } from './entities/student.entity';
import { LevelsModule } from 'src/levels/levels.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    forwardRef(() => ArchiveModule),
    LevelsModule,
    DivisionsModule,
  ],
  providers: [StudentsResolver, StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
