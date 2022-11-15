import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../model/hooks";
import { updateCouncil } from "../councils/control/councilsSlice";
import { listenToCouncil } from "./getCouncil";
import { Council } from "./councilModel";

import OptionsBars from "../options/view/OptionsBars";
import { OptionProps, OptionsView } from "../options/model/optionModel";
import { updateOption, updateUserVote } from "../options/control/optionsSlice";
import {
  listenToOptionsOfCouncil,
  listenToVotedOption,
} from "../options/control/getOptions";
import { selectUser } from "../user/userSlice";
import AddOption from "../options/view/AddOption";
import {
  registerToCouncil,
  setRegisterToPushNotifications,
} from "./setCouncilsDB";
import { MessagingIntensity } from "../messages/messagingModel";
import Board from "../board/view/Board";
import CouncilMenu from "./CouncilMenu";
import { Post } from "../board/model/postModel";
import { setPost } from "../board/control/boardSlice";
import { listenToPosts } from "../board/control/postsDB";

let unsubscribePosts = ()=>{};
let unsubscribeCouncil: Function = () => {};
let unsubscribeOptions: Function = () => {};
let unsubscribeVote: Function = () => {};
let token = sessionStorage.getItem("token") || "";

const CouncilPage = () => {
  const [showAddOption, setShowAddOption] = useState<boolean>(false);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { councilId, section } = useParams();
  const council = useAppSelector((state) =>
    state.councils.councils.find((cnsl) => cnsl.councilId === councilId)
  );

  // const isListentingToVote: boolean =
  //   useAppSelector((state) =>
  //     state.options.optionsVoteListenr.findIndex(
  //       (el: string) => el === councilId
  //     )
  //   ) !== -1;
  function addPostAsync(post:Post){
    dispatch(setPost(post))
      }
  function handleupdateCouncil(cnsl: Council) {
    dispatch(updateCouncil(cnsl));
  }
  function handleUpdateOptions(option: OptionProps) {
    dispatch(updateOption(option));
  }
  function handleUpdateOptionVote(votedOptionId: string) {
    try {
      if (!councilId) throw new Error("Missing councilId");
      dispatch(updateUserVote({ councilId, optionId: votedOptionId }));
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
      text: `Please join me on voting on the question "${council?.title}"`,
      url: window.location.href,
    };
    navigator.share(shareData);
  }

  useEffect(() => {
    if (councilId && user) {
      registerToCouncil({ user, councilId });
      unsubscribePosts = listenToPosts(councilId,addPostAsync)
      unsubscribeCouncil = listenToCouncil(councilId, handleupdateCouncil);
      unsubscribeOptions = listenToOptionsOfCouncil(
        councilId,
        handleUpdateOptions
      );
      unsubscribeVote = listenToVotedOption(
        councilId,
        user.uid,
        handleUpdateOptionVote
      );

      if (token.length > 0) {
        setRegisterToPushNotifications(
          councilId,
          user.uid,
          MessagingIntensity.HIGH,
          token
        );
      }
    }

    return () => {
      unsubscribePosts();
      unsubscribeCouncil();
      unsubscribeOptions();
      unsubscribeVote();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [councilId, user]);

  return (
    <div className="page council">
      <header>
        <Link to="/main">
          <div className="headerBtn">
            <span className="material-symbols-outlined">arrow_back</span>
          </div>
        </Link>
        <h1>{council?.title}</h1>
        <div className="headerBtn--circle" onClick={handleShare}>
          <span className="material-symbols-outlined">share</span>
        </div>
      </header>
      <article>{council?.description}</article>
      <main>
        <div className="wrapper">
          <CouncilMenu />
          {councilId ? switchType(section) : null}
        </div>
      </main>
      {council ? (
        <AddOption
          council={council}
          showAddOption={showAddOption}
          handleShowAddOption={handleShowAddOption}
        />
      ) : null}
      <footer></footer>
    </div>
  );

  function switchType(section: string | undefined) {
   
    try {
      if (councilId) {
        switch (section) {
          case OptionsView.BARS:
            return (
              <OptionsBars
                councilId={councilId}
                handleShowAddOption={handleShowAddOption}
              />
            );
          case OptionsView.BOARD:
            return <Board />;
          default:
            return (
              <OptionsBars
                councilId={councilId}
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

export default CouncilPage;
