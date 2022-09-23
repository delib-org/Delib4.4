import { FC, useState } from "react";
import { useAppSelector } from "../../../model/hooks";
import { OptionProps } from "../model/optionModel";
import AddOption from "./AddOption";
interface OptionsBarsProps {
  counsilId:string;
}

const OptionsBars: FC<OptionsBarsProps> = ({counsilId }) => {
  const [showAddOption, setShowAddOption] = useState<boolean>(false);
  const options = useAppSelector(state=>state.options.options.filter(option=>option.counsilId === counsilId))

  function handleAddOption(){
    console.log(showAddOption)
    setShowAddOption(true);
  }

  return (
    <div>
      <h3>OptionsBars</h3>
      <button onClick={handleAddOption}>ADD OPTION</button>
      {options.map((option: OptionProps) => (
        <p>{option.title}</p>
      ))}
      <AddOption counsilId={counsilId} showAddOption={showAddOption} setShowAddOption={setShowAddOption}/>
    </div>
  );
};

export default OptionsBars;
