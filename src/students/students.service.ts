import { CreateStudentInput } from './dto/create-student.input';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { ArchiveService } from 'src/archive/archive.service';
import { Archive } from 'src/archive/entity/archive.entity';
import { LevelsService } from 'src/levels/levels.service';
import { Level } from 'src/levels/entities/level.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @Inject(forwardRef(() => ArchiveService))
    private readonly archiveService: ArchiveService,
    private readonly levelService: LevelsService,
  ) {}

  async findAll() {
    return this.studentRepository.find({ relations: ['archives', 'levels'] });
  }

  async create(createStudentInput: CreateStudentInput) {
    const archives = await Promise.all(
      createStudentInput.archives.map((id) => this.preloadArchive(id)),
    );

    const levels = await Promise.all(
      createStudentInput.levels.map((id) => this.preloadLevel(id)),
    );
    const student = this.studentRepository.create({
      ...createStudentInput,
      archives,
      levels,
    });
    return this.studentRepository.save(student);
  }

  private async preloadArchive(id: string): Promise<Archive> {
    const archive = await this.archiveService.findOne(id);
    if (archive) {
      return archive;
    }
  }
  private async preloadLevel(id: string): Promise<Level> {
    const level = await this.levelService.findOne(id);
    if (level) {
      return level;
    }
  }

  async upgradeStudentsArchive(archive: Archive) {
    const students = await this.findAll();
    students.forEach(async (student) => {
      student.archives.push(archive);
      await this.studentRepository.save(student);
    });
  }
}
