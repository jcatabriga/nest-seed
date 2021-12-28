import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { exceptionMessages } from '@utils/exceptionMessages';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const entity = await this.prisma.role.create({
      data: createRoleDto,
    });
    if (!entity) {
      throw new BadRequestException(exceptionMessages.BAD_REQUEST);
    }
    return new Role({ role: entity });
  }

  async findAll(where?: Prisma.RoleFindManyArgs) {
    const entity = await this.prisma.role.findMany(where);
    return entity.map((role) => new Role({ role }));
  }

  async findOne(id: string) {
    const entity = await this.prisma.role.findUnique({
      where: {
        id,
      },
    });
    if (!entity) {
      throw new BadRequestException(exceptionMessages.BAD_REQUEST);
    }
    return new Role({ role: entity });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const entity = await this.prisma.role.update({
      where: {
        id,
      },
      data: updateRoleDto,
    });
    if (!entity) {
      throw new BadRequestException(exceptionMessages.BAD_REQUEST);
    }
    return new Role({ role: entity });
  }

  async remove(id: string) {
    const entity = await this.prisma.role.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    if (!entity) {
      throw new BadRequestException(exceptionMessages.BAD_REQUEST);
    }
    return new Role({ role: entity });
  }
}
