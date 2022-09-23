import React from "react";
import { useDispatch } from "react-redux";
import { addCouncil } from "../counsilsSlice";
import { v4 as uuidv4 } from "uuid";
import { addCouncilToDB } from "../control/setCouncilsDB";
import { Council } from "../councilModel";

const AddCouncil = () => {
  const dispatch = useDispatch();

  function handleAddCouncil(ev: any) {
    try {
      ev.preventDefault();
      let { title } = ev.target.elements;
      title = title.value;

      if (!title) throw new Error("some data is missing in add council form");
      const councilId = uuidv4();
      const council: Council = { title, councilId };
      dispatch(addCouncil(council));
      addCouncilToDB(council);

      ev.target.reset();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <form onSubmit={handleAddCouncil}>
        <input type="text" name="title" placeholder="Council title" />
        <button>ADD</button>
      </form>
    </div>
  );
};

export default AddCouncil;
