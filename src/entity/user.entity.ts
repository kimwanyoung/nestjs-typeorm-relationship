import {
    Column,
    CreateDateColumn,
    Entity,
    Generated, JoinColumn, OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn
} from "typeorm";
import { ProfileModel } from "./profile.entity";
import {PostModel} from "./post.entity";

export enum Role {
    USER = 'user',
    ADMIN = 'admin',
}

@Entity()
export class UserModel {
    // ID
    // 자동으로 id를 생성한다.
    // @PrimaryGeneratedColumn()
    // Primary Column은 모든 테이블에서 기본적으로 존재해야한다.
    // 테이블 안에서 각각의 Row를 구분할 수 있는 Column.
    // @PrimaryColumn()
    // @PrimaryGeneratedColumn()
    // uuid는 절대로 중복되지 않는 키를 생성
    // ex ) a9dv9a0sdv-asdviausdha3923-asdjvasndifa-123jsndffks
    @PrimaryGeneratedColumn()
    id: number;

    // 제목
    @Column()
    email: string;

    // 데이터 생성 날짜
    // 데이터가 생성되는 날짜와 시간이 자동으로 찍힌다.
    @CreateDateColumn()
    createdAt: Date;

    // 데이터 업데이트 날짜
    // 데이터가 업데이트 되는 날짜와 시간이 자동으로 업데이트 된다.
    @UpdateDateColumn()
    updatedAt: Date;

    // 데이터가 업데이트 될 때마다 1씩 올라간다.
    // 처음 생성되면 값은 1이다.
    // save() 함수가 몇 번 불렸는지 기억한다.
    @VersionColumn()
    version: number;

    @Column()
    @Generated('uuid')
    additionalId: number;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,

    })
    role: Role;

    @OneToOne(() => ProfileModel, (profile) => profile.user)
    @JoinColumn()
    profile: ProfileModel;

    @OneToMany(() => PostModel, (post) => post.author)
    posts: PostModel[];
}