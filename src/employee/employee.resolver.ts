import { Resolver, Query } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { Employee } from './entity/employee.entity';

@Resolver()
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => [Employee], { name: 'employees' })
  async findAll() {
    return this.employeeService.findAll();
  }
}
