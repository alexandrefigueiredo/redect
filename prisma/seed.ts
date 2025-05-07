import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@redect.com' },
    update: {},
    create: {
      email: 'admin@redect.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  // Create sample portfolio items
  const portfolios = [
    {
      title: 'Sistema de Gestão Empresarial',
      description: 'Desenvolvimento de um sistema completo para gestão de empresas, incluindo módulos de RH, financeiro e vendas.',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
      category: 'Desenvolvimento',
      link: 'https://example.com/projeto1',
      technologies: 'React, Node.js, PostgreSQL',
      authorId: admin.id,
    },
    {
      title: 'Redesign de E-commerce',
      description: 'Redesign completo de uma plataforma de e-commerce, focando na experiência do usuário e conversão.',
      imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692',
      category: 'Design',
      link: 'https://example.com/projeto2',
      technologies: 'UI/UX, Figma, Adobe XD',
      authorId: admin.id,
    },
    {
      title: 'Transformação Digital',
      description: 'Consultoria para transformação digital de uma empresa tradicional, incluindo mudanças de processos e cultura.',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
      category: 'Consultoria',
      link: 'https://example.com/projeto3',
      technologies: 'Estratégia, Processos, Cultura',
      authorId: admin.id,
    },
  ];

  // Delete existing portfolio items
  await prisma.portfolio.deleteMany();

  // Create new portfolio items
  for (const portfolio of portfolios) {
    await prisma.portfolio.create({
      data: portfolio,
    });
  }

  console.log({ admin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 