import React, { FC } from 'react';
import { OptionProps } from '../model/optionModel';
import OptionBar from './OptionBar';
import OptionBtn from './OptionBtn';
import { OptionsAnim } from './OptionsBars';

interface OptionColumnProps{
    option:OptionProps;
    maxVotes:number;
    optionsAnim:OptionsAnim;
    width:number;
    updateWidth:Function
}

const OptionColumn:FC<OptionColumnProps> = ({option, maxVotes,optionsAnim,updateWidth, width}) => {
  const offset = option.relativePlace?option.relativePlace*width:0;
  return (
    <div className='optionsBar__col' style={{left:`${offset}px`, width:width}}>
        <OptionBtn option={option} optionsAnim={optionsAnim} updateWidth={updateWidth}/>
        <OptionBar option={option} maxVotes={maxVotes}/>
    </div>
  )
}

export default OptionColumn