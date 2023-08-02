import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../model/hooks";
import Scrollable from "../../../view/components/scrolable/Scrolable";
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
    <div className="page main">
      <h1>Main</h1>

      <main>
        <div className="wrapper">
          {councils.map((council) => (
            <CouncilCard key={council.councilId} council={council} />
          ))}
        </div>
      </main>

      <div className="bottomNav">
        <Link to="/main/add-council">
          <div className="fav fav--consultation">
          +
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Councils;
