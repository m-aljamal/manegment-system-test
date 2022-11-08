import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelsService } from 'src/levels/levels.service';
import { StudentsService } from 'src/students/students.service';
import { Repository } from 'typeorm';
import { CreateArchiveInput } from './dto/create-archive.input';
import { Archive } from './entity/archive.entity';

@Injectable()
export class ArchiveService {
  constructor(
    @InjectRepository(Archive)
    private readonly archiveRepository: Repository<Archive>,
    private readonly levelService: LevelsService,
    @Inject(forwardRef(() => StudentsService))
    private readonly studentService: StudentsService,
  ) {}

  async findOne(id: string): Promise<Archive> {
    return this.archiveRepository.findOne({ where: { id } });
  }

  async create(createArchiveInput: CreateArchiveInput) {
    const archive = this.archiveRepository.create(createArchiveInput);
    return this.archiveRepository.save(archive);
  }

  async openArchive(
    createArchiveInput: CreateArchiveInput,
    currentArchiveId: string,
  ) {
    const archive = this.archiveRepository.create(createArchiveInput);
    const newArchive = await this.archiveRepository.save(archive);
    await this.levelService.createAllLevels(newArchive.id, currentArchiveId);
    await this.studentService.upgradeStudentsArchive(newArchive);
    return newArchive;
  }
}
