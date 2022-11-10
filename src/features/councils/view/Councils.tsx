import  { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../model/hooks";
import { selectCouncils, updateCouncil } from "../control/councilsSlice";
import { listenToCouncils } from "../control/getCouncils";
import CouncilCard from "./CouncilCard";

let unsubscribeFromCouncils: Function = () => {};

const Councils = () => {
  const dispatch = useAppDispatch();
  const councils = useAppSelector(selectCouncils);
  function updateCouncils(council: any) {
    dispatch(updateCouncil(council));
  }

  useEffect(() => {
    unsubscribeFromCouncils = listenToCouncils(updateCouncils);

    return () => {
      unsubscribeFromCouncils();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="wrapper">
        {councils.map((council) => (
          <CouncilCard key={council.councilId} council={council} />
        ))}
        <Link to="/main/add-council">
          <button>ADD Consultation</button>
        </Link>
      </div>
    </div>
  );
};

export default Councils;
