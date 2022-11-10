import React from "react";
import { Link, useParams } from "react-router-dom";

const CouncilMenu = () => {
  const { counsilId, section } = useParams();
  return (
    <div className="councilMenu">
      <Link to={`/counsil/${counsilId}`}><div className="councilMenu__btn">VOTES</div></Link>
      <Link to={`/counsil/${counsilId}/board`}><div className="councilMenu__btn">BOARD</div></Link>
    </div>
  );
};

export default CouncilMenu;
