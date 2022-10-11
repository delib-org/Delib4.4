import { FC } from "react";
import { OptionProps } from "../model/optionModel";

interface OptionBarProps {
  option: OptionProps;
  maxVotes:number;
}

const OptionBar: FC<OptionBarProps> = ({ option,maxVotes}) => {
  return (
    <div
      className="optionsBar__bar"
      style={{ height: `${(option.votes/maxVotes)*100}%` }}>
      {option.votes}
    </div>
  );
};

export default OptionBar;
