const { Router } = require("express");

const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const { 
  notificationOneUser,
  notificationTopic } = require("../controllers/notification.controller");
const router = Router();

router.post(
  "/oneuser",
  [
    check("token", "El token es necesario").not().isEmpty(),
    check("title", "El title es necesario").not().isEmpty(),
    check("body", "El body es necesario").not().isEmpty(),
    check("image", "El image es necesario").optional().not().isEmpty(),
    check("data", "El data es necesario").not().isEmpty(),
    validarCampos,
  ],
  notificationOneUser
);
router.post(
  "/topic",
  [
    check("topic", "El topic es necesario").not().isEmpty(),
    check("title", "El title es necesario").not().isEmpty(),
    check("body", "El body es necesario").not().isEmpty(),
    check("image", "El image es necesario").optional().not().isEmpty(),
    check("data", "El data es necesario").not().isEmpty(),
    validarCampos,
  ],
  notificationTopic
);

module.exports = router;
