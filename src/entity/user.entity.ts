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

    @OneToOne(() => ProfileModel, (profile) => profile.user, {
        eager: false,
        // 저장할 때 relation을 한번에 저장 가능
        cascade: true,
        // null가능한지
        nullable: true,
        // 관계가 삭제됐을 때
        // no action => 아무것도 안함
        // cascade => 참조하는 Row도 같이 삭제
        // set null => 참조하는 Row에서 참조 id를 null로 변경
        // set default => 기본 세팅으로 변경 (테이블의 기본세팅)
        // restrict => 참조하고 있는 Row가 있는 경우 참조 당하는 Row삭제 불가
        onDelete: 'RESTRICT',
    })
    @JoinColumn()
    profile: ProfileModel;

    @OneToMany(() => PostModel, (post) => post.author)
    posts: PostModel[];

    @Column({
        default: 0,
    })
    count: number;
}