import { Contact } from '@contacts/entities/contact.entity';
import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './create-contact.dto';

export class UpdateContactDto extends PartialType(CreateContactDto) {
  static toEntity(dto: UpdateContactDto): Partial<Contact> {
    return {
      type: dto.type,
      value: dto.value,
      userId: dto.userId,
    };
  }
}
