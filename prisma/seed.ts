import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createUsersAndRoles() {
  const ADMIN_ID = '1';

  await prisma.user.createMany({
    data: [
      {
        id: ADMIN_ID,
        email: 'admin@eurekalabs.com.br',
        password: 'admin',
        name: 'admin',
      },
      {
        id: '2',
        email: 'shoulders@eurekalabs.com.br',
        password: 'shoulders',
        name: 'shoulders',
      },
      {
        id: '3',
        email: 'user@eurekalabs.com.br',
        password: 'user',
        name: 'user',
      },
    ],
    skipDuplicates: true,
  });

  await prisma.role.create({
    data: {
      name: 'admin',
      users: {
        connect: {
          id: ADMIN_ID,
        },
      },
    },
  });
}

async function main() {
  await createUsersAndRoles();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
