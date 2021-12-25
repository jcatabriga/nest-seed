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
}
