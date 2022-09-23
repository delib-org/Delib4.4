import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCouncil } from "../counsilsSlice";
import { v4 as uuidv4 } from "uuid";
import { addCouncilToDB } from "../../council/setCounsilsDB";
import { Counsil } from "../../council/councilModel";

import { selectUser } from "../../user/userSlice";
import { User } from "../../user/userModel";
import { useNavigate } from "react-router-dom";
import { OptionsView } from "../../options/model/optionModel";

const AddCouncil = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const user = useSelector(selectUser)

  function handleAddCouncil(ev: any) {
    try {
      ev.preventDefault();
      let { title,description } = ev.target.elements;
      title = title.value;
      description = description.value;

      if (!title || !description) throw new Error("Some data is missing in add council form");
      const counsilId = uuidv4();
      const defaultOptionsView:OptionsView =OptionsView.BARS;
     
      if(!user) throw new Error('Couldnt start a coucul withour coucnil creator');
      const creator:User = user;
     
      const council: Counsil = { title, counsilId,description,defaultOptionsView, creator };
      dispatch(addCouncil(council));
      addCouncilToDB(council);
      
      navigate(`/counsil/${counsilId}`)

      ev.target.reset();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <form onSubmit={handleAddCouncil}>
        <input type="text" name="title" placeholder="Counsil title" />
        <textarea name="description" placeholder="Add description" />
        <button>ADD</button>
      </form>
    </div>
  );
};

export default AddCouncil;
