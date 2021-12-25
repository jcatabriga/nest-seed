import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  SELECT_USER_FIELDS: Partial<Prisma.UserSelect>;

  constructor(private readonly prisma: PrismaService) {
    this.SELECT_USER_FIELDS = {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    };
  }

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: createUserDto,
      select: this.SELECT_USER_FIELDS,
    });
  }

  async findAll(where?: Prisma.UserFindManyArgs) {
    return await this.prisma.user.findMany(where);
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: this.SELECT_USER_FIELDS,
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
      select: this.SELECT_USER_FIELDS,
    });
  }

  async remove(id: string) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
      select: this.SELECT_USER_FIELDS,
    });
  }
}
