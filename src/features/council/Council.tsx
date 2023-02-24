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
import { registerToCouncil } from "./setCouncilsDB";
import { MessagingIntensity } from "../messages/messagingModel";
import Discussion from "../board/view/Discussion";
import CouncilMenu from "./CouncilMenu";
import { Post } from "../board/model/postModel";
import { selectShowAddPost, setPost } from "../board/control/boardSlice";
import { listenToPosts } from "../board/control/postsDB";
import { setRegisterToPushNotifications } from "../messages/messaging";
import Header from "../../view/components/Header";
import AddOpinion from "../board/view/AddOpinion";

let unsubscribePosts = () => {};
let unsubscribeCouncil: Function = () => {};
let unsubscribeOptions: Function = () => {};
let unsubscribeVote: Function = () => {};
let token = sessionStorage.getItem("token") || "";

const CouncilPage = () => {
  const [showAddOption, setShowAddOption] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const user = useAppSelector(selectUser);
  const showAddPost = useAppSelector(selectShowAddPost);
  const dispatch = useAppDispatch();
  const { councilId, section } = useParams();
  const council = useAppSelector((state) =>
    state.councils.councils.find((cnsl) => cnsl.councilId === councilId)
  );

  function addPostAsync(post: Post) {
    dispatch(setPost(post));
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

  useEffect(() => {
    window.onresize = () => {
      setScreenWidth(window.innerWidth);
    };
  }, []);

  useEffect(() => {
    if (councilId && user) {
      registerToCouncil({ user, councilId });
      unsubscribePosts = listenToPosts(councilId, addPostAsync);
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
      <div className="head">
        <Header title={council?.title} back={"main"} />
        <article>{council?.description}</article>
        <CouncilMenu />
      </div>
      <main>
        {councilId ? (
          <div className="council__panels">
            {switchType(section)}
            <div className="council__panels__board">
              <Discussion />
            </div>
          </div>
        ) : null}
      </main>
      {council ? (
        <AddOption
          council={council}
          showAddOption={showAddOption}
          handleShowAddOption={handleShowAddOption}
        />
      ) : null}
      <footer></footer>
      {showAddPost ? <AddOpinion /> : null}
    </div>
  );

  function switchType(section: string | undefined) {
    try {
      if (!councilId) throw new Error("Missing councilId");

      if (screenWidth >1024) {
      
        return (
          <OptionsBars
            councilId={councilId}
            handleShowAddOption={handleShowAddOption}
          />
        );
      }
      else  {
        switch (section) {
          case OptionsView.BARS:
            return (
              <OptionsBars
                councilId={councilId}
                handleShowAddOption={handleShowAddOption}
              />
            );
          case OptionsView.BOARD:
            return <Discussion />;
          default:
            return (
              <OptionsBars
                councilId={councilId}
                handleShowAddOption={handleShowAddOption}
              />
            );
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
};

export default CouncilPage;
