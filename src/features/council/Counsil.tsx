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
import Description from "../../view/components/Description";
import AddOption from "../options/view/AddOption";

let unsubscribeCounsil: Function = () => {};
let unsubscribeOptions: Function = () => {};
let unsubscribeVote: Function = () => {};

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
  function handleShowAddOption(showModal:boolean) {
    setShowAddOption(showModal);
  }

  useEffect(() => {
    if (counsilId && user) {
      console.log("++subscribeCounsil");
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
    }
    return () => {
      console.log("unsubscribeCounsil");
      unsubscribeCounsil();
      unsubscribeOptions();
      unsubscribeVote();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counsilId, user]);

  return (
    <div className="page counsil">
      <header>
        <Link to="/main">Back</Link>
        <h1>Counsil: {counsil?.title}</h1>
        {counsil?<Description description={counsil.description} />:null}
       
      </header>
      <main>
        <div className="wrapper">
          {counsilId ? switchType(OptionsView.BARS) : null}
        </div>
      </main>
      {counsilId?<AddOption counsilId={counsilId} showAddOption={showAddOption} handleShowAddOption={handleShowAddOption}/>:null}
      <footer></footer>
    </div>
  );

  function switchType(type: OptionsView) {
    try {
      switch (type) {
        case OptionsView.BARS:
          if (counsilId) return <OptionsBars counsilId={counsilId} handleShowAddOption={handleShowAddOption} />;
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
