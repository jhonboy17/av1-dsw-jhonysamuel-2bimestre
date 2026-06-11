// ========================================
// MODEL - CAMADA DE DADOS (PRISMA)
// ========================================
// Esta camada é responsável por:
// - Acessar o banco de dados via Prisma Client
// - Implementar operações CRUD

import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

function isP2025(error) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  );
}

// ========================================
// OPERAÇÕES CRUD (ENTIDADE PRINCIPAL: Task)
// ========================================

/**
 * lista todos os registros
 * @returns {Promise<Array>}
 */
export async function listar() {
  try {
    return await prisma.task.findMany({ orderBy: { id: "asc" } });
  } catch (error) {
    if (isP2025(error)) return null;
    throw error;
  }
}

/**
 * busca um registro por ID
 * @param {number} id
 * @returns {Promise<Object|null>}
 */
export async function buscarPorId(id) {
  try {
    return await prisma.task.findUnique({ where: { id } });
  } catch (error) {
    if (isP2025(error)) return null;
    throw error;
  }
}

/**
 * cria um novo registro
 * @param {{titulo: string, descricao?: (string|null), concluida?: boolean}} dados
 * @returns {Promise<Object|null>}
 */
export async function criar(dados) {
  try {
    return await prisma.task.create({ data: dados });
  } catch (error) {
    if (isP2025(error)) return null;
    throw error;
  }
}

/**
 * atualiza parcialmente um registro
 * @param {number} id
 * @param {{titulo?: string, descricao?: (string|null), concluida?: boolean}} dados
 * @returns {Promise<Object|null>}
 */
export async function atualizar(id, dados) {
  try {
    return await prisma.task.update({ where: { id }, data: dados });
  } catch (error) {
    if (isP2025(error)) return null;
    throw error;
  }
}

/**
 * remove um registro
 * @param {number} id
 * @returns {Promise<Object|null>}
 */
export async function excluir(id) {
  try {
    return await prisma.task.delete({ where: { id } });
  } catch (error) {
    if (isP2025(error)) return null;
    throw error;
  }
}
