import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import { db } from "./index";

export const pushNotificationNewOption = functions.firestore
  .document("counsils/{counsilId}/options/{optionId}")
  .onCreate(async (snap, context) => {
    console.log("A new option was created");

    const { counsilId } = context.params;
    // console.log(counsilId, optionId);
    // console.log(snap.data())

    //get all registerd high and medium;

    const [registeredUserHighDB, registeredUserMediumDB] = await Promise.all([
      db
        .collection("counsils")
        .doc(counsilId)
        .collection("members")
        .where("messagingIntensity", "==", "high")
        .get(),
      db
        .collection("counsils")
        .doc(counsilId)
        .collection("members")
        .where("messagingIntensity", "==", "medium")
        .get(),
    ]);

    const tokens:Array<string> = [];

    registeredUserHighDB.forEach((member) => {
 
      tokens.push(member.data().token)
    });
    registeredUserMediumDB.forEach((member) => {
     
      tokens.push(member.data().token)
    });

    console.log(tokens)

    const payload = {
        notification: {
            title: `הצעה חדשה`,
            body: `New option was created`,
            icon: 'https://delib4.web.app/192px.png',
            click_action: `https://delib4.web.app/counsil/${counsilId}`

        }
    }



    return admin.messaging().sendToDevice(tokens, payload);
  });
