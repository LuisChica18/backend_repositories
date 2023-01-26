import { Delete } from "@nestjs/common";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Organization } from "./organization.entity";
import { Repository } from "./repository.entity";

@Entity()
export class Tribe {

    @PrimaryGeneratedColumn('increment')
    id_tribe: number;

    @ManyToOne(
        () => Organization,
        (Organization) => Organization.tribes,
        { onDelete: "CASCADE"}
    )
    id_organization: Organization;

    @Column('varchar', {
        length: 50,
        nullable:false
    })
    name: string;

    @Column('int', {
        nullable:false
    })
    status: number;

    @OneToMany(
        () => Repository,
        (repository) => repository.id_repository,
        {cascade: true
        //    , eager:true
        }
      )
    repositories?: Repository[]

}
