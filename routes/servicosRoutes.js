const express = require("express");
const router = express.Router();
const servicosController = require("../controllers/servicosController");

router.get("/todosServicos", servicosController.procurarServicos);
router.get(
  "/servicoPorCategoria/:id",
  servicosController.procurarServicoPorIdCategoria
);
router.post("/postarServico", servicosController.postarServico);
router.put("/atualizarServico/:id", servicosController.atualizarServico);
router.delete("/apagarServico/:id", servicosController.apagarServico);
router.get("/pesquisarPorCidade", servicosController.pesquisarServicoCidade);

module.exports = router;

// procurar todos servicos
// procurar servicos por id categoria
// postar servico
// atualizar servico
// apagar servico
