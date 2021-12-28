import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateUserDto {
  /**
   * The user name that will be used to show the profile.
   * @example 'John Doe'
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * The user email that will be used to login.
   * @example 'example@email.com'
   */
  @IsEmail()
  email: string;

  /**
   * The user password that will be used to login.
   * @example '1a2b3c4d5e6'
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(8)
  password: string;

  @IsOptional()
  avatar: string;
}

export class BatchCreateUserDTO {
  @IsNotEmpty()
  @Type(() => CreateUserDto)
  @ValidateNested({ each: true })
  users: CreateUserDto[];
}
