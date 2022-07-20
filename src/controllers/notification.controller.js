const { request, response } = require("express");
const Notification = require("./notifications.js");

const notification = async (req = request, res = response) => {
  try {
    const { tokenId, title, body } = req.body;
    const data = {
      tokenId,
      title,
      body,
    };
    Notification.sendPushToOneUser(data);
    res.json({msg:"hola"})
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
module.exports = {
    notification
};
