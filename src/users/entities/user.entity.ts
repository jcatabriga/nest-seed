import { Contact } from '@contacts/entities/contact.entity';
import { Role } from '@roles/entities/role.entity';

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  roles: Role[];
  contacts: Contact[];
}
