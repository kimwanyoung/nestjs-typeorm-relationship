import {
    ChildEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    TableInheritance,
    UpdateDateColumn
} from "typeorm";

export class BaseModel {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

@Entity()
export class BookModel extends BaseModel {
    @Column()
    name: string;
}

@Entity()
export class CarModel extends BaseModel {
    @Column()
    brand: string;
}

@Entity()
@TableInheritance({
    column: {
        name: 'type',
        type: 'varchar',
    }
})
export class SingleModel {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

@ChildEntity()
export class Computer extends SingleModel {
    @Column()
    brand: string;
}

@ChildEntity()
export class AirplaneModel extends SingleModel {
    @Column()
    country: string;
}