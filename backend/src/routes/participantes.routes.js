const express = require ("express")

const {
    listarParticipantes,
    cadastrarParticipante,
    buscarParticipantePorCpf    
} = require ("../controllers/participante.controller")

const router = express.Router()

const verificarToken = require("../middleware/auth.middleware")

router.get("/",verificarToken,listarParticipantes)
router.post("/",cadastrarParticipante)
router.get("/:cpf",buscarParticipantePorCpf)

module.exports = router

