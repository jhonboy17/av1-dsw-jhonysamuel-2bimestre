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
  const { titulo, descricao, concluida } = req.body;

  if (typeof titulo !== "string" || titulo.trim() === "") {
    return res.status(400).json({ erro: "titulo é obrigatório" });
  }

  if (descricao !== undefined && descricao !== null && typeof descricao !== "string") {
    return res.status(400).json({ erro: "descricao deve ser string ou null" });
  }

  if (concluida !== undefined && typeof concluida !== "boolean") {
    return res.status(400).json({ erro: "concluida deve ser boolean" });
  }

  try {
    const taskCriada = await TaskModel.criar({
      titulo: titulo.trim(),
      descricao: descricao === undefined ? undefined : descricao,
      concluida: concluida === undefined ? undefined : concluida
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

  const { titulo, descricao, concluida } = req.body;

  if (titulo !== undefined && (typeof titulo !== "string" || titulo.trim() === "")) {
    return res.status(400).json({ erro: "titulo inválido" });
  }

  if (descricao !== undefined && descricao !== null && typeof descricao !== "string") {
    return res.status(400).json({ erro: "descricao deve ser string ou null" });
  }

  if (concluida !== undefined && typeof concluida !== "boolean") {
    return res.status(400).json({ erro: "concluida deve ser boolean" });
  }

  const dadosParaAtualizar = {
    ...(titulo !== undefined ? { titulo: titulo.trim() } : {}),
    ...(descricao !== undefined ? { descricao } : {}),
    ...(concluida !== undefined ? { concluida } : {})
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
