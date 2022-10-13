import React, { FC } from 'react';
import { OptionProps } from '../model/optionModel';
import OptionBar from './OptionBar';
import OptionBtn from './OptionBtn';
import { OptionsAnim } from './OptionsBars';

interface OptionColumnProps{
    option:OptionProps;
    maxVotes:number;
    optionsAnim:OptionsAnim;
    updateWidth:Function
}

const OptionColumn:FC<OptionColumnProps> = ({option, maxVotes,optionsAnim,updateWidth}) => {
  return (
    <div className='optionsBar__col' style={{left:`${option.left}px`}}>
      
        <OptionBtn option={option} optionsAnim={optionsAnim} updateWidth={updateWidth}/>
        <OptionBar option={option} maxVotes={maxVotes}/>
    </div>
  )
}

export default OptionColumn