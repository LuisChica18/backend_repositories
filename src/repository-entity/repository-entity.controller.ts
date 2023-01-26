import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RepositoryEntityService } from './repository-entity.service';
import { CreateRepositoryEntityDto } from './dto/create-repository-entity.dto';
import { UpdateRepositoryEntityDto } from './dto/update-repository-entity.dto';

@Controller('repository-entity')
export class RepositoryEntityController {
  constructor(private readonly repositoryEntityService: RepositoryEntityService) {}

  @Post()
  create(@Body() createRepositoryEntityDto: CreateRepositoryEntityDto) {
    return this.repositoryEntityService.create(createRepositoryEntityDto);
  }

  @Get()
  findAll() {
    return this.repositoryEntityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repositoryEntityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRepositoryEntityDto: UpdateRepositoryEntityDto) {
    return this.repositoryEntityService.update(+id, updateRepositoryEntityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repositoryEntityService.remove(+id);
  }
}
