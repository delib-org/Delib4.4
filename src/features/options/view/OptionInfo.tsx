import React, { FC } from 'react'
import { OptionProps } from '../model/optionModel'

interface OptionInfoProps{
    option:OptionProps
}

const OptionInfo:FC<OptionInfoProps> = ({option}) => {
  return (
    <div className='optionsBar__info'>i</div>
  )
}

export default OptionInfo