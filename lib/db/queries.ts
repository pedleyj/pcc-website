import { prisma } from './index'

export async function getSiteSettings() {
  return prisma.siteSettings.findFirst()
}

export async function getLatestMessages(limit = 4) {
  return prisma.message.findMany({
    take: limit,
    orderBy: { date: 'desc' },
  })
}

export async function getUpcomingEvents(limit = 3) {
  return prisma.event.findMany({
    where: {
      startDate: { gte: new Date() },
    },
    take: limit,
    orderBy: [
      { featured: 'desc' },
      { startDate: 'asc' },
    ],
  })
}

export async function getCurrentAlphaSession() {
  return prisma.alphaSession.findFirst({
    where: {
      registrationOpen: true,
      startDate: { gte: new Date() },
    },
    orderBy: { startDate: 'asc' },
  })
}

export async function getActiveMinistries() {
  return prisma.ministry.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  })
}

export async function getLeadershipTeam() {
  return prisma.staffMember.findMany({
    where: { active: true, leadership: true },
    orderBy: { order: 'asc' },
  })
}

export async function getAllStaff() {
  return prisma.staffMember.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  })
}
