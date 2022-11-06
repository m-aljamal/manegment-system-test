import { CreateArchiveInput } from './dto/create-archive.input';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ArchiveService } from './archive.service';
import { Archive } from './entity/archive.entity';

@Resolver()
export class ArchiveResolver {
  constructor(private readonly archiveService: ArchiveService) {}

  @Mutation(() => Archive, { name: 'createArchive' })
  async createArchive(
    @Args('createArchiveInput') createArchiveInput: CreateArchiveInput,
  ) {
    return this.archiveService.create(createArchiveInput);
  }

  @Mutation(() => Archive, { name: 'openArchive' })
  async openArchive(
    @Args('openArchiveInput') openArchiveInput: CreateArchiveInput,
    @Args('currentArchiveId') currentArchiveId: string,
  ) {
    return this.archiveService.openArchive(openArchiveInput, currentArchiveId);
  }
}
