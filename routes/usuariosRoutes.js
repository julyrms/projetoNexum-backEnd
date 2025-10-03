const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");

router.post("/criarUsuario", usuariosController.criarUsuario);
router.post("/login", usuariosController.loginUsuario);
router.put("/atualizarUsuario/:id", usuariosController.atualizarUsuario);
router.get("/usuarioPorId/:id", usuariosController.buscarUsuarioPorId);
router.delete("/apagarUsuario/:id", usuariosController.apagarUsuario);

module.exports = router;

// criar usuario
// login usuario
// atualiza usuario
// buscar usuario por id
// apagar usuario
