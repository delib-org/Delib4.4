import { FC, useState } from "react";
import { useAppSelector } from "../../../model/hooks";
import { OptionProps } from "../model/optionModel";
import AddOption from "./AddOption";
import OptionBar from "./OptionBar";
import OptionBtn from "./OptionBtn";
interface OptionsBarsProps {
  counsilId: string;
  handleShowAddOption:Function;
}

const OptionsBars: FC<OptionsBarsProps> = ({ counsilId,handleShowAddOption }) => {

  const options = useAppSelector((state) =>
    state.options.options.filter((option) => option.counsilId === counsilId)
  );
  // const maxVotes = Math.max(...options.map(o => o.votes));
  const maxVotes:number = options.reduce((prv,cur)=>prv + cur.votes, 0);

  

  return (
    <div className="optionsBar">
      <h3>OptionsBars</h3>
      <p>Total Votes:{maxVotes}</p>
      <div className="fav" onClick={()=>handleShowAddOption(true)}>+</div>
      {options.length===0?<div className="btns"><button onClick={()=>handleShowAddOption(true)}>ADD OPTION</button></div>:null}
      <div className="optionsBar__grid" style={{gridTemplateColumns:`repeat(${options.length},1fr)`}}>
        {options.map((option) => (
          <OptionBar key={`${option.optionId}-bar`} option={option} maxVotes={maxVotes}/>
        ))}

        {options.map((option: OptionProps) => (
          <OptionBtn key={`${option.optionId}-btn`} option={option} />
        ))}
      </div>
    
    </div>
  );
};

export default OptionsBars;
