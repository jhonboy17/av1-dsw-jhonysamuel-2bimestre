import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

function isP2025(error) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  );
}

export async function listar() {
  try {
    return await prisma.patient.findMany({ orderBy: { id: "asc" } });
  } catch (error) {
    if (isP2025(error)) return null;
    throw error;
  }
}

export async function buscarPorId(id) {
  try {
    return await prisma.patient.findUnique({ where: { id } });
  } catch (error) {
    if (isP2025(error)) return null;
    throw error;
  }
}

export async function criar(dados) {
  try {
    return await prisma.patient.create({ data: dados });
  } catch (error) {
    if (isP2025(error)) return null;
    throw error;
  }
}

export async function atualizar(id, dados) {
  try {
    return await prisma.patient.update({ where: { id }, data: dados });
  } catch (error) {
    if (isP2025(error)) return null;
    throw error;
  }
}

export async function excluir(id) {
  try {
    return await prisma.patient.delete({ where: { id } });
  } catch (error) {
    if (isP2025(error)) return null;
    throw error;
  }
}
