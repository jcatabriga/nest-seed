export class Role {
  id: string;

  name: string;

  ability: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;

  userIds: string[];

  constructor({ role }: { role: Role }) {
    this.id = role.id;
    this.name = role.name;
    this.ability = role.ability;
    this.createdAt = role.createdAt;
    this.updatedAt = role.updatedAt;
    this.deletedAt = role.deletedAt;
    this.userIds = role.userIds;
  }
}
