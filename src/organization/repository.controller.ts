import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { RepositoryService } from './repository.service';

@Controller('repository')
export class RepositoryController {

  constructor(private readonly repositoryService: RepositoryService) {}

  @Get()
  findAll() {
    return this.repositoryService.findAll();
  }

  @Get(':id')
  findByTribe(@Param('id', ParseIntPipe) id: number) {
    return this.repositoryService.findByTribe(id);
  }

}
