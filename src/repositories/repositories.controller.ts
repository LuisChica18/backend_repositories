import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';

@Controller('repositories')
export class RepositoriesController {

    constructor(
        private readonly repoService: RepositoriesService
    ){}

    @Get()
    getCallrepositories(){
        return this.repoService.findAll();
    }

    @Get(':id')
    getCarById(@Param('id', ParseIntPipe ) id:number){
        console.log(id);
        return this.repoService.findCarById(id);
    }

}
