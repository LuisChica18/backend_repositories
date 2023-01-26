import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Metrics } from "./metrics.entity";
import { Tribe } from "./tribe.entity";

@Entity()
export class Repository {

    @PrimaryGeneratedColumn('increment')
    id_repository: number;

    @ManyToOne(
        () => Tribe,
        (Tribe) => Tribe.repositories/*,
        { onDelete: "CASCADE"}*/
    )
    id_tribe: Tribe;

    @Column('varchar', {
        length: 50,
        nullable:false
    })
    name: string;

    @Column('varchar', {
        nullable:false,
        length: 1,
    })
    state: string;

    @Column('timestamp', {
        nullable:false
    })
    create_time: number;

    @Column('varchar', {
        nullable:false,
        length: 1,
    })
    status: string;

    @OneToOne(() => Metrics, (metrics) => metrics.id_repository) // specify inverse side as a second parameter
    metrics?: Metrics
}
