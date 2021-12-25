import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Prisma } from '@prisma/client';
import { ParseQueryNumberPipe } from 'pipes/ParseQueryNumberPipe.pipe';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  async findAll(
    @Query('orderBy')
    orderBy?: Prisma.Enumerable<Prisma.UserOrderByWithRelationInput>,
    @Query('skip', ParseQueryNumberPipe) skip?: number,
    @Query('take', ParseQueryNumberPipe) take?: number,
  ) {
    return this.rolesService.findAll({
      skip,
      take: take <= 100 ? take : 10,
      orderBy,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, UpdateRoleDto.toEntity(updateRoleDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
