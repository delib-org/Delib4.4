import React, { FC } from "react";
import { Link } from "react-router-dom";
import { getColor } from "../../../control/helpers";
import { Council } from "../../council/councilModel";

interface CouncilCardProps {
  council: Council;
}

const CouncilCard: FC<CouncilCardProps> = ({ council }) => {
  return (
    <Link to={`/council/${council.councilId}`}>
      <div
        className="card councilCard"
        style={{ background: council.color || getColor() }}>
        <h3>{council.title}</h3>
        <p>{council.description}</p>
      </div>
    </Link>
  );
};

export default CouncilCard;
