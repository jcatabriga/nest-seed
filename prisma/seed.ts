import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';

const prisma = new PrismaClient();
const logger = new Logger('PrismaSeed');

async function createUsersAndRoles() {
  const ADMIN_ID = '1';
  const salt = await genSalt(10);

  await prisma.user.createMany({
    data: [
      {
        id: ADMIN_ID,
        email: 'admin@eurekalabs.com.br',
        password: await hash('admin', salt),
        name: 'admin',
      },
      {
        id: '2',
        email: 'shoulders@eurekalabs.com.br',
        password: await hash('shoulders', salt),
        name: 'shoulders',
      },
      {
        id: '3',
        email: 'user@eurekalabs.com.br',
        password: await hash('user', salt),
        name: 'user',
      },
    ],
    skipDuplicates: true,
  });

  await prisma.role.create({
    data: {
      name: 'admin',
      ability: '',
      userIds: { set: [ADMIN_ID] },
    },
  });
}

async function main() {
  await createUsersAndRoles();
}

main()
  .catch((e) => {
    logger.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
