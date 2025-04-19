import { PrismaClient, UserStep } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  try {
    const group = await prisma.group.create({
      data: {
        subGroup: 2,
        name: "CS-31",
      },
    });

    console.log(`Created group: ${group.name} with ID: ${group.id}`);

    const user = await prisma.user.create({
      data: {
        chatId: 123456789,
        username: "wastardy",
        nickname: "Andrew",
        groupId: group.id,
        step: UserStep.MainMenu,
      },
    });

    console.log(`Created user with ID: ${user.id}`);

    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
