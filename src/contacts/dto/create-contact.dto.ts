import { ContactType } from '@contacts/entities/contact.entity';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class CreateContactDto {
  /**
   * The contact type.
   * @type {ContactType}
   * @example 'GITHUB'
   */
  @IsString()
  @IsNotEmpty()
  type: ContactType;

  /**
   * The contact value
   * @example 'github.com/john-doe'
   */
  @IsString()
  @IsNotEmpty()
  value: string;

  /**
   * The user id that will be associated with the contact.
   * @example '1'
   */
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class BatchContactUserDTO {
  @IsNotEmpty()
  @Type(() => CreateContactDto)
  @ValidateNested({ each: true })
  contacts: CreateContactDto[];
}
