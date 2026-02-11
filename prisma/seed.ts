import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Clear existing data
  await prisma.ministry.deleteMany()
  await prisma.event.deleteMany()
  await prisma.message.deleteMany()
  await prisma.alphaSession.deleteMany()
  console.log('Cleared existing data.')

  // Site Settings
  await prisma.siteSettings.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      serviceTimes: JSON.stringify([
        { day: 'Sunday', times: ['9:00 AM', '10:45 AM'] }
      ]),
      address: '3560 Farm Hill Boulevard, Redwood City, CA 94061',
      phone: '650-365-8094',
      email: 'info@wearepcc.com',
      liveStreamUrl: 'https://gathering.wearepcc.com',
      donationUrl: 'https://pushpay.com/g/wearepcc?src=hpp',
      youtubeUrl: 'https://www.youtube.com/channel/UClW28QqJpYnfhv6dJ2JCJbA',
    },
  })

  // Alpha Session
  await prisma.alphaSession.create({
    data: {
      season: 'Spring 2026',
      startDate: new Date('2026-02-24'),
      endDate: new Date('2026-05-05'),
      meetingDay: 'Tuesday',
      meetingTime: '6:30 PM - 8:30 PM',
      location: 'PCC Community Center, 3560 Farm Hill Blvd, Redwood City',
      description: 'Alpha is a series of sessions exploring the Christian faith. Each talk looks at a different question around faith and is designed to create conversation. It\'s a safe space to discuss life\'s big questions with others who are exploring faith.',
      registrationOpen: true,
      registrationUrl: 'https://wearepcc.churchcenter.com/people/forms/894477',
      maxCapacity: 40,
      currentCount: 15,
    },
  })

  // Messages
  const messages = [
    {
      title: 'God\'s Heart for the World',
      speaker: 'PCC Staff',
      date: new Date('2026-02-08'),
      series: 'Upside Down Kingdom',
      scripture: 'Matthew 28:18-20',
      description: 'Exploring God\'s mission for the world and our role in it.',
      thumbnail: 'https://wearepcc.com/wp-content/uploads/2025/02/ghftw-SLIDE-450x300.png',
      tags: ['missions', 'discipleship'],
    },
    {
      title: 'Don\'t be Fooled',
      speaker: 'Dan Perkins',
      date: new Date('2026-02-01'),
      series: 'Upside Down Kingdom',
      scripture: 'Matthew 7:15-23',
      description: 'Learning to discern truth in a world of deception.',
      thumbnail: 'https://wearepcc.com/wp-content/uploads/2026/01/UpsideDownKingdom-Slide-450x300.jpg',
      tags: ['discernment', 'truth'],
    },
    {
      title: 'The Thermostat (Who is King)',
      speaker: 'Mark Tumney',
      date: new Date('2026-01-25'),
      series: 'Upside Down Kingdom',
      scripture: 'Matthew 5:13-16',
      description: 'Being influencers for the Kingdom of God.',
      thumbnail: 'https://wearepcc.com/wp-content/uploads/2026/01/UpsideDownKingdom-Slide-450x300.jpg',
      tags: ['influence', 'kingdom'],
    },
    {
      title: 'The Kingdom You\'ve Always Longed For',
      speaker: 'Mark Tumney',
      date: new Date('2026-01-18'),
      series: 'Upside Down Kingdom',
      scripture: 'Matthew 5:1-12',
      description: 'Introduction to the Upside Down Kingdom series.',
      thumbnail: 'https://wearepcc.com/wp-content/uploads/2026/01/UpsideDownKingdom-Slide-450x300.jpg',
      tags: ['beatitudes', 'kingdom'],
    },
  ]

  for (const message of messages) {
    await prisma.message.create({ data: message })
  }

  // Events
  await prisma.event.create({
    data: {
      title: 'Alpha Spring 2026',
      description: 'Join us for Alpha - a series of conversations about life, faith, and meaning. Free dinner, great discussion, and a welcoming community.',
      startDate: new Date('2026-02-24'),
      endDate: new Date('2026-05-05'),
      location: 'PCC Community Center',
      registrationUrl: 'https://wearepcc.churchcenter.com/people/forms/894477',
      registrationOpen: true,
      category: 'alpha',
      featured: true,
      imageUrl: 'https://wearepcc.com/wp-content/uploads/slider21/AlphaFall2025.jpeg',
    },
  })

  await prisma.event.create({
    data: {
      title: 'Summer Camp 2026',
      description: 'The Adventure begins! Answer the call to THE GREAT QUEST. Registration now open for kids entering grades 1-6.',
      startDate: new Date('2026-06-15'),
      endDate: new Date('2026-08-15'),
      location: 'Peninsula Covenant Church',
      registrationOpen: true,
      category: 'kids',
      featured: true,
      imageUrl: 'https://wearepcc.com/wp-content/uploads/2026/01/TheGreatQuest-SummerCamp2026-SLIDE-elements-bg.jpg',
    },
  })

  // Ministries
  const ministries = [
    {
      name: 'Alpha',
      category: 'outreach',
      description: 'Explore life, faith, and meaning in a welcoming environment.',
      leader: 'Alpha Team',
      order: 1,
      active: true,
    },
    {
      name: 'Kids Ministry',
      category: 'kids',
      description: 'Helping children know Jesus deeply and follow Him faithfully.',
      order: 2,
      active: true,
    },
    {
      name: 'Youth Ministry',
      category: 'youth',
      description: 'Guiding the next generation to know and follow Jesus.',
      order: 3,
      active: true,
    },
    {
      name: 'Small Groups',
      category: 'adults',
      description: 'Connect with others in community and grow in faith together.',
      order: 4,
      active: true,
    },
    {
      name: 'Worship Team',
      category: 'worship',
      description: 'Leading our church family in worship through music and arts.',
      order: 5,
      active: true,
    },
    {
      name: 'Juntos',
      category: 'outreach',
      description: 'Spanish-speaking ministry serving our local community.',
      order: 6,
      active: true,
    },
  ]

  for (const ministry of ministries) {
    await prisma.ministry.create({ data: ministry })
  }

  console.log('Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
