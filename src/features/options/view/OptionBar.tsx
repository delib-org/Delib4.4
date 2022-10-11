import { FC } from "react";
import { OptionProps } from "../model/optionModel";

interface OptionBarProps {
  option: OptionProps;
}

const OptionBar: FC<OptionBarProps> = ({ option }) => {
  return (
    <div
      className="optionsBar__bar"
      style={{ height: `${option.votes * 10}vh` }}>
      {option.votes}
    </div>
  );
};

export default OptionBar;
