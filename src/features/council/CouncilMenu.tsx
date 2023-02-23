import React from "react";
import { Link, useParams } from "react-router-dom";
import { OptionsView } from "../options/model/optionModel";
import ChatIcon from "@mui/icons-material/Chat";
import BarChartIcon from "@mui/icons-material/BarChart";

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
        <div className="councilMenu__text">
          <div className="councilMenu__text__text">VOTES</div>
          <div className="councilMenu__text__icon">
            <BarChartIcon />
          </div>
        </div>
      </Link>
      <Link
        to={`/council/${councilId}/board`}
        className={
          section === OptionsView.BOARD
            ? "councilMenu__btn councilMenu__btn--selected"
            : "councilMenu__btn"
        }>
        <div className="councilMenu__text">
          <div className="councilMenu__text__text">DISCUSSION</div>
          <div className="councilMenu__text__icon">
            <ChatIcon />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CouncilMenu;
