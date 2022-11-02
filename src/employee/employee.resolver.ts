import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Human } from 'src/common/interfaces/human.interface';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { EmployeeService } from './employee.service';
import { Employee } from './entity/employee.entity';

@Resolver()
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => [Employee], { name: 'employees' })
  async findAll() {
    return this.employeeService.findAll();
  }

  @Mutation(() => Employee, { name: 'createEmployee' })
  async create(
    @Args('createEmployeeInput') createEmployeeInput: CreateEmployeeInput,
  ) {
    return this.employeeService.create(createEmployeeInput);
  }
}
