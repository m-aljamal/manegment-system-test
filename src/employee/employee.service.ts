import { CreateEmployeeInput } from './dto/create-employee.input';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entity/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async findAll() {
    return this.employeeRepository.find();
  }

  async create(createEmployeeInput: CreateEmployeeInput) {
    const employee = this.employeeRepository.create(createEmployeeInput);
    return this.employeeRepository.save(employee);
  }
}
