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
import {
  registerToCounsil,
  setRegisterToPushNotifications,
} from "./setCounsilsDB";
import { MessagingIntensity } from "../messages/messagingModel";

let unsubscribeCounsil: Function = () => {};
let unsubscribeOptions: Function = () => {};
let unsubscribeVote: Function = () => {};
let token = sessionStorage.getItem("token") || "";

const CounsilPage = () => {
  const [showAddOption, setShowAddOption] = useState<boolean>(false);
  const [showShareMessage, setShareMessage] = useState<boolean>(false);
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

  function handleShare() {
    try {
      const shareData = {
        title: "Delib",
        text: `Please join: "${counsil?.title}"`,
        url: window.location.href,
      };
      if (navigator.share) {
        navigator.share(shareData);
      } else {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
          setShareMessage(true);
          // alert(
          //   "Question address was copied to clipboard. share this link through any social media you want"
          // );
        } else {
          alert("Copy page address and share it")
        }
      }
    } catch (error) {
      console.error(error);
    }
    
  }

  useEffect(() => {
    if (counsilId && user) {
      registerToCounsil({ user, counsilId });
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

      if (token.length > 0) {
        setRegisterToPushNotifications(
          counsilId,
          user.uid,
          MessagingIntensity.HIGH,
          token
        );
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
        {showShareMessage?<div className="shareMessage" onClick={()=>setShareMessage(false)}>
          <p>The URL of the page was copied to the clipoard.</p>
          <p> To share this link, plaese send the link to your friends</p>
          <p><span className="material-symbols-outlined">close</span></p>
        </div>:null}
      </header>
      <article>{counsil?.description}</article>
      <main>
        <div className="wrapper">
          {counsilId ? switchType(OptionsView.BARS) : null}
        </div>
      </main>
      {counsil ? (
        <AddOption
          counsil={counsil}
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
