import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../model/hooks";
import { updateCounsil } from "../counsils/control/counsilsSlice";
import { listenToCounsil } from "./getCounsil";
import { Counsil } from "./councilModel";

import OptionsBars from "../options/view/OptionsBars";
import { OptionProps, OptionsView } from "../options/model/optionModel";
import { updateOption } from "../options/control/optionsSlice";
import { listenToOptionsOfCounsil, useListenToVotedOption } from "../options/control/getOptions";
import { selectUser } from "../user/userSlice";

let unsubscribeCounsil: Function = () => {};
let unsubscribeOptions:Function = ()=>{};


const CounsilPage = () => {
 const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { counsilId } = useParams();
  const counsil = useAppSelector((state) =>
    state.councils.councils.find((cnsl) => cnsl.counsilId === counsilId)
  );
  

  function handleupdateCounsil(cnsl: Counsil) {
    dispatch(updateCounsil(cnsl));
  }
  function handleUpdateOptions(option:OptionProps){
    dispatch(updateOption(option))
  }

  // useListenToVotedOption(counsilId, user?.uid)

  useEffect(() => {
   
    if (counsilId && user) {
    
      unsubscribeCounsil = listenToCounsil(counsilId, handleupdateCounsil);
      unsubscribeOptions = listenToOptionsOfCounsil(counsilId, handleUpdateOptions)
    }
    return () => {
      unsubscribeCounsil();
      unsubscribeOptions();
   
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counsilId]);

  return (
    <div>
      <h1>Counsil: {counsil?.title}</h1>
      <h3>Description: {counsil?.description}</h3>
      <div className="wrapper">
        {counsilId ? switchType(OptionsView.BARS) : null}
      </div>
    </div>
  );

  function switchType(type: OptionsView) {
    try {
      switch (type) {
        case OptionsView.BARS:
          if (counsilId)
            return <OptionsBars counsilId={counsilId} />;
          else return null;
        default:
          return null;
      }
    } catch (error) {}
  }
};

export default CounsilPage;
