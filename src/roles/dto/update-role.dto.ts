import { PartialType } from '@nestjs/mapped-types';
import { Role } from '@roles/entities/role.entity';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  static toEntity(dto: UpdateRoleDto): Partial<Role> {
    return {
      name: dto.name,
      ability: dto.ability,
    };
  }
}
