import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDivisionInput } from './dto/create-division.input';
import { Division } from './entities/division.entity';

@Injectable()
export class DivisionsService {
  constructor(
    @InjectRepository(Division)
    private divisionRepository: Repository<Division>,
  ) {}

  async findAll(): Promise<Division[]> {
    return this.divisionRepository.find();
  }

  async create(createDivisionInput: CreateDivisionInput): Promise<Division> {
    const division = this.divisionRepository.create(createDivisionInput);
    return this.divisionRepository.save(division);
  }
}
