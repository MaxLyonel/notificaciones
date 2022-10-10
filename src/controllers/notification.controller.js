const { request, response } = require("express");
const admin = require("firebase-admin");

const notificationTest = async (req = request, res = response) => {
  try {
    const { tokenDevice, title, body, image, collapse_key, data } = req.body;
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
    data.date = date + ' ' + time;
    const token = tokenDevice;
    console.log('Sending notification...');

    const payload = {
      notification: {
        title: title,
        body: body
      },
      data: data
    };

    const options = {
      collapseKey: collapse_key
    };
    if (image != null) {
      payload.notification.image = image;
    }
    admin
      .messaging()
      .sendToDevice(token, payload, options)
      .then((response) => {
        res.json({ msg: "Successfully sent message", message: response });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json(error);
      })
      ;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const notificationOneUser = async (req = request, res = response) => {
  try {
    const { token, title, body, image, collapse_key, data } = req.body;
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
    data.date = date + ' ' + time;
    const message = {
      token: token,
      notification: {
        title: collapse_key,
        body: body,
      },
      data: data,
      android: {
        collapseKey: collapse_key,
        priority: "high"
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
        res.json({ msg: "Successfully sent message", message: response, mm: message });
      })
      .catch((error) => {
        res.status(400).json(error);
      })
      ;
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
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
    data.date = date + ' ' + time;
    const message = {
      tokens: tokens,
      notification: {
        title: title,
        body: body,
      },
      data: data,
      android: {
        // collapseKey: collapse_key,
        priority: "high",
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
    console.log(tokens)
    admin
      .messaging()
      .sendMulticast(message)
      .then((response) => {
        console.log('HOLA ESTOY ENVIANDO UNA NOTIFICACION')
        console.log(response);
        res.json({ msg: "Successfully sent message", message: response });
      })
      .catch((error)=> {
        console.log(error);
        res.status(400).json({ msg: "error", message: error });
      })
      ;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador", message: error
    });
  }
}
const notificationTopic = async (req = request, res = response) => {
  try {
    const { topic, title, body, image, data } = req.body;
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
    data.date = date + ' ' + time;
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
      })
      .catch((err) =>
        res.status(400).json(err))
      ;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  notificationTest,
  notificationOneUser,
  notificationGroupUsers,
  notificationTopic
};
