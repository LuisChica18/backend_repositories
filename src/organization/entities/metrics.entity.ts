import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Repository } from "./repository.entity";

@Entity()
export class Metrics {

    @PrimaryGeneratedColumn()
    @OneToOne(() => Repository, (repo) => repo.metrics) // specify inverse side as a second parameter
    @JoinColumn()
    id_repository: Repository;

    @Column('decimal', {
        precision: 2,
        nullable:false
    })
    coverage: number;

    @Column('integer', {
        nullable:false
    })
    bugs: number;

    @Column('integer', {
        nullable:false
    })
    vulnerabilities: number;

    @Column('integer', {
        nullable:false
    })
    hotspot: number;

    @Column('integer', {
        nullable:false
    })
    code_smells: number;

}