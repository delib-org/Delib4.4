import React, { FC, useRef, useEffect} from "react";
import { getColor } from "../../../control/helpers";
import { useAppDispatch, useAppSelector } from "../../../model/hooks";
import { setVote } from "../../selections/votes/setVote";
import { selectUser } from "../../user/userSlice";
import { orderSelector, reorderCouncilOptions } from "../control/optionsSlice";
import { OptionProps, Order } from "../model/optionModel";
import { OptionsAnim } from "./OptionsBars";

interface OptionBtnProps {
  option: OptionProps;
  optionsAnim:OptionsAnim;
  updateWidth:Function;
 
}

const OptionBtn: FC<OptionBtnProps> = ({ option,optionsAnim, updateWidth}) => {

  const user = useAppSelector(selectUser);
  const ref = useRef<any>(null);


  useEffect(() => {
    
    if(ref.current){

    updateWidth(option.optionId,ref.current.offsetWidth,optionsAnim)
  }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateWidth,option.optionId, ref]);

  

  function handleVote() {
    try {
      if (!user) throw new Error("voting user is missing on vote");
      setVote(option.counsilId, option.optionId, user);

  
      
      // dispatch(updateUserVote({optionId:option.optionId}))
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <div ref={ref} className={option.userVotedOption?"optionsBar__btn optionsBar__btn--select":"optionsBar__btn"} onClick={handleVote} style={{background:option.color||getColor()}}>
      {option.title}
    </div>
  );
};

export default OptionBtn;
