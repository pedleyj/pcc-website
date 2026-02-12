import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Clear existing data
  await prisma.staffMember.deleteMany()
  await prisma.smallGroup.deleteMany()
  await prisma.supportResource.deleteMany()
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

  // Staff Members
  const staffMembers = [
    {
      name: 'Mark Tumney',
      role: 'Lead Pastor',
      title: 'Lead Pastor',
      department: 'Pastoral',
      email: 'markt@wearepcc.com',
      photoUrl: 'https://wearepcc.com/wp-content/uploads/2024/01/mark-tumney.png',
      bio: 'Mark has served as Lead Pastor of PCC since [year]. He is passionate about helping people know Jesus deeply and follow Him faithfully.',
      order: 1,
      leadership: true,
      active: true,
    },
    {
      name: 'Dan Perkins',
      role: 'Executive Pastor',
      title: 'Executive Pastor',
      department: 'Pastoral',
      email: 'danp@wearepcc.com',
      photoUrl: 'https://wearepcc.com/wp-content/uploads/2024/10/dan-perkins-2-450x300.png',
      bio: 'Dan serves as Executive Pastor, overseeing operations and supporting the ministry teams at PCC.',
      order: 2,
      leadership: true,
      active: true,
    },
    {
      name: 'Rachel Taylor',
      role: 'Spiritual Formation Pastor',
      title: 'Spiritual Formation Pastor',
      department: 'Pastoral',
      email: 'rachelt@wearepcc.com',
      photoUrl: 'https://wearepcc.com/wp-content/uploads/2025/08/rachel-taylor-450x300.png',
      bio: 'Rachel leads spiritual formation initiatives, helping our community grow deeper in their faith journey.',
      order: 3,
      leadership: true,
      active: true,
    },
    {
      name: 'Anjanette Lundell',
      role: 'Children\'s Ministry Director',
      title: 'Children\'s Ministry Director',
      department: 'Kids',
      email: 'anjanettel@wearepcc.com',
      photoUrl: 'https://wearepcc.com/wp-content/uploads/2026/02/anjanette-lundell-web-crop-450x300.png',
      bio: 'Anjanette leads our Children\'s Ministry, creating engaging environments where kids can know Jesus deeply.',
      order: 4,
      leadership: false,
      active: true,
    },
    {
      name: 'Austin Hochstetler',
      role: 'Middle School Ministry Director',
      title: 'Middle School Ministry Director',
      department: 'Youth',
      email: 'austinh@wearepcc.com',
      photoUrl: 'https://wearepcc.com/wp-content/uploads/2024/12/austin-hochstetler-450x300.jpeg',
      bio: 'Austin leads our middle school ministry, guiding students through these formative years with energy and care.',
      order: 5,
      leadership: false,
      active: true,
    },
    {
      name: 'Jeremiah Campos',
      role: 'High School Ministry Director',
      title: 'High School Ministry Director',
      department: 'Youth',
      email: 'jeremiahc@wearepcc.com',
      photoUrl: 'https://wearepcc.com/wp-content/uploads/2022/05/jeremiah-campos.png',
      bio: 'Jeremiah disciples high school students, helping them navigate faith in today\'s world.',
      order: 6,
      leadership: false,
      active: true,
    },
    {
      name: 'Joseph Krishna',
      role: 'Worship Leader',
      title: 'Worship Leader',
      department: 'Worship',
      email: 'josephk@wearepcc.com',
      photoUrl: 'https://wearepcc.com/wp-content/uploads/2022/05/joseph-krishna-450x300.png',
      bio: 'Joseph leads our worship team, creating space for our community to encounter God through music and worship.',
      order: 7,
      leadership: false,
      active: true,
    },
    {
      name: 'Carina Gleason',
      role: 'Creative Manager & Worship Coordinator',
      title: 'Creative Manager & Worship Coordinator',
      department: 'Worship',
      email: 'carinag@wearepcc.com',
      photoUrl: 'https://wearepcc.com/wp-content/uploads/2021/07/carina-gleason.png',
      bio: 'Carina coordinates our worship ministry and manages creative initiatives across the church.',
      order: 8,
      leadership: false,
      active: true,
    },
    {
      name: 'Sharon Seeberger',
      role: 'Glocal Ministry Director',
      title: 'Glocal Ministry Director',
      department: 'Outreach',
      email: 'sharons@wearepcc.com',
      photoUrl: 'https://wearepcc.com/wp-content/uploads/2020/08/sharon-seeberger-1-450x300.png',
      bio: 'Sharon leads our global and local outreach efforts, connecting PCC with mission partners worldwide.',
      order: 9,
      leadership: false,
      active: true,
    },
    {
      name: 'Joy Reeve-Mitta',
      role: 'Spiritual Formation Coordinator',
      title: 'Spiritual Formation Coordinator',
      department: 'Pastoral',
      email: 'joyr@wearepcc.com',
      photoUrl: 'https://wearepcc.com/wp-content/uploads/2025/08/joy-reeve-mitta-450x300.png',
      bio: 'Joy coordinates spiritual formation programs, helping our community grow in Christ-likeness.',
      order: 10,
      leadership: false,
      active: true,
    },
    {
      name: 'Summer Levinson',
      role: 'Young Adults (The Network) Coordinator',
      title: 'Young Adults Coordinator',
      department: 'Youth',
      email: 'summerl@wearepcc.com',
      photoUrl: 'https://wearepcc.com/wp-content/uploads/2022/02/summer-levinson.png',
      bio: 'Summer leads The Network, our young adults ministry, creating community for those in their 20s and 30s.',
      order: 11,
      leadership: false,
      active: true,
    },
    {
      name: 'Caroline Carmichael',
      role: 'Children\'s Ministry Associate',
      title: 'Children\'s Ministry Associate',
      department: 'Kids',
      email: 'carolinec@wearepcc.com',
      photoUrl: 'https://wearepcc.com/wp-content/uploads/2025/06/Caroline-Carmichael-450x300.jpeg',
      bio: 'Caroline supports our children\'s ministry, ensuring kids have excellent Sunday experiences.',
      order: 12,
      leadership: false,
      active: true,
    },
    {
      name: 'Macy Tan',
      role: 'Children\'s Ministry Coordinator',
      title: 'Children\'s Ministry Coordinator',
      department: 'Kids',
      email: 'macyt@wearepcc.com',
      photoUrl: 'https://wearepcc.com/wp-content/uploads/2022/05/macy-tan.png',
      bio: 'Macy coordinates our children\'s ministry programs and volunteers.',
      order: 13,
      leadership: false,
      active: true,
    },
    {
      name: 'Ariel Lewis',
      role: 'Worship Ministry Admin',
      title: 'Worship Ministry Admin',
      department: 'Worship',
      email: 'ariell@wearepcc.com',
      photoUrl: 'https://wearepcc.com/wp-content/uploads/2022/03/ariel-lewis-headshot-450x300.png',
      bio: 'Ariel provides administrative support for our worship ministry.',
      order: 14,
      leadership: false,
      active: true,
    },
    {
      name: 'Daisy Segal',
      role: 'Communications & Administrative Manager',
      title: 'Communications & Administrative Manager',
      department: 'Admin',
      email: 'daisys@wearepcc.com',
      phone: '650-395-0633',
      photoUrl: 'https://wearepcc.com/wp-content/uploads/2020/08/daisy-segal.png',
      bio: 'Daisy manages communications and administrative functions for PCC.',
      order: 15,
      leadership: false,
      active: true,
    },
    {
      name: 'Esther Wu',
      role: 'Media Outreach Coordinator',
      title: 'Media Outreach Coordinator',
      department: 'Admin',
      email: 'estherw@wearepcc.com',
      photoUrl: 'https://wearepcc.com/wp-content/uploads/2021/11/esther-wu-450x300.jpeg',
      bio: 'Esther coordinates our media and outreach communications.',
      order: 16,
      leadership: false,
      active: true,
    },
    {
      name: 'Jane Johnson',
      role: 'HR & Central Services Director',
      title: 'HR & Central Services Director',
      department: 'Admin',
      email: 'janej@wearepcc.com',
      phone: '650-395-0641',
      photoUrl: 'https://wearepcc.com/wp-content/uploads/2020/08/jane-johnson.png',
      bio: 'Jane leads HR and central services, supporting our staff and operations.',
      order: 17,
      leadership: false,
      active: true,
    },
    {
      name: 'Nova Mitchell',
      role: 'HR Coordinator',
      title: 'HR Coordinator',
      department: 'Admin',
      email: 'novam@wearepcc.com',
      photoUrl: 'https://wearepcc.com/wp-content/uploads/2022/06/nova-mitchell-1.png',
      bio: 'Nova supports HR operations and staff coordination.',
      order: 18,
      leadership: false,
      active: true,
    },
    {
      name: 'Tara Rankin',
      role: 'Finance Controller',
      title: 'Finance Controller',
      department: 'Admin',
      email: 'tarar@wearepcc.com',
      phone: '650-395-0636',
      photoUrl: 'https://wearepcc.com/wp-content/uploads/2020/08/tara-rankin.png',
      bio: 'Tara oversees financial operations and reporting for PCC.',
      order: 19,
      leadership: false,
      active: true,
    },
    {
      name: 'Rachel Zygarewicz',
      role: 'Accountant',
      title: 'Accountant',
      department: 'Admin',
      email: 'rachelz@wearepcc.com',
      photoUrl: 'https://wearepcc.com/wp-content/uploads/2022/05/rachel-zygarewicz.png',
      bio: 'Rachel manages accounting functions for the church.',
      order: 20,
      leadership: false,
      active: true,
    },
    {
      name: 'Caren Fior',
      role: 'Payroll & Benefits Coordinator',
      title: 'Payroll & Benefits Coordinator',
      department: 'Admin',
      email: 'carenf@wearepcc.com',
      phone: '650-395-0637',
      photoUrl: 'https://wearepcc.com/wp-content/uploads/2020/08/caren-fior.png',
      bio: 'Caren coordinates payroll and benefits for PCC staff.',
      order: 21,
      leadership: false,
      active: true,
    },
    {
      name: 'Laurie Wilson',
      role: 'Accts Payable & Contributions Specialist',
      title: 'Accts Payable & Contributions Specialist',
      department: 'Admin',
      email: 'lauriew@wearepcc.com',
      phone: '650-395-0638',
      photoUrl: 'https://wearepcc.com/wp-content/uploads/2020/08/laurie-wilson.png',
      bio: 'Laurie manages accounts payable and contribution processing.',
      order: 22,
      leadership: false,
      active: true,
    },
    {
      name: 'La Ron Wilson',
      role: 'Operations & Facilities Manager',
      title: 'Operations & Facilities Manager',
      department: 'Operations',
      email: 'laronw@wearepcc.com',
      photoUrl: 'https://wearepcc.com/wp-content/uploads/2022/06/laron-wilson-headshot-450x300.png',
      bio: 'La Ron manages operations and facilities for our campus.',
      order: 23,
      leadership: false,
      active: true,
    },
    {
      name: 'Sergio Bravo',
      role: 'Maintenance Tech',
      title: 'Maintenance Tech',
      department: 'Operations',
      email: 'sergiob@wearepcc.com',
      photoUrl: 'https://wearepcc.com/wp-content/uploads/2022/06/sergio-bravo-1.png',
      bio: 'Sergio maintains our facilities and campus.',
      order: 24,
      leadership: false,
      active: true,
    },
    {
      name: 'Meredith McLean',
      role: 'Community Center Director',
      title: 'Community Center Director',
      department: 'Community',
      email: 'meredithm@wearepcc.com',
      photoUrl: 'https://wearepcc.com/wp-content/uploads/2021/11/meredith-mclean.png',
      bio: 'Meredith directs the Peninsula Community Center.',
      order: 25,
      leadership: false,
      active: true,
    },
    {
      name: 'Setareh Pooyan',
      role: 'SACC Program Director',
      title: 'SACC Program Director',
      department: 'Community',
      email: 'setarehp@wearepcc.com',
      photoUrl: 'https://wearepcc.com/wp-content/uploads/2025/07/Setareh-Pooyan-headshot-450x300.jpg',
      bio: 'Setareh leads the School Age Child Care (SACC) program.',
      order: 26,
      leadership: false,
      active: true,
    },
    {
      name: 'Jenn Corrales',
      role: 'Preschool Director',
      title: 'Preschool Director',
      department: 'Community',
      email: 'jennc@wearepcc.com',
      photoUrl: 'https://wearepcc.com/wp-content/uploads/2023/10/jenn-corrales.png',
      bio: 'Jenn directs the PCC Preschool program.',
      order: 27,
      leadership: false,
      active: true,
    },
  ]

  for (const staff of staffMembers) {
    await prisma.staffMember.create({ data: staff })
  }

  // Small Groups
  const smallGroups = [
    // Growth Groups (short-term, starting Feb 22)
    {
      name: 'Growth Group - Lent Study',
      type: 'growth',
      description: 'Join us for a journey through Lent, exploring themes of sacrifice, renewal, and resurrection.',
      leader: 'Various Leaders',
      meetingDay: 'Varies by group',
      meetingTime: 'Varies by group',
      location: 'Various locations',
      capacity: 12,
      currentMembers: 8,
      openForSignup: true,
      churchCenterUrl: 'https://wearepcc.churchcenter.com/groups/growth-groups',
      active: true,
    },
    {
      name: 'Growth Group - New Testament Letters',
      type: 'growth',
      description: 'A 6-week study diving into the letters of Paul and their relevance for today.',
      leader: 'Various Leaders',
      meetingDay: 'Varies by group',
      meetingTime: 'Varies by group',
      location: 'Various locations',
      capacity: 12,
      currentMembers: 5,
      openForSignup: true,
      churchCenterUrl: 'https://wearepcc.churchcenter.com/groups/growth-groups',
      active: true,
    },
    // Life Groups (ongoing)
    {
      name: 'Young Families Life Group',
      type: 'life',
      description: 'An ongoing group for parents with young children (0-10). We share the joys and challenges of parenting while growing in faith together.',
      leader: 'The Johnsons',
      leaderEmail: 'familygroup@wearepcc.com',
      meetingDay: 'Tuesday',
      meetingTime: '7:00 PM',
      location: 'Redwood City',
      capacity: 15,
      currentMembers: 12,
      openForSignup: true,
      churchCenterUrl: 'https://wearepcc.churchcenter.com/groups/life-groups',
      active: true,
    },
    {
      name: 'Empty Nesters Life Group',
      type: 'life',
      description: 'For couples and individuals whose children have left home. We explore new seasons of life and ministry together.',
      leader: 'The Smiths',
      leaderEmail: 'emptynesters@wearepcc.com',
      meetingDay: 'Thursday',
      meetingTime: '6:30 PM',
      location: 'San Carlos',
      capacity: 12,
      currentMembers: 9,
      openForSignup: true,
      churchCenterUrl: 'https://wearepcc.churchcenter.com/groups/life-groups',
      active: true,
    },
    {
      name: 'Men\'s Life Group',
      type: 'life',
      description: 'Men supporting men in faith, work, and family life. Weekly meetings include Bible study and honest conversation.',
      leader: 'Tom Anderson',
      leaderEmail: 'mensgroup@wearepcc.com',
      meetingDay: 'Saturday',
      meetingTime: '7:00 AM',
      location: 'PCC Campus',
      capacity: 20,
      currentMembers: 14,
      openForSignup: true,
      churchCenterUrl: 'https://wearepcc.churchcenter.com/groups/life-groups',
      active: true,
    },
    {
      name: 'Women\'s Life Group',
      type: 'life',
      description: 'A welcoming community of women growing in faith together through Bible study, prayer, and friendship.',
      leader: 'Sarah Chen',
      leaderEmail: 'womensgroup@wearepcc.com',
      meetingDay: 'Wednesday',
      meetingTime: '9:30 AM',
      location: 'Menlo Park',
      capacity: 15,
      currentMembers: 11,
      openForSignup: true,
      churchCenterUrl: 'https://wearepcc.churchcenter.com/groups/life-groups',
      active: true,
    },
  ]

  for (const group of smallGroups) {
    await prisma.smallGroup.create({ data: group })
  }

  // Support Resources
  const supportResources = [
    {
      title: 'Stephen Ministry',
      category: 'stephen_ministry',
      description: 'Trained caregivers provide confidential, one-to-one Christian care to people experiencing difficult times in their lives. Stephen Ministers are there to listen, care, encourage, and provide emotional and spiritual support.',
      contactEmail: 'sm@wearepcc.com',
      externalUrl: 'https://wearepcc.com/support/stephenministry/',
      order: 1,
      active: true,
    },
    {
      title: 'Community Care Assistance',
      category: 'community_care',
      description: 'If you are facing a financial challenge, consider applying for assistance from our Community Care fund. Everything we give away is from donations from our church community.',
      externalUrl: 'https://wearepcc.churchcenter.com/people/forms/187335',
      order: 2,
      active: true,
    },
    {
      title: 'Financial Coaching',
      category: 'financial',
      description: 'For those seeking support in budgeting, debt consolidation, investment, and/or taxes. Our financial coach can help you navigate financial challenges.',
      contactName: 'Jeff Sampson',
      contactEmail: 'FinancialCoach@wearepcc.com',
      order: 3,
      active: true,
    },
    {
      title: 'Professional Counseling',
      category: 'counseling',
      description: 'If you are interested in professional Christian counseling, we can connect you with recommended counselors and organizations.',
      externalUrl: 'https://wearepcc.com/counseling/',
      order: 4,
      active: true,
    },
    {
      title: 'Marriage Support',
      category: 'marriage',
      description: 'Resources and support for strengthening your marriage, including counseling referrals and marriage enrichment opportunities.',
      externalUrl: 'https://wearepcc.com/grow/marriage/',
      order: 5,
      active: true,
    },
    {
      title: 'Support Groups',
      category: 'support_groups',
      description: 'Connect with others facing similar challenges. We offer various support groups throughout the year.',
      externalUrl: 'https://wearepcc.com/supportgroups/',
      order: 6,
      active: true,
    },
  ]

  for (const resource of supportResources) {
    await prisma.supportResource.create({ data: resource })
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
