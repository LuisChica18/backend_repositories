import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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


}
