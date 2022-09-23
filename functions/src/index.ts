import { runTransaction } from "firebase/firestore";
import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import { get } from "lodash";
admin.initializeApp();
const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.makeUppercase = functions.firestore
  .document("/messages/{documentId}")
  .onCreate((snap, context) => {
    const original = snap.data().original;
    console.log("Uppercasing", context.params.documentId, original);
    const uppercase = original.toUpperCase();
    return snap.ref.set({ uppercase }, { merge: true });
  });

exports.updateVoteToOption = functions.firestore
  .document("/counsils/{counsilId}/votes/{userUid}")
  .onWrite((change, context) => {
    try {
      const { counsilId } = context.params;
      console.log("counsilId", counsilId);
      // if(!change.before.data())throw new Error('No CHANGE was detected');

      const beforeOption = change.before.data().vote;
      const afterOption = change.after.data().vote;
      console.log("vote before:", beforeOption);
      console.log("change after:", afterOption);

      const afterOptionRef = db
        .collection("counsils")
        .doc(counsilId)
        .collection("options")
        .doc(afterOption);

      const beforeOptionRef = db
        .collection("counsils")
        .doc(counsilId)
        .collection("options")
        .doc(beforeOption);

      return db.runTransaction(async (transaction) => {
        //after
        const optionSelected = await transaction.get(afterOptionRef);
        const optionLeave = await transaction.get(beforeOptionRef);

        //selected votes
        const votesBeforeSelected = get(optionSelected.data(), "votes", 0);
        const newVotes = votesBeforeSelected + 1;
        transaction.update(afterOptionRef, { votes: newVotes });

        //votes afler leave
        const votesBeforeLeave = get(optionLeave.data(), "votes", 1);
        const newVotesLeave = votesBeforeLeave - 1;
        transaction.update(beforeOptionRef, { votes: newVotesLeave });
      });
    } catch (error) {
      console.error(error);
    }
  });
