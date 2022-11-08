import { Level } from 'src/levels/entities/level.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDivisionInput } from './dto/create-division.input';
import { Division } from './entities/division.entity';

@Injectable()
export class DivisionsService {
  constructor(
    @InjectRepository(Division)
    private readonly divisionRepository: Repository<Division>,
  ) {}

  async findAll(): Promise<Division[]> {
    return this.divisionRepository.find();
  }

  async create(createDivisionInput: CreateDivisionInput): Promise<Division> {
    const division = this.divisionRepository.create(createDivisionInput);
    return this.divisionRepository.save(division);
  }

  async findOne(id: string): Promise<Division> {
    return this.divisionRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByArchiveId(archiveId: string): Promise<Division[]> {
    return this.divisionRepository.find({
      where: {
        archiveId,
      },
    });
  }

  async createAllDivisions(archiveId: string, currentArchiveId: string) {
    const divisions = await this.findByArchiveId(currentArchiveId);
    const levels = 
    const newDivisions = divisions.map((division) => {
      const newDivision = this.divisionRepository.create({
        ...division,
        archiveId,
      });
      return this.divisionRepository.save(newDivision);
    });
    return Promise.all(newDivisions);
  }
}
