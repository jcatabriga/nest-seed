import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export function PrismaError(code: string) {
  const errors = [
    {
      code: 'P2000',
      message:
        'The provided value for the column is too long for the column type',
    },
    { code: 'P2002', message: 'Unique constraint failed' },
  ];

  const message = errors.find((e) => e.code === code).message;

  if (!message) {
    return new InternalServerErrorException();
  }

  return new BadRequestException(
    `Error in ${errors.find((e) => e.code === code).message}`,
  );
}
