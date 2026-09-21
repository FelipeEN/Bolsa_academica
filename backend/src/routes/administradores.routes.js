const express = require("express")
const router = express.Router()
const verificarToken = require("../middleware/auth.middleware")
const {
    cadastrarAdministrador,
    loginAdministrador,
    perfilAdministrador
}= require("../controllers/administradores.controller")

router.post("/",cadastrarAdministrador)
router.post("/login",loginAdministrador)
router.get("/perfil",verificarToken,perfilAdministrador)

module.exports = router