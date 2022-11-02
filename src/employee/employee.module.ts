import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { EmployeeResolver } from './employee.resolver';
import { EmployeeService } from './employee.service';
import { Employee } from './entity/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  providers: [EmployeeResolver, EmployeeService],
})
export class EmployeeModule {}
