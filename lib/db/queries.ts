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

export async function getStaffByDepartment(department: string) {
  return prisma.staffMember.findMany({
    where: { active: true, department },
    orderBy: { order: 'asc' },
  })
}

export async function getStaffMemberById(id: string) {
  return prisma.staffMember.findUnique({
    where: { id },
  })
}

// Small Groups
export async function getAllSmallGroups() {
  return prisma.smallGroup.findMany({
    where: { active: true },
    orderBy: { type: 'asc' },
  })
}

export async function getSmallGroupsByType(type: 'growth' | 'life') {
  return prisma.smallGroup.findMany({
    where: { active: true, type },
  })
}

export async function getOpenSmallGroups() {
  return prisma.smallGroup.findMany({
    where: { active: true, openForSignup: true },
  })
}

// Support Resources
export async function getAllSupportResources() {
  return prisma.supportResource.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  })
}

export async function getSupportResourcesByCategory(category: string) {
  return prisma.supportResource.findMany({
    where: { active: true, category },
    orderBy: { order: 'asc' },
  })
}

// Prayer Requests
export async function createPrayerRequest(data: {
  name: string
  email?: string
  phone?: string
  request: string
  isPublic?: boolean
}) {
  return prisma.prayerRequest.create({ data })
}
