// import { runTransaction } from "firebase/firestore";
import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import { pushNotificationNewOption } from "./messaging";
// import { get } from "lodash";
// import { on } from "events";
admin.initializeApp();
export const db = admin.firestore();
const FieldValue = require("firebase-admin").firestore.FieldValue;

exports.pushNotificationNewOption = pushNotificationNewOption;

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.countVotingOnOptions = functions.firestore
  .document("/councils/{councilId}/votes/{userId}")
  .onWrite(async (change, context) => {
    try {
      const { councilId } = context.params;
      // console.log("optionId", optionId);
      if (!change.before.exists) {
        // New document Created : add one to count
        console.log("New document Created : add one to count");
        if (!change.after) throw new Error("no after");
        const data: any = change.after.data();
        const { vote } = data;
        if (!vote) throw new Error("Couldnt find vote with optionId");
        const optionId = vote;
        console.log("optionId:::", optionId);
        await db
          .collection("councils")
          .doc(councilId)
          .collection("options")
          .doc(optionId)
          .update({ votes: FieldValue.increment(1) });
      } else if (change.before.exists && change.after.exists) {
        // Updating existing document : Do nothing
        const dataBefore = change.before.data();
        const dataAfter = change.after.data();
        if (!dataAfter || !dataBefore)
          throw new Error("couldnt get data before or data after");
        const optionIdBefore = dataBefore.vote;
        const optionIdAfter = dataAfter.vote;

        await db
          .collection("councils")
          .doc(councilId)
          .collection("options")
          .doc(optionIdBefore)
          .update({ votes: FieldValue.increment(-1) });

        await db
          .collection("councils")
          .doc(councilId)
          .collection("options")
          .doc(optionIdAfter)
          .update({ votes: FieldValue.increment(1) });
      } else if (!change.after.exists) {
        // Deleting document : subtract one from count
        const dataBefore = change.before.data();
        if (!dataBefore) throw new Error("couldnt get data before");
        const optionIdBefore = dataBefore.vote;

        console.log("Deleting document : subtract one from count");
        await db
          .collection("councils")
          .doc(councilId)
          .collection("options")
          .doc(optionIdBefore)
          .update({ votes: FieldValue.increment(-1) });
      }

      return;

      // const votesRef = db.collection('councils').doc(councilId).collection('options').doc(optionId).collection('votes');
      // const count = await getCountFromServer()
    } catch (error) {
      console.error(error);
    }
  });

// exports.updateVoteToOption = functions.firestore
//   .document("/councils/{councilId}/votes/{userUid}")
//   .onUpdate((change, context) => {
//     try {
//       const { councilId } = context.params;
//       console.log(councilId);
//       const beforeOption = change.before.data().vote;
//       const afterOption = change.after.data().vote;
//       console.log("vote before:", beforeOption);
//       console.log("change after:", afterOption);

//       //update last interaction
//       db.doc(`councils/${councilId}`).update({
//         lastAction: new Date().getTime(),
//       });

//       let afterOptionRef: any, beforeOptionRef: any;

//       if (beforeOption !== "") {
//         beforeOptionRef = db
//           .collection("councils")
//           .doc(councilId)
//           .collection("options")
//           .doc(beforeOption);
//       }
//       if (afterOption !== "") {
//         afterOptionRef = db
//           .collection("councils")
//           .doc(councilId)
//           .collection("options")
//           .doc(afterOption);
//       }

//       // if(!change.before.data())throw new Error('No CHANGE was detected');

//       return db.runTransaction(async (transaction) => {
//         if (beforeOption === "") {
//           //if user selected a new option after de-selecting an option

//           const optionSelected:any = await transaction.get(afterOptionRef);
//           const votesBeforeSelected = get(optionSelected.data(), "votes", 0);
//           const newVotes = votesBeforeSelected + 1;
//           transaction.update(afterOptionRef, { votes: newVotes });
//         } else if (afterOption === "") {
//           // if a user de-selected an option

//           const optionLeave:any = await transaction.get(beforeOptionRef);
//           const votesBeforeLeave = get(optionLeave.data(), "votes", 1);
//           const newVotesLeave =
//             votesBeforeLeave <= 0 ? 0 : votesBeforeLeave - 1;
//           transaction.update(beforeOptionRef, { votes: newVotesLeave });
//         } else {
//           // if user moved from one option to another
//           //after
//           const optionSelected:any = await transaction.get(afterOptionRef);
//           const optionLeave:any = await transaction.get(beforeOptionRef);

//           //selected votes
//           const votesBeforeSelected = get(optionSelected.data(), "votes", 0);
//           const newVotes = votesBeforeSelected + 1;
//           transaction.update(afterOptionRef, { votes: newVotes });

//           //votes afler leave
//           const votesBeforeLeave = get(optionLeave.data(), "votes", 1);
//           const newVotesLeave =
//             votesBeforeLeave <= 0 ? 0 : votesBeforeLeave - 1;
//           transaction.update(beforeOptionRef, { votes: newVotesLeave });
//           console.log(
//             "update vote previous:",
//             newVotes,
//             `on option ${beforeOption}`
//           );
//           console.log(
//             "create vote after:",
//             newVotesLeave,
//             `on option ${afterOption}`
//           );
//         }
//       });
//     } catch (error) {
//       console.error(error);
//       return;
//     }
//   });

// exports.addVoteToOption = functions.firestore
//   .document("/councils/{councilId}/votes/{userUid}")
//   .onCreate((snap: any, context: any) => {
//     try {
//       const { councilId } = context.params;
//       console.log("councilId", councilId);

//       const userSelectedOption = snap.data().vote;

//       const userSelectedOptionRef = db
//         .collection("councils")
//         .doc(councilId)
//         .collection("options")
//         .doc(userSelectedOption);

//       //update last interaction so the user can see the latest updates
//       db.doc(`councils/${councilId}`).update({
//         lastAction: new Date().getTime(),
//       });

//       return db.runTransaction(async (transaction) => {
//         //add a vote to the selected vote
//         const votesBeforeSelected = get(userSelectedOptionRef, "votes", 0);
//         const newVotes = votesBeforeSelected + 1;
//         console.log(
//           "create vote:",
//           newVotes,
//           `on option ${userSelectedOption}`
//         );
//         transaction.update(userSelectedOptionRef, { votes: newVotes });
//       });
//     } catch (error) {
//       console.error(error);
//       return;
//     }
//   });

// exports.removeVoteToOption = functions.firestore
//   .document("/councils/{councilId}/votes/{userUid}")
//   .onDelete((snap: any, context: any) => {
//     try {
//       const { councilId } = context.params;
//       console.log("councilId", councilId);

//       const userOption = snap.data().vote;

//       const beforeDeleteOptionRef = db
//         .collection("councils")
//         .doc(councilId)
//         .collection("options")
//         .doc(userOption);

//       //update last interaction so the user can see the latest updates
//       db.doc(`councils/${councilId}`).update({
//         lastAction: new Date().getTime(),
//       });

//       return db.runTransaction(async (transaction) => {
//         //reduce 1 from the option the user removed
//         const votesBeforeSelected = get(beforeDeleteOptionRef, "votes", 1);
//         const newVotes = votesBeforeSelected <= 0 ? 0 : votesBeforeSelected - 1;
//         transaction.update(beforeDeleteOptionRef, { votes: newVotes });

//         console.log("delete vote:", newVotes, `on option ${userOption}`);
//       });
//     } catch (error) {
//       console.error(error);
//       return;
//     }
//   });

// exports.updateLastInteraction = functions.firestore.document();
