/*import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Metrics } from "./metrics.entity";

@Entity()
export class RepositoryEntity {

    @PrimaryGeneratedColumn('increment')
    id_repository: number;

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

    @OneToOne(
        () => Metrics,
        (metrics) => metrics.id_repository,
        {cascade: true, eager:true}
      )
    metrics?: Metrics;

}
*/