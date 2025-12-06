import { PrismaClient, PlayerCategory, SkillCategory, TemplateSource } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🎾 Seeding TennisPro database...');

  // Create a system coach for templates
  // This is a special record that owns system-wide templates
  const systemCoach = await prisma.coach.upsert({
    where: { cognitoUserId: 'system' },
    update: {},
    create: {
      cognitoUserId: 'system',
      email: 'system@tennispro.internal',
      name: 'TennisPro System',
      slug: 'system',
      tier: 'enterprise',
      studentLimit: 0,
      storageLimit: BigInt(0),
      analysisLimit: 0,
    },
  });

  console.log('✓ Created system coach');

  // Create USPTA Recreational Path
  const _usptaRecreational = await prisma.progressionPath.create({
    data: {
      coachId: systemCoach.id,
      name: 'USPTA Player Development Path - Recreational',
      description: 'Based on USPTA player development guidelines for recreational players',
      playerCategory: PlayerCategory.recreational,
      isTemplate: true,
      templateSource: TemplateSource.uspta,
      isSystem: true,
      levels: {
        create: [
          {
            name: 'Beginner',
            description: 'Introduction to tennis fundamentals',
            order: 0,
            skills: {
              create: [
                {
                  name: 'Forehand Basics',
                  description: 'Foundation forehand technique',
                  category: SkillCategory.forehand,
                  order: 0,
                  milestones: {
                    create: [
                      { name: 'Continental grip understanding', order: 0 },
                      { name: 'Ready position', order: 1 },
                      { name: 'Basic swing path', order: 2 },
                      { name: 'Contact point awareness', order: 3 },
                    ],
                  },
                },
                {
                  name: 'Backhand Basics',
                  description: 'Foundation backhand technique',
                  category: SkillCategory.backhand,
                  order: 1,
                  milestones: {
                    create: [
                      { name: 'Two-hand grip', order: 0 },
                      { name: 'Unit turn', order: 1 },
                      { name: 'Basic swing path', order: 2 },
                    ],
                  },
                },
                {
                  name: 'Serve Introduction',
                  description: 'Basic serving fundamentals',
                  category: SkillCategory.serve,
                  order: 2,
                  milestones: {
                    create: [
                      { name: 'Service stance', order: 0 },
                      { name: 'Ball toss consistency', order: 1 },
                      { name: 'Basic service motion', order: 2 },
                    ],
                  },
                },
              ],
            },
          },
          {
            name: 'Intermediate',
            description: 'Developing consistency and court awareness',
            order: 1,
            skills: {
              create: [
                {
                  name: 'Forehand Development',
                  description: 'Advanced forehand mechanics',
                  category: SkillCategory.forehand,
                  order: 0,
                  milestones: {
                    create: [
                      { name: 'Topspin production', order: 0 },
                      { name: 'Cross-court consistency', order: 1 },
                      { name: 'Recovery footwork', order: 2 },
                    ],
                  },
                },
                {
                  name: 'Net Play Introduction',
                  description: 'Basic volley technique',
                  category: SkillCategory.volley,
                  order: 1,
                  milestones: {
                    create: [
                      { name: 'Continental grip for volleys', order: 0 },
                      { name: 'Split step timing', order: 1 },
                      { name: 'Punch volley technique', order: 2 },
                    ],
                  },
                },
                {
                  name: 'Movement Fundamentals',
                  description: 'Court coverage basics',
                  category: SkillCategory.movement,
                  order: 2,
                  milestones: {
                    create: [
                      { name: 'Split step on opponent contact', order: 0 },
                      { name: 'Lateral movement', order: 1 },
                      { name: 'Recovery to center', order: 2 },
                    ],
                  },
                },
              ],
            },
          },
          {
            name: 'Advanced',
            description: 'Refining technique and tactical awareness',
            order: 2,
            skills: {
              create: [
                {
                  name: 'Serve Development',
                  description: 'Advanced serving technique',
                  category: SkillCategory.serve,
                  order: 0,
                  milestones: {
                    create: [
                      { name: 'Trophy position', order: 0 },
                      { name: 'Pronation on contact', order: 1 },
                      { name: 'Kick serve basics', order: 2 },
                      { name: 'Placement accuracy', order: 3 },
                    ],
                  },
                },
                {
                  name: 'Tactical Awareness',
                  description: 'Game strategy fundamentals',
                  category: SkillCategory.strategy,
                  order: 1,
                  milestones: {
                    create: [
                      { name: 'High percentage shot selection', order: 0 },
                      { name: 'Playing to opponent weaknesses', order: 1 },
                      { name: 'Point construction', order: 2 },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log(`✓ Created USPTA Recreational path with ${3} levels`);

  // Create USPTA Competitive Junior Path
  const _usptaJunior = await prisma.progressionPath.create({
    data: {
      coachId: systemCoach.id,
      name: 'USPTA Player Development Path - Competitive Junior',
      description: 'Based on USPTA guidelines for competitive junior players',
      playerCategory: PlayerCategory.competitive_junior,
      isTemplate: true,
      templateSource: TemplateSource.uspta,
      isSystem: true,
      levels: {
        create: [
          {
            name: 'Development',
            description: 'Building competitive foundation',
            order: 0,
            skills: {
              create: [
                {
                  name: 'Consistent Rally Ball',
                  description: 'Baseline consistency under pressure',
                  category: SkillCategory.forehand,
                  order: 0,
                  milestones: {
                    create: [
                      { name: '10-ball rally consistency', order: 0 },
                      { name: 'Direction control', order: 1 },
                      { name: 'Depth management', order: 2 },
                    ],
                  },
                },
                {
                  name: 'Match Play Basics',
                  description: 'Introduction to competitive play',
                  category: SkillCategory.strategy,
                  order: 1,
                  milestones: {
                    create: [
                      { name: 'Scoring understanding', order: 0 },
                      { name: 'Between-point routine', order: 1 },
                      { name: 'Match etiquette', order: 2 },
                    ],
                  },
                },
              ],
            },
          },
          {
            name: 'Competition',
            description: 'Tournament preparation',
            order: 1,
            skills: {
              create: [
                {
                  name: 'Weapon Development',
                  description: 'Building a go-to shot',
                  category: SkillCategory.forehand,
                  order: 0,
                  milestones: {
                    create: [
                      { name: 'Inside-out forehand', order: 0 },
                      { name: 'Approach shot patterns', order: 1 },
                      { name: 'Finishing at net', order: 2 },
                    ],
                  },
                },
                {
                  name: 'Mental Toughness',
                  description: 'Competitive mindset development',
                  category: SkillCategory.mental,
                  order: 1,
                  milestones: {
                    create: [
                      { name: 'Pre-point routine', order: 0 },
                      { name: 'Focus reset after errors', order: 1 },
                      { name: 'Closing out sets', order: 2 },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log(`✓ Created USPTA Competitive Junior path with ${2} levels`);

  // Summary
  const pathCount = await prisma.progressionPath.count({ where: { isSystem: true } });
  const levelCount = await prisma.level.count();
  const skillCount = await prisma.skill.count();
  const milestoneCount = await prisma.milestone.count();

  console.log('\n📊 Seed Summary:');
  console.log(`   - System paths: ${pathCount}`);
  console.log(`   - Levels: ${levelCount}`);
  console.log(`   - Skills: ${skillCount}`);
  console.log(`   - Milestones: ${milestoneCount}`);
  console.log('\n✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
