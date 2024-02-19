import {Controller, Get, Param, Patch, Post} from '@nestjs/common';
import { AppService } from './app.service';
import {InjectRepository} from "@nestjs/typeorm";
import {Role, UserModel} from "./entity/user.entity";
import {Repository} from "typeorm";
import {ProfileModel} from "./entity/profile.entity";
import {PostModel} from "./entity/post.entity";

@Controller('users')
export class AppController {
  constructor(
      @InjectRepository(UserModel)
      private readonly userRepository: Repository<UserModel>,
      @InjectRepository(ProfileModel)
      private readonly profileRepository: Repository<ProfileModel>,
      @InjectRepository(PostModel)
      private readonly postRepository: Repository<PostModel>
  ) {}

  @Get()
  getUsers() {
    return this.userRepository.find({
      relations: {
        profile: true,
        posts: true,
      }
    });
  }

  @Post()
  postUser() {
    return this.userRepository.save({});
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
      role: Role.ADMIN,
    });
  }

  @Post('/profile')
  async createUserAndProfile() {
    const profile = await this.profileRepository.save({
      profileImg: 'asdvs.jpg',
    });

    const user = await this.userRepository.save({
      email: 'asdf@vasdvad.com',
      profile
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
}
