import { Exclude, Transform } from 'class-transformer';

import { Contact } from '@contacts/entities/contact.entity';
import { Role } from '@roles/entities/role.entity';

type UserRole = Omit<Role, 'userIds'>;

export class User {
  id: string;

  name: string;

  email: string;

  @Exclude()
  password: string;

  avatar?: string;

  createdAt: Date;

  updatedAt?: Date;

  deletedAt?: Date;

  @Exclude()
  roles: UserRole[];

  @Transform(({ value }) => value?.map((r: UserRole) => r.id))
  contacts: Contact[];

  constructor({
    user,
    roles,
    contacts,
  }: {
    user: Partial<User>;
    roles?: UserRole[];
    contacts?: Contact[];
  }) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.avatar = user.avatar;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.deletedAt = user.deletedAt;
    this.roles = roles;
    this.contacts = contacts;
  }
}
