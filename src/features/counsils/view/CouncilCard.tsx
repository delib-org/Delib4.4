import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Counsil } from '../../council/councilModel'

interface CouncilCardProps{
    counsil:Counsil
}

const CouncilCard:FC<CouncilCardProps> = ({counsil}) => {
  return (
    <Link to={`/counsil/${counsil.counsilId}`}><div className='card counsilCard'>
        <h3>{counsil.title}</h3>
        <p>{counsil.description}</p>
    </div>
    </Link>
  )
}

export default CouncilCard