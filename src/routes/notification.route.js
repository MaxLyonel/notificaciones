const { Router } = require("express");

const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const { notification } = require("../controllers/notification.controller");
const router = Router();

router.get(
  "/",
  [
    check("tokenId", "La contrasena debe de ser más de 6 letras").isLength({
      min: 5,
    }),
    check("title", "El correo no es válido").isLength({
      min: 1,
    }),
    validarCampos,
  ],
  notification
);

module.exports = router;
