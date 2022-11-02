import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateStudentInput } from './dto/create-student.input';
import { Student } from './entities/student.entity';
import { StudentsService } from './students.service';

@Resolver()
export class StudentsResolver {
  constructor(private readonly studentsService: StudentsService) {}

  @Query(() => [Student], { name: 'students' })
  async findAll() {
    return this.studentsService.findAll();
  }

  @Mutation(() => Student, { name: 'createStudent' })
  async create(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentsService.create(createStudentInput);
  }
}
