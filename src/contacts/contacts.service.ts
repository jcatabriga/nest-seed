import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { exceptionMessages } from '@utils/exceptionMessages';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createContactDto: CreateContactDto) {
    const entity = await this.prisma.contact.create({
      data: createContactDto,
    });
    if (!entity) {
      throw new BadRequestException(exceptionMessages.BAD_REQUEST);
    }
    return new Contact({ contact: entity });
  }

  async findAll(where?: Prisma.ContactFindManyArgs) {
    const entity = await this.prisma.contact.findMany(where);
    return entity.map((contact) => new Contact({ contact }));
  }

  async findOne(id: string) {
    const entity = await this.prisma.contact.findUnique({
      where: {
        id,
      },
    });
    if (!entity) {
      throw new BadRequestException(exceptionMessages.BAD_REQUEST);
    }
    return new Contact({ contact: entity });
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const entity = await this.prisma.contact.update({
      where: {
        id,
      },
      data: updateContactDto,
    });
    if (!entity) {
      throw new BadRequestException(exceptionMessages.BAD_REQUEST);
    }
    return new Contact({ contact: entity });
  }

  async remove(id: string) {
    const entity = await this.prisma.contact.update({
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
    return new Contact({ contact: entity });
  }
}
