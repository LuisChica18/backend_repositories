import { Injectable } from '@nestjs/common';
import { CreateRepositoryEntityDto } from './dto/create-repository-entity.dto';
import { UpdateRepositoryEntityDto } from './dto/update-repository-entity.dto';

@Injectable()
export class RepositoryEntityService {
  create(createRepositoryEntityDto: CreateRepositoryEntityDto) {
    return 'This action adds a new repositoryEntity';
  }

  findAll() {
    return `This action returns all repositoryEntity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} repositoryEntity`;
  }

  update(id: number, updateRepositoryEntityDto: UpdateRepositoryEntityDto) {
    return `This action updates a #${id} repositoryEntity`;
  }

  remove(id: number) {
    return `This action removes a #${id} repositoryEntity`;
  }
}
