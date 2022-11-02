import { CreateLevelInput } from './dto/create-level.input';
import { Injectable } from '@nestjs/common';
import { Level } from './entities/level.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateLevelInput } from './dto/update-level.input';
import { UserInputError } from 'apollo-server-express';

@Injectable()
export class LevelsService {
  constructor(
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
  ) {}
  create(createLevelInput: CreateLevelInput) {
    const level = this.levelRepository.create(createLevelInput);
    return this.levelRepository.save(level);
  }

  findAll() {
    return this.levelRepository.find();
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
}
