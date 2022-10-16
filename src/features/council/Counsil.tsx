import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../model/hooks";
import { updateCounsil } from "../counsils/control/counsilsSlice";
import { listenToCounsil } from "./getCounsil";
import { Counsil } from "./councilModel";

import OptionsBars from "../options/view/OptionsBars";
import { OptionProps, OptionsView } from "../options/model/optionModel";
import { updateOption, updateUserVote } from "../options/control/optionsSlice";
import {
  listenToOptionsOfCounsil,
  listenToVotedOption,
} from "../options/control/getOptions";
import { selectUser } from "../user/userSlice";
import AddOption from "../options/view/AddOption";
import { setRegisterToPushNotifications } from "./setCounsilsDB";

let unsubscribeCounsil: Function = () => {};
let unsubscribeOptions: Function = () => {};
let unsubscribeVote: Function = () => {};
let token = false;

const CounsilPage = () => {

  const [showAddOption, setShowAddOption] = useState<boolean>(false);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { counsilId } = useParams();
  const counsil = useAppSelector((state) =>
    state.councils.councils.find((cnsl) => cnsl.counsilId === counsilId)
  );


  // const isListentingToVote: boolean =
  //   useAppSelector((state) =>
  //     state.options.optionsVoteListenr.findIndex(
  //       (el: string) => el === counsilId
  //     )
  //   ) !== -1;

  function handleupdateCounsil(cnsl: Counsil) {
    dispatch(updateCounsil(cnsl));
  }
  function handleUpdateOptions(option: OptionProps) {
    dispatch(updateOption(option));
  }
  function handleUpdateOptionVote(votedOptionId: string) {
    try {
      if (!counsilId) throw new Error("Missing counsilId");
      dispatch(updateUserVote({ counsilId, optionId: votedOptionId }));
    } catch (error) {
      console.error(error);
    }
  }
  function handleShowAddOption(showModal: boolean) {
    setShowAddOption(showModal);
  }

  function handleShare(){
    const shareData = {
      title: 'Delib',
      text: 'Share deliberation',
      url: window.location.href
    }
    navigator.share(shareData)
  }

  useEffect(() => {
    if (counsilId && user) {
   
      unsubscribeCounsil = listenToCounsil(counsilId, handleupdateCounsil);
      unsubscribeOptions = listenToOptionsOfCounsil(
        counsilId,
        handleUpdateOptions
      );
      unsubscribeVote = listenToVotedOption(
        counsilId,
        user.uid,
        handleUpdateOptionVote
      );

      if(token === false){
        setRegisterToPushNotifications(counsilId,user.uid)
        token = true;
      }
    }

   

    return () => {
  
      unsubscribeCounsil();
      unsubscribeOptions();
      unsubscribeVote();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counsilId, user]);

  return (
    <div className="page counsil">
      <header>
        <Link to="/main">
          <div className="headerBtn">
            <span className="material-symbols-outlined">arrow_back</span>
          </div>
        </Link>
        <h1>{counsil?.title}</h1>
        <div className="headerBtn--circle" onClick={handleShare}>
          <span className="material-symbols-outlined">share</span>
        </div>
      </header>
      <article>{counsil?.description}</article>
      <main>
        <div className="wrapper">
          {counsilId ? switchType(OptionsView.BARS) : null}
        </div>
      </main>
      {counsilId ? (
        <AddOption
          counsilId={counsilId}
          showAddOption={showAddOption}
          handleShowAddOption={handleShowAddOption}
        />
      ) : null}
      <footer></footer>
    </div>
  );

  function switchType(type: OptionsView) {
    try {
      switch (type) {
        case OptionsView.BARS:
          if (counsilId)
            return (
              <OptionsBars
                counsilId={counsilId}
                handleShowAddOption={handleShowAddOption}
              />
            );
          else return null;
        default:
          return null;
      }
    } catch (error) {
      console.error(error);
    }
  }
};

export default CounsilPage;
