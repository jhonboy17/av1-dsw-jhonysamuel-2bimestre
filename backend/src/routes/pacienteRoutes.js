import express from "express";
import * as PacienteController from "../controllers/pacienteController.js";

const router = express.Router();

router.get("/patients", PacienteController.listar);
router.get("/patients/:id", PacienteController.buscarPorId);
router.post("/patients", PacienteController.criar);
router.put("/patients/:id", PacienteController.atualizar);
router.delete("/patients/:id", PacienteController.excluir);

export default router;
