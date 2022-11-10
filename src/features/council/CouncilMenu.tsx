import React from "react";
import { Link, useParams } from "react-router-dom";
import { OptionsView } from "../options/model/optionModel";

const CouncilMenu = () => {
  const { counsilId, section } = useParams();
  console.log("CouncilMenu", section);
  return (
    <div className="councilMenu">
      <Link
        to={`/counsil/${counsilId}`}
        className={
          section === OptionsView.BARS || section === undefined
            ? "councilMenu__btn councilMenu__btn--selected"
            : "councilMenu__btn"
        }>
        VOTES
      </Link>
      <Link
        to={`/counsil/${counsilId}/board`}
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
