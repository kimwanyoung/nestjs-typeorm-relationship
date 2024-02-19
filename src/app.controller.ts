import {Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import { AppService } from './app.service';
import {InjectRepository} from "@nestjs/typeorm";
import {Role, UserModel} from "./entity/user.entity";
import {
  Between,
  Equal,
  ILike, In, IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository
} from "typeorm";
import {ProfileModel} from "./entity/profile.entity";
import {PostModel} from "./entity/post.entity";
import {TagModel} from "./entity/tag.entity";

@Controller('users')
export class AppController {
  constructor(
      @InjectRepository(UserModel)
      private readonly userRepository: Repository<UserModel>,
      @InjectRepository(ProfileModel)
      private readonly profileRepository: Repository<ProfileModel>,
      @InjectRepository(PostModel)
      private readonly postRepository: Repository<PostModel>,
      @InjectRepository(TagModel)
      private readonly tagRepository: Repository<TagModel>
  ) {}

  @Get()
  getUsers() {
    return this.userRepository.find({
      order: {
        id: 'ASC',
      },
      // 필터링할 조건을 입력하게 된다.
      where: {
        // 아닌경우 가져오기
        // id: Not(1),
        // 적은경우
        // id: LessThan(30),
        // 적은경우 Or 같은경우
        // id: LessThanOrEqual(30),
        // 큰 경우
        // id: MoreThan(30),
        // 크거나 같은경우
        // id: MoreThanOrEqual(30),
        // 같은 경우
        // id: Equal(30),
        // 유사값 가져오기
        // email: Like('%0%'),
        // 대문자 소문자 구분X
        // email: ILike('%GoOgLe%'),
        // 사이 값
        // id: Between(12, 30),
        // 해당되는 여러개의 값
        // id: In([1,3,5,7,9]),
        // id: IsNull(),
      },

      // 어떤 프로퍼티를 선택할지
      // 기본은 모든 프로퍼티를 가져온다.
      // 만약 select를 정의하지 않으면
      // select 정의하면 정의된 프로퍼티만 가져온다.
      // select: {
      //   id: true,
      //   createdAt: true,
      //   updatedAt: true,
      //   version: true,
      // },
      // relations: {
      //   profile: true,
      // },
      // 정렬 기준
      // ASC => 오름차순
      // DESC => 내림차순
      // order: {
      //   id: "DESC"
      // },
      // 처음 몇개를 제외할지
      // skip: 0,
      // 몇개를 가져올지
      // default : 전체 테이블의 길이만큼 가져온다 기본 값은 0,
      // take: 2
    });
  }

  @Post()
  async postUser() {
    for (let i = 0; i < 100; i++) {
      await this.userRepository.save({
        email: `user-${i}@google.com`,
      });
    }
  }

  @Patch(':id')
  async patchUser(
      @Param('id') id: string,
  ) {
    const user = await this.userRepository.findOne({
      where: {
        id: parseInt(id),
      }
    })

    return await this.userRepository.save({
      ...user,
      email: user.email + '0',
    });
  }

  @Post('/profile')
  async createUserAndProfile() {
    // const profile = await this.profileRepository.save({
    //   profileImg: 'asdvs.jpg',
    // });

    const user = await this.userRepository.save({
      email: 'asdf@vasdvad.com',
      profile: {
        profileImg: 'asdf.jpg',
      }
    });

    return user;
  }

  @Post('/post')
  async createUserAndPost() {
    const user = await this.userRepository.save({
      email: 'thisistest@email.com'
    });
    const post = await this.postRepository.save({
      title: String(user.id),
      author: user,
    });
    const post2 = await this.postRepository.save({
      title: String(user.id),
      author: user,
    });
    return user;
  }

  @Post('/posts/tags')
  async createPostsAndTags() {
    const post1 = await this.postRepository.save({
      title: 'tag test 1',
    });

    const post2 = await this.postRepository.save({
      title: 'tag test 2',
    });

    const tag1 = await this.tagRepository.save({
      name: 'tag 1 javascript',
      posts: [post1, post2],
    });

    const tag2 = await this.tagRepository.save({
      name: 'tag 2 typescript',
      posts: [post1]
    });

    const post3 = await this.postRepository.save({
      title: 'nextjs framework',
      tags: [tag1, tag2],
    })

    return true;
  }

  @Get('posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags:true
      }
    });
  }

  @Get('tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts:true
      }
    });
  }

  @Delete('/profile/:id')
  async deleteProfile(
      @Param('id') id: string
  ) {
    await this.profileRepository.delete(+id);
  }

  @Post('sample')
  async sample() {
    // 모델에 해당되는 객체 생성 - 저장은 안함
    // const user1 = this.userRepository.create({
    //   email: 'test@google.com',
    // });

    // 저장
    // const user2 = await this.userRepository.save({
    //   email: 'testSave@gmail.com',
    // })

    // preload
    // 입력된 값을 기반으로 데이터베이스에 있는 데이터를 불러오고
    // 추가 입력된 값으로 데이터베이스에서 가져온 값들을 대체함.
    // 저장하지는 않음
    // const user3 = await this.userRepository.preload({
    //   id: 101,
    //   email: 'testPreload@gmail.com',
    // })

    // 삭제하기
    // await this.userRepository.delete(101);

    // 값 증가
    // await this.userRepository.increment({
    //   id: 1,
    // }, 'count', 2);

    // 값 감소
    // await this.userRepository.decrement({
    //   id: 1,
    // }, 'count', 1);

    // 갯수 카운트하기
    // const count = await this.userRepository.count({
    //   where: {
    //     email: ILike('%0%'),
    //   }
    // })

    // 전부 더하기
    // const sum = await this.userRepository.sum('count', {
    //   id: LessThan(4),
    // })

    // 평균
    // const average = await this.userRepository.average('count', {
    //   id: LessThan(4),
    // });

    // 최솟값
    // const min = await this.userRepository.minimum('count', {
    //   id: LessThan(4),
    // })

    //최댓값
    // const max = await this.userRepository.maximum('count', {
    //   id: LessThan(4),
    // })

    // pagination 할 때 유용한
    // const usersAndCount = await this.userRepository.findAndCount({
    //   take: 20,
    // })

    return usersAndCount;
  }
}
