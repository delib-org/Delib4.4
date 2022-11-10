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
import Board from "../board/Board";
import CouncilMenu from "./CouncilMenu";

let unsubscribeCounsil: Function = () => {};
let unsubscribeOptions: Function = () => {};
let unsubscribeVote: Function = () => {};
let token = sessionStorage.getItem("token") || "";

const CounsilPage = () => {
  const [showAddOption, setShowAddOption] = useState<boolean>(false);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { counsilId, section } = useParams();
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
    const shareData = {
      title: "Delib",
      text: `Please join me on voting on the question "${counsil?.title}"`,
      url: window.location.href,
    };
    navigator.share(shareData);
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
      </header>
      <article>{counsil?.description}</article>
      <main>
        <div className="wrapper">
          <CouncilMenu />
          {counsilId ? switchType(section) : null}
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

  function switchType(section: string|undefined) {
    console.log('section:',section);
    try {
      if (counsilId) {
        switch (section) {
          case OptionsView.BARS:
            return (
              <OptionsBars
                counsilId={counsilId}
                handleShowAddOption={handleShowAddOption}
              />
            );
          case OptionsView.BOARD:
            return <Board />;
          default:
            return (
              <OptionsBars
                counsilId={counsilId}
                handleShowAddOption={handleShowAddOption}
              />
            );
        }
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  }
};

export default CounsilPage;
