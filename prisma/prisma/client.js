import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const alunosAntes = await prisma.aluno.findMany();

console.log(alunosAntes);

await prisma.$disconnect();