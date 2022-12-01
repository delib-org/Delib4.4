import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import { db } from "./index";

export const pushNotificationNewOption = functions.firestore
  .document("councils/{councilId}/options/{optionId}")
  .onCreate(async (snap, context) => {
    console.log("A new option was created");

    const { councilId } = context.params;
    // console.log(councilId, optionId);
    // console.log(snap.data())
    const { councilTitle, title } = snap.data();

    //get all registerd high and medium;

    const [registeredUserHighDB, registeredUserMediumDB] = await Promise.all([
      db
        .collection("councils")
        .doc(councilId)
        .collection("members")
        .where("messagingIntensity", "==", "high")
        .get(),
      db
        .collection("councils")
        .doc(councilId)
        .collection("members")
        .where("messagingIntensity", "==", "medium")
        .get(),
    ]);

    const tokens: Array<string> = [];

    registeredUserHighDB.forEach((member) => {
      tokens.push(member.data().token);
    });
    registeredUserMediumDB.forEach((member) => {
      tokens.push(member.data().token);
    });

    const notificationTitle: string = councilTitle
      ? `On "${councilTitle}"`
      : "New Suggestion";

    const payload = {
      notification: {
        title: notificationTitle,
        body: `New suggestion: ${title}`,
        icon: "https://delib4.web.app/192px.png",
        click_action: `https://delib4.web.app/council/${councilId}`,
      },
    };

    return admin.messaging().sendToDevice(tokens, payload);
  });

