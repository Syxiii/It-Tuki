import { PrismaClient, Role } from "@prisma/client"
import argon2 from "argon2"

const prisma = new PrismaClient()

async function main() {
  const email = "admin@test.com"

  const existingAdmin = await prisma.user.findUnique({
    where: { email },
  })

  if (existingAdmin) {
    console.log("Admin user already exists")
    return
  }

  const passwordHash = await argon2.hash("admin123")

  await prisma.user.create({
    data: {
      email,
      name: "Test Admin",
      passwordHash,
      role: Role.ADMIN,
    },
  })

  console.log("✅ Test admin user created")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

