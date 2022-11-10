import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCouncil } from "../control/councilsSlice";
import { v4 as uuidv4 } from "uuid";
import { addCouncilToDB } from "../../council/setCouncilsDB";
import { Council } from "../../council/councilModel";

import { selectUser } from "../../user/userSlice";
import { User } from "../../user/userModel";
import { useNavigate } from "react-router-dom";
import { OptionsView } from "../../options/model/optionModel";
import { getColor } from "../../../control/helpers";

const AddCouncil = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  function handleAddCouncil(ev: any) {
    try {
      ev.preventDefault();
      let { title, description } = ev.target.elements;
      title = title.value;
      description = description.value;

      if (!title || !description)
        throw new Error("Some data is missing in add council form");
      const councilId = uuidv4();
      const defaultOptionsView: OptionsView = OptionsView.BARS;

      if (!user)
        throw new Error("Couldnt start a coucul withour coucnil creator");
      const creator: User = user;

      const council: Council = {
        title,
        councilId,
        description,
        defaultOptionsView,
        creator,
        lastAction: new Date().getTime(),
        color: getColor(),
      };
      dispatch(addCouncil(council));
      addCouncilToDB(council);

      navigate(`/council/${councilId}`);

      ev.target.reset();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <form onSubmit={handleAddCouncil}>
        <input type="text" name="title" placeholder="Council title" />
        <textarea name="description" placeholder="Add description" />
        <button>ADD</button>
      </form>
    </div>
  );
};

export default AddCouncil;
