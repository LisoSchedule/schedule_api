import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default prisma;

export async function connectDb() {
  await prisma.$connect();
  console.debug("Connected to database successfully");
}

export async function disconnectDb() {
  await prisma.$disconnect();
  console.debug("Disconnected from database successfully");
}
