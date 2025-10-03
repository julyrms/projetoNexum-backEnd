const express = require("express");
const router = express.Router();
const notificacoesController = require("../controllers/notificacoesController");

router.get("/todasNotificacoes", notificacoesController.todasNotificacoes);
router.get("/notificacoesLidas", notificacoesController.notificacoesLidas);
router.get(
  "/notificacoesNaoLidas",
  notificacoesController.notificacoesNaoLidas
);
router.delete(
  "/apagarNotificacao/:id",
  notificacoesController.deletarNotificacao
);

module.exports = router;

// selecionar todas notificacoes
// selecionar nots lidas
// selecionar nots nao lidas
// apagar
