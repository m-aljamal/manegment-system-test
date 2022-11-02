import { CreateStudentInput } from './dto/create-student.input';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async findAll() {
    return this.studentRepository.find();
  }

  async create(createStudentInput: CreateStudentInput) {
    const student = this.studentRepository.create(createStudentInput);
    return this.studentRepository.save(student);
  }
}
