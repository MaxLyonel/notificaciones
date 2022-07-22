const { request, response } = require("express");
const admin = require("firebase-admin");

const notificationOneUser = async (req = request, res = response) => {
  try {
    const { token, title, body, image, data } = req.body;
    const message = {
      token: token,
      notification: {
        title: title,
        body: body,
      },
      data: data,
      android: {
        priority: "high",
        notification: {
          imageUrl: 'https://foo.bar.pizza-monster.png'
        }
      },
      apns: {
        payload: {
          aps: {
            contentAvailable: true,
            sound: 'default',
          },
        },
        headers: {
          // "apns-push-type": "background",
          "apns-priority": "5", // Must be `5` when `contentAvailable` is set to true.
          "apns-topic": "io.flutter.plugins.firebase.messaging", // bundle identifier
        },
      },
    };
    if (image != null) {
      message.notification.image = image;
    }
    admin
      .messaging()
      .send(message)
      .then((response) => {
        res.json({ msg: "Successfully sent message", message: response });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const notificationGroupUsers = async (req = request, res = response) => {
  try {
    const { tokens, title, body, image, data } = req.body;
    const message = {
      tokens: tokens,
      notification: {
        title: title,
        body: body,
      },
      data: data,
      apns: {
        payload: {
          aps: {
            contentAvailable: true,
            sound: 'default',
          },
        },
        headers: {
          // "apns-push-type": "background",
          "apns-priority": "5", // Must be `5` when `contentAvailable` is set to true.
          "apns-topic": "io.flutter.plugins.firebase.messaging", // bundle identifier
        },
      },
    };
    if (image != null) {
      message.notification.image = image;
    }
    admin
      .messaging()
      .sendMulticast(message)
      .then((response) => {
        res.json({ msg: "Successfully sent message", message: response });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
}
const notificationTopic = async (req = request, res = response) => {
  try {
    const { topic, title, body, image, data } = req.body;
    const message = {
      topic: topic,
      notification: {
        title: title,
        body: body,
      },
      data: data,
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
    if (image != null) {
      message.notification.image = image;
    }
    admin
      .messaging()
      .send(message)
      .then((response) => {
        res.json({ msg: "Successfully sent message", message: response });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
module.exports = {
  notificationOneUser,
  notificationGroupUsers,
  notificationTopic,
};
