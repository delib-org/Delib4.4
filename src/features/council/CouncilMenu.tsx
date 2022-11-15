import React from "react";
import { Link, useParams } from "react-router-dom";
import { OptionsView } from "../options/model/optionModel";

const CouncilMenu = () => {
  const { councilId, section } = useParams();
 
  return (
    <div className="councilMenu">
      <Link
        to={`/council/${councilId}`}
        className={
          section === OptionsView.BARS || section === undefined
            ? "councilMenu__btn councilMenu__btn--selected"
            : "councilMenu__btn"
        }>
        VOTES
      </Link>
      <Link
        to={`/council/${councilId}/board`}
        className={
          section === OptionsView.BOARD
            ? "councilMenu__btn councilMenu__btn--selected"
            : "councilMenu__btn"
        }>
        BOARD
      </Link>
    </div>
  );
};

export default CouncilMenu;
