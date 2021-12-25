import { User } from '@users/entities/user.entity';

export class Role {
  id: string;
  name: string;
  ability: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  users: User[];
}
