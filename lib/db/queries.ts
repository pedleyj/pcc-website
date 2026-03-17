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

export async function getMessageById(id: string) {
  return prisma.message.findUnique({
    where: { id },
    include: { resources: { orderBy: { order: 'asc' } } },
  })
}

export async function getAllMessages(options?: {
  series?: string
  speaker?: string
  tag?: string
  page?: number
  pageSize?: number
}) {
  const page = options?.page || 1
  const pageSize = options?.pageSize || 12

  const where = {
    ...(options?.series ? { series: options.series } : {}),
    ...(options?.speaker ? { speaker: options.speaker } : {}),
    ...(options?.tag ? { tags: { has: options.tag } } : {}),
  }

  const [messages, total] = await Promise.all([
    prisma.message.findMany({
      where,
      include: { _count: { select: { resources: true } } },
      orderBy: { date: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.message.count({ where }),
  ])

  return { messages, total, page, pageSize, totalPages: Math.ceil(total / pageSize) }
}

export async function getMessagesBySeries(series: string, excludeId?: string) {
  return prisma.message.findMany({
    where: {
      series,
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
    orderBy: { date: 'desc' },
  })
}

export async function getSeriesNavigation(series: string, currentDate: Date, currentId: string) {
  const [prev, next] = await Promise.all([
    prisma.message.findFirst({
      where: { series, date: { lt: currentDate }, id: { not: currentId } },
      orderBy: { date: 'desc' },
      select: { id: true, title: true, speaker: true, date: true },
    }),
    prisma.message.findFirst({
      where: { series, date: { gt: currentDate }, id: { not: currentId } },
      orderBy: { date: 'asc' },
      select: { id: true, title: true, speaker: true, date: true },
    }),
  ])
  return { prev, next }
}

export async function incrementViewCount(id: string) {
  return prisma.message.update({
    where: { id },
    data: { viewCount: { increment: 1 } },
    select: { viewCount: true },
  })
}

export async function getDistinctSeries() {
  const results = await prisma.message.findMany({
    where: { series: { not: null } },
    select: { series: true },
    distinct: ['series'],
    orderBy: { date: 'desc' },
  })
  return results.map((r) => r.series!).filter(Boolean)
}

export async function getDistinctSpeakers() {
  const results = await prisma.message.findMany({
    select: { speaker: true },
    distinct: ['speaker'],
    orderBy: { speaker: 'asc' },
  })
  return results.map((r) => r.speaker)
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

export async function getAllEvents(options?: { category?: string }) {
  return prisma.event.findMany({
    where: {
      ...(options?.category ? { category: options.category } : {}),
    },
    orderBy: { startDate: 'asc' },
  })
}

export async function getEventById(id: string) {
  return prisma.event.findUnique({ where: { id } })
}

export async function getDistinctEventCategories() {
  const results = await prisma.event.findMany({
    select: { category: true },
    distinct: ['category'],
    orderBy: { category: 'asc' },
  })
  return results.map((r) => r.category)
}

export async function getCurrentAlphaSession() {
  const fourWeeksAgo = new Date()
  fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28)

  return prisma.alphaSession.findFirst({
    where: {
      registrationOpen: true,
      startDate: { gte: fourWeeksAgo },
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

// Newsletter Subscribers
export async function createNewsletterSubscriber(data: {
  email: string
  firstName?: string
}) {
  return prisma.newsletterSubscriber.create({ data })
}

export async function getNewsletterSubscriberByEmail(email: string) {
  return prisma.newsletterSubscriber.findUnique({ where: { email } })
}

export async function confirmNewsletterSubscriber(confirmToken: string) {
  return prisma.newsletterSubscriber.update({
    where: { confirmToken },
    data: { status: 'confirmed', confirmedAt: new Date() },
  })
}

export async function unsubscribeNewsletter(unsubToken: string) {
  return prisma.newsletterSubscriber.update({
    where: { unsubToken },
    data: { status: 'unsubscribed', unsubscribedAt: new Date() },
  })
}

export async function getNewsletterSubscriberByUnsubToken(unsubToken: string) {
  return prisma.newsletterSubscriber.findUnique({ where: { unsubToken } })
}

export async function getPublicPrayerRequests(limit = 15) {
  return prisma.prayerRequest.findMany({
    where: { isPublic: true },
    orderBy: { createdAt: 'desc' },
    take: limit,
    select: {
      id: true,
      name: true,
      request: true,
      createdAt: true,
    },
  })
}
