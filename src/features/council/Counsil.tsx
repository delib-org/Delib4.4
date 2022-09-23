import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../model/hooks";
import { updateCounsil } from "../counsils/counsilsSlice";
import { listenToCounsil } from "../options/control/getCounsil";
import { Counsil } from "./councilModel";

import OptionsBars from "../options/view/OptionsBars";
import { OptionsView } from "../options/model/optionModel";

let unsubscribeCounsil: Function = () => {};

const CouncilPage = () => {
  const dispatch = useAppDispatch();
  const { counsilId } = useParams();
  const counsil = useAppSelector((state) =>
    state.councils.councils.find((cnsl) => cnsl.counsilId === counsilId)
  );

  function handleupdateCounsil(cnsl: Counsil) {
    dispatch(updateCounsil(cnsl));
  }

  useEffect(() => {
    console.log("counsilId", counsilId);
    if (counsilId) {
      console.log("listenToCounsil");
      unsubscribeCounsil = listenToCounsil(counsilId, handleupdateCounsil);
    }
    return () => {
      unsubscribeCounsil();
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
            return <OptionsBars options={[]} counsilId={counsilId} />;
          else return null;
        default:
          return null;
      }
    } catch (error) {}
  }
};

export default CouncilPage;
