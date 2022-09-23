import { FC, useState } from "react";
import { OptionProps } from "../model/optionModel";
import AddOption from "./AddOption";
interface OptionsBarsProps {
  options: OptionProps[];
  counsilId:string;
}

const OptionsBars: FC<OptionsBarsProps> = ({counsilId, options }) => {
  const [showAddOption, setShowAddOption] = useState<boolean>(false);

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
