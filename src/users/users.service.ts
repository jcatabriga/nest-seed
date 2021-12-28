import { AuthService } from '@auth/auth.service';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { exceptionMessages } from '@utils/exceptionMessages';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.authService.hashPassword(
      createUserDto.password,
    );
    const entity = await this.prisma.user.create({
      data: { ...createUserDto, password: hashedPassword },
    });

    if (!entity) {
      throw new BadRequestException(exceptionMessages.BAD_REQUEST);
    }
    return new User({ user: entity });
  }

  async findAll(where?: Prisma.UserFindManyArgs) {
    const entities = await this.prisma.user.findMany(where);

    return entities.map((user) => new User({ user }));
  }

  async findOne({ id, email }: { id?: string; email?: string }) {
    const entity = await this.prisma.user.findUnique({
      where: {
        id,
        email,
      },
      include: {
        contacts: true,
      },
    });
    if (!entity) {
      throw new BadRequestException(exceptionMessages.NOT_FOUND);
    }
    const { contacts, ...user } = entity;
    return new User({ user, contacts });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const entity = await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
    if (!entity) {
      throw new BadRequestException(exceptionMessages.BAD_REQUEST);
    }
    return new User({ user: entity });
  }

  async remove(id: string) {
    const entity = await this.prisma.user.update({
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
    return new User({ user: entity });
  }
}
