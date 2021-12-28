export type ContactType =
  | 'PHONE'
  | 'EMAIL'
  | 'FACEBOOK'
  | 'TWITTER'
  | 'INSTAGRAM'
  | 'LINKEDIN'
  | 'GITHUB'
  | 'WEBSITE';

export class Contact {
  id: string;

  type: ContactType;

  value: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;

  userId: string;

  constructor({ contact }: { contact: Contact }) {
    this.id = contact.id;
    this.type = contact.type;
    this.value = contact.value;
    this.createdAt = contact.createdAt;
    this.updatedAt = contact.updatedAt;
    this.deletedAt = contact.deletedAt;
    this.userId = contact.userId;
  }
}
