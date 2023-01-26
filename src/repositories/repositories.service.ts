import { Injectable, NotFoundException } from '@nestjs/common';
import { Repositories } from './interfaces/repositories.interfaces';

@Injectable()
export class RepositoriesService {

    private repositories: Repositories[] = [
        {
            id: 1
        },
        {
            id: 2
        },
        {
            id: 3
        }
    ];

    private state = ["604", "605", "606"];

    randomStatus(){
        const rand = Math.floor(Math.random()*this.state.length);
        return this.state[rand];
    }

    setstateRepositories(){
        const list: Repositories[] = this.listAll();
        list.forEach(element => {
            element.state = this.randomStatus();
        });
    }

    private listAll(){
        return this.repositories;
    }

    findAll(){
        this.setstateRepositories();
        return this.repositories;
    }

    findCarById(id:number){
        const repo = this.repositories.find(car => car.id == id );
        // en caso que no exista se maneje un Filter Exception
        if (!repo)
            throw new NotFoundException(`Repository with id ${id} no found!!!`);
        return repo;
    }
}
