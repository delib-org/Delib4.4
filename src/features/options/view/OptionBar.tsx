import { FC } from "react";
import { getColor } from "../../../control/helpers";
import { OptionProps } from "../model/optionModel";

interface OptionBarProps {
  option: OptionProps;
  maxVotes:number;
}

const OptionBar: FC<OptionBarProps> = ({ option,maxVotes}) => {
  return (
    <div
      className="optionsBar__bar"
      style={{ height: `${(option.votes/maxVotes)*100}%`,background:option.color || getColor() }}>
      {option.votes}
    </div>
  );
};

export default OptionBar;
