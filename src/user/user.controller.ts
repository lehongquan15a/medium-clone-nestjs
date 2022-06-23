import { UserEntity } from '@app/user/user.entity';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { LoginUserDto } from '@app/user/dto/loginUser.dto';
import { UserResponseInterface } from '@app/user/types/userResponse.interface';
import { UserService } from '@app/user/user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '@app/user/decorator/user.decorator';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const userEntity = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(userEntity);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  currentUser(@User('id') user: UserEntity): UserResponseInterface {
    return this.userService.buildUserResponse(user);
  }

  @Get('users')
  async getAll(): Promise<UserResponseInterface[]> {
    return await this.userService.getAll();
  }
}
