const express = require("express");
const router = express.Router();
const categoriasController = require("../controllers/categoriasController");

router.post("/adicionar", categoriasController.criarCategoria);
router.put("/atualizarCategoria/:id", categoriasController.atualizarCategoria);
router.delete("/apagarCategoria/:id", categoriasController.apagarCategoria);
router.get("/todasCategorias", categoriasController.todasCategorias);
// router.get(
//   "/pesquisarPorCidade",
// );
router.get("/pesquisarPorNome", categoriasController.pesquisarCategoriaNome);

module.exports = router;

// criar categoria
// atualizar categoria
// apagar categoria
// todas categoria
