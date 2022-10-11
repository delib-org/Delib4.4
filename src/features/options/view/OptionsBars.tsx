import { FC, useState } from "react";
import { useAppSelector } from "../../../model/hooks";
import { OptionProps } from "../model/optionModel";
import AddOption from "./AddOption";
import OptionBar from "./OptionBar";
import OptionBtn from "./OptionBtn";
interface OptionsBarsProps {
  counsilId: string;
}

const OptionsBars: FC<OptionsBarsProps> = ({ counsilId }) => {
  const [showAddOption, setShowAddOption] = useState<boolean>(false);
  const options = useAppSelector((state) =>
    state.options.options.filter((option) => option.counsilId === counsilId)
  );

  function handleAddOption() {
    console.log(showAddOption);
    setShowAddOption(true);
  }

  return (
    <div className="optionsBar">
      <h3>OptionsBars</h3>
      <button onClick={handleAddOption}>ADD OPTION</button>
      <div className="optionsBar__grid" style={{gridTemplateColumns:`repeat(${options.length},1fr)`}}>
        {options.map((option) => (
          <OptionBar key={`${option.optionId}-bar`} option={option} />
        ))}

        {options.map((option: OptionProps) => (
          <OptionBtn key={`${option.optionId}-btn`} option={option} />
        ))}
      </div>
      <AddOption
        counsilId={counsilId}
        showAddOption={showAddOption}
        setShowAddOption={setShowAddOption}
      />
    </div>
  );
};

export default OptionsBars;
