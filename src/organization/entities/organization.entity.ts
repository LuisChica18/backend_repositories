import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tribe } from "./tribe.entity";

@Entity()
export class Organization {

    @PrimaryGeneratedColumn('increment')
    id_organization: number;

    @Column('varchar', {
        length: 50,
        nullable:false
    })
    name: string;

    @Column('int', {
        nullable:false
    })
    status: number

    @OneToMany(
        () => Tribe,
        (tribe) => tribe.id_organization,
        {cascade: true, eager:true}
      )
    tribes?: Tribe[]

}
