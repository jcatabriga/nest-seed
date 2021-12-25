import { PartialType } from '@nestjs/mapped-types';
import { User } from '@users/entities/user.entity';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  static toEntity(dto: UpdateUserDto): Partial<User> {
    return {
      name: dto.name,
      email: dto.email,
      password: dto.password,
      avatar: dto.avatar,
    };
  }
}
