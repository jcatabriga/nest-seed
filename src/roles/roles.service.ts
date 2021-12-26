import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      return await this.prisma.role.create({
        data: createRoleDto,
      });
    } catch (e) {
      throw new BadRequestException(`Error in ${e.meta.cause}`);
    }
  }

  async findAll(where?: Prisma.RoleFindManyArgs) {
    return await this.prisma.role.findMany(where);
  }

  async findOne(id: string) {
    return await this.prisma.role.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    try {
      return await this.prisma.role.update({
        where: {
          id,
        },
        data: updateRoleDto,
      });
    } catch (e) {
      throw new BadRequestException(`Error in ${e.meta.cause}`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.role.update({
        where: {
          id,
        },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (e) {
      throw new BadRequestException(`Error in ${e.meta.cause}`);
    }
  }
}
