import { PrismaClient } from '@/app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

// Create a single connection pool for the app
const connectionString = process.env.DATABASE_URL

// Only create pool if DATABASE_URL exists
const pool = connectionString ? new Pool({ connectionString }) : null

const createPrismaClient = () => {
  if (!pool) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  // Create adapter using the connection pool
  const adapter = new PrismaPg(pool)

  // Pass adapter to PrismaClient
  return new PrismaClient({ adapter })
}

type PrismaClientInstance = ReturnType<typeof createPrismaClient>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientInstance | undefined
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
