import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StudentsResolver } from './students.resolver';
import { StudentsService } from './students.service';
import { Student } from './entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [StudentsResolver, StudentsService],
})
export class StudentsModule {}
