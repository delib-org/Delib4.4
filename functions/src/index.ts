import { runTransaction } from "firebase/firestore";
import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import { get } from "lodash";
import { on } from "events";
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
  .onUpdate((change, context) => {
    try {
      const { counsilId } = context.params;

      const beforeOption = change.before.data().vote;
      const afterOption = change.after.data().vote;

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
      // if(!change.before.data())throw new Error('No CHANGE was detected');

      console.log("vote before:", beforeOption);
      console.log("change after:", afterOption);
      //update last interaction
      db.doc(`counsils/${counsilId}`).update({
        lastAction: new Date().getTime(),
      });

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
        const newVotesLeave = votesBeforeLeave <= 0 ? 0 : votesBeforeLeave - 1;
        transaction.update(beforeOptionRef, { votes: newVotesLeave });
        console.log(
          "update vote previous:",
          newVotes,
          `on option ${beforeOption}`
        );
        console.log(
          "create vote after:",
          newVotesLeave,
          `on option ${afterOption}`
        );
      });
    } catch (error) {
      console.error(error);
    }
  });

exports.addVoteToOption = functions.firestore
  .document("/counsils/{counsilId}/votes/{userUid}")
  .onCreate((snap: any, context: any) => {
    try {
      const { counsilId } = context.params;
      console.log("counsilId", counsilId);

      const userSelectedOption = snap.data().vote;

      const userSelectedOptionRef = db
        .collection("counsils")
        .doc(counsilId)
        .collection("options")
        .doc(userSelectedOption);

      //update last interaction so the user can see the latest updates
      db.doc(`counsils/${counsilId}`).update({
        lastAction: new Date().getTime(),
      });

      return db.runTransaction(async (transaction) => {
        //add a vote to the selected vote
        const votesBeforeSelected = get(userSelectedOptionRef, "votes", 0);
        const newVotes = votesBeforeSelected + 1;
        console.log(
          "create vote:",
          newVotes,
          `on option ${userSelectedOption}`
        );
        transaction.update(userSelectedOptionRef, { votes: newVotes });
      });
    } catch (error) {
      console.error(error);
      return;
    }
  });

exports.removeVoteToOption = functions.firestore
  .document("/counsils/{counsilId}/votes/{userUid}")
  .onDelete((snap: any, context: any) => {
    try {
      const { counsilId } = context.params;
      console.log("counsilId", counsilId);

      const userOption = snap.data().vote;

      const beforeDeleteOptionRef = db
        .collection("counsils")
        .doc(counsilId)
        .collection("options")
        .doc(userOption);

      //update last interaction so the user can see the latest updates
      db.doc(`counsils/${counsilId}`).update({
        lastAction: new Date().getTime(),
      });

      return db.runTransaction(async (transaction) => {
        //reduce 1 from the option the user removed
        const votesBeforeSelected = get(beforeDeleteOptionRef, "votes", 1);
        const newVotes = votesBeforeSelected <= 0 ? 0 : votesBeforeSelected - 1;
        transaction.update(beforeDeleteOptionRef, { votes: newVotes });

        console.log("delete vote:", newVotes, `on option ${userOption}`);
      });
    } catch (error) {
      console.error(error);
      return;
    }
  });

exports.updateLastInteraction = functions.firestore.document();
