import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class CreateRoleDto {
  /**
   * The role name.
   * @type {ContactType}
   * @example 'admin'
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * The ability that the role will have (CASL format) .
   * @example '{ "create": ["user"], "read": ["user"], "update": ["user"], "delete": ["user"] }'
   */
  @IsString()
  @IsNotEmpty()
  ability: string;
}

export class BatchCreateRoleDTO {
  @IsNotEmpty()
  @Type(() => CreateRoleDto)
  @ValidateNested({ each: true })
  roles: CreateRoleDto[];
}
