import { PartialType } from '@nestjs/mapped-types';
import { CreateRepositoryEntityDto } from './create-repository-entity.dto';

export class UpdateRepositoryEntityDto extends PartialType(CreateRepositoryEntityDto) {}
