import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createContactDto: CreateContactDto) {
    return await this.prisma.contact.create({
      data: createContactDto,
    });
  }

  async findAll(where?: Prisma.ContactFindManyArgs) {
    return await this.prisma.contact.findMany(where);
  }

  async findOne(id: string) {
    return await this.prisma.contact.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    return await this.prisma.contact.update({
      where: {
        id,
      },
      data: updateContactDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.contact.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
