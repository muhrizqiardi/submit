import { ROLE_ID } from "@/helpers/constants";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const adminRole = await prisma.role.create({
    data: {
      id: ROLE_ID.ADMIN,
      name: "ADMIN",
    },
  });

  const userRole = await prisma.role.create({
    data: {
      id: ROLE_ID.USER,
      name: "USER",
    },
  });

  if (!userRole || !adminRole) throw new Error();

  console.log('Successfully created user role: "ADMIN" and "USER"');
  console.table(adminRole);
  console.table(userRole);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Failed to create user role: "ADMIN" and "USER"');
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
