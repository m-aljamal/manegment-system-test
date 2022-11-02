import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Archive } from './entity/archive.entity';

@Injectable()
export class ArchiveService {
  constructor(
    @InjectRepository(Archive)
    private readonly archiveRepository: Repository<Archive>,
  ) {}
}
