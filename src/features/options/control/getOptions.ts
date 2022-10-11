import { collection, doc, onSnapshot } from "firebase/firestore";
import { DB } from "../../../control/firebase/config";
import { Collections } from "../../../control/firebase/dbModel";
import { useAppDispatch, useAppSelector } from "../../../model/hooks";
import {
  updateUserVote,
  updateVotingOptionsListenrs,
} from "./optionsSlice";

export function listenToOptionsOfCounsil(
  councilId: string,
  setState: Function
): Function {
  try {
    const counsilRef = collection(
      DB,
      Collections.COUNSILS,
      councilId,
      Collections.OPTIONS
    );
    return onSnapshot(counsilRef, (optionsDB) => {
      optionsDB.forEach((optionDB) => {
        setState(optionDB.data());
      });
    });
  } catch (error) {
    console.error(error);
    return () => {};
  }
}

export function useListenToVotedOption(
  counsilId: string | undefined,
  userId: string | undefined
) {
  const councilId2:string = counsilId?counsilId:''
  const dispatch = useAppDispatch();
  const isListening = useAppSelector(state=>state.options.optionsVoteListenr.includes(councilId2));
  console.log("useListenToVotedOption");
  try {
    if (userId && counsilId) {
      
      if (!isListening) {
        dispatch(updateVotingOptionsListenrs({ counsilId, on: true }));
        const userVoteRef = doc(
          DB,
          Collections.COUNSILS,
          counsilId,
          Collections.VOTES,
          userId
        );

        return onSnapshot(userVoteRef, (userVoteDB) => {
          if (userVoteDB.exists()) {
            const votedOption = userVoteDB.data().vote
              ? userVoteDB.data().vote
              : "";
            dispatch(updateUserVote({ optionId: votedOption, counsilId }));
          }
        });
       
      } else {
        dispatch(updateVotingOptionsListenrs({ counsilId, on: false }));
      }
    }
  } catch (error) {
    console.error(error);
    return () => {};
  }
}
