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

  async findByName(name: string): Promise<Division> {
    return this.divisionRepository.findOne({
      where: {
        name,
      },
    });
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

  async findByArchiveIdAndLevelId(
    archiveId: string,
    levelNumber: number,
  ): Promise<Division[]> {
    return this.divisionRepository.find({
      where: {
        archiveId,
        level: {
          levelNumber,
        },
      },
      relations: ['level'],
    });
  }

  async createAllDivisions(
    archiveId: string,
    currentArchiveId: string,
    levelId: string,
  ) {
    const divisions = await this.findByArchiveIdAndLevelId(currentArchiveId, 1);
    console.log('divisions', divisions);

    const newDivisions = divisions.map(async (division) => {
      const newDivision = this.divisionRepository.create({
        ...division,
        levelId,
        archiveId,
      });

      console.log('newDivision', newDivision);
      const saved = await this.divisionRepository.save(newDivision);
      console.log('saved', saved);
    });

    return Promise.all(newDivisions);
  }
}
