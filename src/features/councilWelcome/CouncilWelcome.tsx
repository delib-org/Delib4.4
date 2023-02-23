import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../model/hooks";
import { Council } from "../council/councilModel";
import { listenToCouncil } from "../council/getCouncil";
import {
  selectCouncils,
  updateCouncil,
} from "../councils/control/councilsSlice";

const CouncilWelcome = () => {
  let unsubListenToCouncil: Function = () => {};
  const dispatch = useAppDispatch();
  const { councilId } = useParams();
  //    const [council,setCouncil]=useState(null);
  const council = useAppSelector(selectCouncils).find(
    (council) => council.councilId === councilId
  );
  const [result, setResult] = useState<null | string | undefined>(null);

  useEffect(() => {
    if (councilId) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      unsubListenToCouncil = listenToCouncil(councilId, handleupdateCouncil);
    }

    return () => {
      unsubListenToCouncil();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [councilId]);

  function handleupdateCouncil(cnsl: Council) {
    dispatch(updateCouncil(cnsl));
  }
  function handleGetPosition(position: "a" | "b" | "m") {
    try {
      switch (position) {
        case "a":
          setResult(council?.positionA?.result);
          break;
        case "b":
          setResult(council?.positionB?.result);
          break;
        case "m":
          setResult(council?.positionMiddle?.result);
          break;
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      CouncilWelcome
      {council ? (
        <div className="councilQuestion">
          <h3>{council.title}</h3>
          {council.positionA && council.positionB && council.positionMiddle ? (
            <>
              <div className="getPosition">
                <h2>מה העמדה שלך בנושא {council.title}?</h2>
                <div className="getPosition__positions">
                  <span
                    onClick={() => handleGetPosition("a")}
                    className="getPosition__position getPosition__position--a">
                    {council.positionA.text}
                  </span>
                  <span
                    onClick={() => handleGetPosition("m")}
                    className="getPosition__position getPosition__position--m">
                    {council.positionMiddle.text}
                  </span>
                  <span
                    onClick={() => handleGetPosition("b")}
                    className="getPosition__position getPosition__position--b">
                    {council.positionB.text}
                  </span>
                </div>
              </div>
              <h3>{result}</h3>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default CouncilWelcome;
