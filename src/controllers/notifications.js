const admin = require("firebase-admin");

function sendPushToOneUser(noti) {
  const message = {
    token: noti.tokenId,
    notification: {
      title: noti.title,
      body: noti.body,
      image: noti.image,
    },
    data: {
      content_available: "true",
      score: "850",
      time: "2:45",
      priority: "high",
    },
    apns: {
        payload: {
          aps: {
            contentAvailable: true,
          },
        },
        headers: {
          "apns-push-type": "background",
          "apns-priority": "5", // Must be `5` when `contentAvailable` is set to true.
          "apns-topic": "io.flutter.plugins.firebase.messaging", // bundle identifier
        },
      },
  };
  sendMessage(message);
}

function sendPushToTopic(noti) {
  const message = {
    topic: noti.topic,
    notification: {
      title: noti.title,
      body: noti.body,
      image: noti.image,
    },
    data: {
      click_action: "FLUTTER_NOTIFICATION_CLICK",
      id: "1",
      status: "done",
      razon: "noti.razon",
      titulo: "noti.titulo",
      mensaje: "noti.mensaje",
      imagen_video: "noti.imagen_video",
      tipo_imagen_video: "noti.tipo_imagen_video",
      nombreBoton: "noti.nombreBoton",
      accionBoton: "noti.accionBoton",
    },
  };
  sendMessage(message);
}


module.exports = {
  sendPushToOneUser,
  sendPushToTopic,
};

function sendMessage(message) {
  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
}
