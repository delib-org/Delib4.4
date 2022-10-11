import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../model/hooks";
import { selectCouncils, updateCounsil } from "../control/counsilsSlice";
import { listenToCounsils } from "../control/getCounsils";
import CounsilCard from "./CouncilCard";

let unsubscribeFromCounsils: Function = () => {};

const Counsils = () => {
  const dispatch = useAppDispatch();
  const counsils = useAppSelector(selectCouncils);
  function updateCounsils(counsil: any) {
    dispatch(updateCounsil(counsil));
  }

  useEffect(() => {
    unsubscribeFromCounsils = listenToCounsils(updateCounsils);

    return () => {
      unsubscribeFromCounsils();
    };
  }, []);

  return (
    <div>
      <div className="wrapper">
        {counsils.map((counsil) => (
          <CounsilCard key={counsil.counsilId} counsil={counsil} />
        ))}
        <Link to="/main/add-counsil">
          <button>ADD Consultation</button>
        </Link>
      </div>
    </div>
  );
};

export default Counsils;
