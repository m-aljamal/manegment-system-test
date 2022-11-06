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

  async findAll(archiveId?: string): Promise<Student[]> {
    // return this.studentRepository.find({
    //   where: {
    //     archives: archiveId ? { id: archiveId } : undefined,
    //   },
    //   relations: ['archives', 'levels'],
    // });
    const query = this.studentRepository.createQueryBuilder('student');
    query.leftJoinAndSelect('student.archives', 'archives');
    query.leftJoinAndSelect('student.levels', 'levels');
    if (archiveId) {
      query.where('archives.id = :archiveId', { archiveId });
      query.andWhere('levels.archiveId = :archiveId', { archiveId });
    }
    return query.getMany();
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
      if (student.id === '95b6c7d2-56c7-4caf-ab34-7d8f9952cbc2') {
        student.levels.push(await this.levelService.findByName('Level 2'));
      } else {
        student.levels.push(await this.levelService.findByName('Level 1'));
      }
      await this.studentRepository.save(student);
    });
  }
}
