import { CreateLevelInput } from './dto/create-level.input';
import { Injectable } from '@nestjs/common';
import { Level } from './entities/level.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateLevelInput } from './dto/update-level.input';
import { UserInputError } from 'apollo-server-express';
import { DivisionsService } from 'src/divisions/divisions.service';

@Injectable()
export class LevelsService {
  constructor(
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
    private readonly divisionsService: DivisionsService,
  ) {}
  create(createLevelInput: CreateLevelInput) {
    const level = this.levelRepository.create(createLevelInput);
    return this.levelRepository.save(level);
  }

  findAll(archiveId?: string) {
    return this.levelRepository.find({
      where: {
        archiveId,
      },
      relations: ['archive'],
    });
  }

  async findOne(id: string) {
    const level = await this.levelRepository.findOne({
      where: {
        id,
      },
    });
    if (!level) {
      throw new UserInputError('Level not found');
    }
    return level;
  }

  async update(id: string, updateLevelInput: UpdateLevelInput) {
    // preload first look for the record in the database
    // if it exists, it will update the record
    // if it doesn't exist, it will return undefined
    const level = await this.levelRepository.preload({
      id,
      ...updateLevelInput,
    });
    if (!level) {
      throw new UserInputError('Level not found');
    }
    return this.levelRepository.save(level);
  }

  async remove(id: string) {
    const level = await this.findOne(id);
    return this.levelRepository.remove(level);
  }

  async createAllLevels(archiveId: string, currentArchiveId: string) {
    const levels = [
      {
        name: 'Level 1',
        levelNumber: 1,
      },
      {
        name: 'Level 2',
        levelNumber: 2,
      },
      {
        name: 'Level 3',
        levelNumber: 3,
      },
    ];

    const levelsToSave = levels.map((level) => {
      return this.levelRepository.create({
        ...level,
        archiveId,
      });
    });
    const levelssaved = await this.levelRepository.save(levelsToSave);
    await this.divisionsService.createAllDivisions(archiveId, currentArchiveId);
    return levelssaved;
  }

  async findByName(name: string) {
    const level = await this.levelRepository.findOne({
      where: {
        name,
      },
    });
    if (!level) {
      throw new UserInputError('Level not found');
    }
    return level;
  }
}
