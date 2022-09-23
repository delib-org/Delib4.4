import React, { FC } from "react";
import { useAppSelector } from "../../../model/hooks";
import { setVote } from "../../selections/votes/setVote";
import { selectUser } from "../../user/userSlice";
import { OptionProps } from "../model/optionModel";

interface OptionBtnProps {
  option: OptionProps;
}

const OptionBtn: FC<OptionBtnProps> = ({ option }) => {
  const user = useAppSelector(selectUser);
  
  function handleVote() {
    try {
      if (!user) throw new Error("voting user is missing on vote");
      setVote(option.counsilId, option.optionId, user);
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <div className="optionsBar__btns__btn" onClick={handleVote}>
      {option.title}
    </div>
  );
};

export default OptionBtn;
