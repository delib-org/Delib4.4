import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../model/hooks";
import { setVote } from "../../selections/votes/setVote";
import { selectUser } from "../../user/userSlice";
import { updateUserVote } from "../control/optionsSlice";
import { OptionProps } from "../model/optionModel";

interface OptionBtnProps {
  option: OptionProps;
}

const OptionBtn: FC<OptionBtnProps> = ({ option }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  
  function handleVote() {
    try {
      if (!user) throw new Error("voting user is missing on vote");
      setVote(option.counsilId, option.optionId, user);
      // dispatch(updateUserVote({optionId:option.optionId}))
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <div className={option.userVotedOption?"optionsBar__btns__btn optionsBar__btns__btn--select":"optionsBar__btns__btn"} onClick={handleVote}>
      {option.title}
    </div>
  );
};

export default OptionBtn;
