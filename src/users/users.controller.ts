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
import { ParseQueryNumberPipe } from 'common/pipes/parse-query-number.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query('orderBy')
    orderBy?: Prisma.Enumerable<Prisma.UserOrderByWithRelationInput>,
    @Query('skip', ParseQueryNumberPipe) skip?: number,
    @Query('take', ParseQueryNumberPipe) take?: number,
  ) {
    return this.usersService.findAll({
      skip,
      take: take <= 100 ? take : 10,
      orderBy,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
      where: {
        deletedAt: null,
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, UpdateUserDto.toEntity(updateUserDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
