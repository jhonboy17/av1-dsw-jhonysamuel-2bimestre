// ========================================
// CONTROLLER - CAMADA DE CONTROLE
// ========================================
// Esta camada é responsável por:
// - Receber as requisições HTTP
// - Validar os dados recebidos
// - Chamar os métodos do Model
// - Retornar as respostas adequadas

import * as TaskModel from "../models/tarefaModel.js";

function parseIdParam(req) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return null;
  return id;
}

/**
 * Retorna todos os registros
 * @route GET /tasks
 */
export async function listar(req, res) {
  try {
    const tasks = await TaskModel.listar();
    return res.json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao listar tasks" });
  }
}

/**
 * Retorna um registro por id
 * @route GET /tasks/:id
 */
export async function buscarPorId(req, res) {
  const id = parseIdParam(req);
  if (!id) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  try {
    const task = await TaskModel.buscarPorId(id);
    if (!task) {
      return res.status(404).json({ erro: "Task não encontrada" });
    }
    return res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao buscar task" });
  }
}

/**
 * Cria um novo registro
 * @route POST /tasks
 */
export async function criar(req, res) {
  const { title, description, completed, categoryId } = req.body;

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ erro: "title é obrigatório" });
  }

  if (description !== undefined && description !== null && typeof description !== "string") {
    return res.status(400).json({ erro: "description deve ser string ou null" });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ erro: "completed deve ser boolean" });
  }

  if (
    categoryId !== undefined &&
    categoryId !== null &&
    (!Number.isInteger(categoryId) || categoryId <= 0)
  ) {
    return res.status(400).json({ erro: "categoryId deve ser inteiro positivo ou null" });
  }

  try {
    const taskCriada = await TaskModel.criar({
      title: title.trim(),
      description: description === undefined ? undefined : description,
      completed: completed === undefined ? undefined : completed,
      categoryId: categoryId === undefined ? undefined : categoryId
    });

    return res.status(201).json(taskCriada);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao criar task" });
  }
}

/**
 * Atualiza um registro (atualização parcial via PUT)
 * @route PUT /tasks/:id
 */
export async function atualizar(req, res) {
  const id = parseIdParam(req);
  if (!id) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const { title, description, completed, categoryId } = req.body;

  if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
    return res.status(400).json({ erro: "title inválido" });
  }

  if (description !== undefined && description !== null && typeof description !== "string") {
    return res.status(400).json({ erro: "description deve ser string ou null" });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ erro: "completed deve ser boolean" });
  }

  if (
    categoryId !== undefined &&
    categoryId !== null &&
    (!Number.isInteger(categoryId) || categoryId <= 0)
  ) {
    return res.status(400).json({ erro: "categoryId deve ser inteiro positivo ou null" });
  }

  const dadosParaAtualizar = {
    ...(title !== undefined ? { title: title.trim() } : {}),
    ...(description !== undefined ? { description } : {}),
    ...(completed !== undefined ? { completed } : {}),
    ...(categoryId !== undefined ? { categoryId } : {})
  };

  if (Object.keys(dadosParaAtualizar).length === 0) {
    return res.status(400).json({ erro: "Envie ao menos um campo para atualizar" });
  }

  try {
    const taskAtualizada = await TaskModel.atualizar(id, dadosParaAtualizar);
    if (!taskAtualizada) {
      return res.status(404).json({ erro: "Task não encontrada" });
    }
    return res.json(taskAtualizada);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao atualizar task" });
  }
}

/**
 * Remove um registro
 * @route DELETE /tasks/:id
 */
export async function excluir(req, res) {
  const id = parseIdParam(req);
  if (!id) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  try {
    const taskExcluida = await TaskModel.excluir(id);
    if (!taskExcluida) {
      return res.status(404).json({ erro: "Task não encontrada" });
    }
    return res.json(taskExcluida);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao excluir task" });
  }
}
