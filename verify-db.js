const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  try {
    const subscriberCount = await prisma.subscriber.count()
    const postsCount = await prisma.post.count()
    console.log('Connection successful')
    console.log(`Subscribers: ${subscriberCount}`)
    console.log(`Posts: ${postsCount}`)
  } catch (e) {
    console.error('Connection failed', e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
