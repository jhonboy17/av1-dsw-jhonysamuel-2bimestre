import * as PacienteModel from "../models/pacienteModel.js";

function parseIdParam(req) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return null;
  return id;
}

function normalizeSeveridade(value) {
  if (typeof value !== "string") return null;
  const upper = value.trim().toUpperCase();
  if (upper === "GRAVE" || upper === "MEDIANO" || upper === "LEVE") return upper;
  return null;
}

export async function listar(req, res) {
  try {
    const pacientes = await PacienteModel.listar();
    return res.json(pacientes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao listar pacientes" });
  }
}

export async function buscarPorId(req, res) {
  const id = parseIdParam(req);
  if (!id) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  try {
    const paciente = await PacienteModel.buscarPorId(id);
    if (!paciente) {
      return res.status(404).json({ erro: "Paciente não encontrado" });
    }
    return res.json(paciente);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao buscar paciente" });
  }
}

export async function criar(req, res) {
  const { nome, idade, doenca, severidade, observacoes } = req.body;

  if (typeof nome !== "string" || nome.trim() === "") {
    return res.status(400).json({ erro: "nome é obrigatório" });
  }

  if (!Number.isInteger(idade) || idade < 0) {
    return res.status(400).json({ erro: "idade deve ser inteiro >= 0" });
  }

  if (typeof doenca !== "string" || doenca.trim() === "") {
    return res.status(400).json({ erro: "doenca é obrigatória" });
  }

  const severidadeNormalizada = normalizeSeveridade(severidade);
  if (!severidadeNormalizada) {
    return res.status(400).json({ erro: "severidade deve ser GRAVE, MEDIANO ou LEVE" });
  }

  if (
    observacoes !== undefined &&
    observacoes !== null &&
    typeof observacoes !== "string"
  ) {
    return res.status(400).json({ erro: "observacoes deve ser string ou null" });
  }

  try {
    const pacienteCriado = await PacienteModel.criar({
      nome: nome.trim(),
      idade,
      doenca: doenca.trim(),
      severidade: severidadeNormalizada,
      observacoes: observacoes === undefined ? undefined : observacoes
    });

    return res.status(201).json(pacienteCriado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao criar paciente" });
  }
}

export async function atualizar(req, res) {
  const id = parseIdParam(req);
  if (!id) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const { nome, idade, doenca, severidade, observacoes } = req.body;

  if (nome !== undefined && (typeof nome !== "string" || nome.trim() === "")) {
    return res.status(400).json({ erro: "nome inválido" });
  }

  if (idade !== undefined && (!Number.isInteger(idade) || idade < 0)) {
    return res.status(400).json({ erro: "idade deve ser inteiro >= 0" });
  }

  if (
    doenca !== undefined &&
    (typeof doenca !== "string" || doenca.trim() === "")
  ) {
    return res.status(400).json({ erro: "doenca inválida" });
  }

  const severidadeNormalizada =
    severidade === undefined ? undefined : normalizeSeveridade(severidade);
  if (severidade !== undefined && !severidadeNormalizada) {
    return res.status(400).json({ erro: "severidade deve ser GRAVE, MEDIANO ou LEVE" });
  }

  if (
    observacoes !== undefined &&
    observacoes !== null &&
    typeof observacoes !== "string"
  ) {
    return res.status(400).json({ erro: "observacoes deve ser string ou null" });
  }

  const dadosParaAtualizar = {
    ...(nome !== undefined ? { nome: nome.trim() } : {}),
    ...(idade !== undefined ? { idade } : {}),
    ...(doenca !== undefined ? { doenca: doenca.trim() } : {}),
    ...(severidadeNormalizada !== undefined
      ? { severidade: severidadeNormalizada }
      : {}),
    ...(observacoes !== undefined ? { observacoes } : {})
  };

  if (Object.keys(dadosParaAtualizar).length === 0) {
    return res.status(400).json({ erro: "Envie ao menos um campo para atualizar" });
  }

  try {
    const pacienteAtualizado = await PacienteModel.atualizar(
      id,
      dadosParaAtualizar
    );

    if (!pacienteAtualizado) {
      return res.status(404).json({ erro: "Paciente não encontrado" });
    }

    return res.json(pacienteAtualizado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao atualizar paciente" });
  }
}

export async function excluir(req, res) {
  const id = parseIdParam(req);
  if (!id) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  try {
    const pacienteExcluido = await PacienteModel.excluir(id);
    if (!pacienteExcluido) {
      return res.status(404).json({ erro: "Paciente não encontrado" });
    }
    return res.json(pacienteExcluido);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao excluir paciente" });
  }
}
