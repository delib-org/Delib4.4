import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../model/hooks";
import { updateCouncil } from "../counsils/counsilsSlice";
import { listenToCouncil } from "./setCouncil";
import { Counsil } from "./councilModel";

let unsubscribeCounsil: Function = () => {};

const CouncilPage = () => {
  const dispatch = useAppDispatch();
  const { councilId } = useParams();
  const council = useAppSelector((state) =>
    state.councils.councils.find((cnsl) => cnsl.councilId === councilId)
  );

  function handleUpdateCouncil(cnsl: Counsil) {
    dispatch(updateCouncil(cnsl));
  }

  useEffect(() => {
    if (councilId)
      unsubscribeCounsil = listenToCouncil(councilId, handleUpdateCouncil);

      return ()=>{
        unsubscribeCounsil();
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [councilId]);

  return <div>Council: {council?.title}</div>;
};

export default CouncilPage;
