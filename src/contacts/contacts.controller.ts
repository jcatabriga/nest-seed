import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { ParseQueryNumberPipe } from 'common/pipes/parseQueryNumber.pipe';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@ApiTags('contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async create(@Body() createContactDto: CreateContactDto) {
    return await this.contactsService.create(createContactDto);
  }

  @Get()
  async findAll(
    @Query('orderBy')
    orderBy?: Prisma.Enumerable<Prisma.UserOrderByWithRelationInput>,
    @Query('skip', ParseQueryNumberPipe) skip?: number,
    @Query('take', ParseQueryNumberPipe) take?: number,
  ) {
    return await this.contactsService.findAll({
      skip,
      take: take <= 100 ? take : 10,
      orderBy,
      where: {
        deletedAt: null,
      },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.contactsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return await this.contactsService.update(
      id,
      UpdateContactDto.toEntity(updateContactDto),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.contactsService.remove(id);
  }
}
