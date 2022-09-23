import { uuidv4 } from "@firebase/util";
import { FC } from "react";
import { useAppDispatch } from "../../../model/hooks";
import { addOption } from "../control/optionsSlice";

interface AddOptionProps {
  showAddOption: boolean;
  setShowAddOption: Function;
  counsilId:string;
}

const AddOption: FC<AddOptionProps> = ({counsilId, showAddOption, setShowAddOption }) => {
  const dispatch = useAppDispatch();
  function handAddOption(ev:any) {
    try {
      ev.preventDefault();
      let  {title, description} = ev.target.elements;
      title = title.value;
      description = description.value;
const optionId = uuidv4();

      if(!title) throw new Error('No title in option')
      setShowAddOption(false);
      dispatch(addOption({title,description,optionId,counsilId, votes:0}))

    } catch (error) {
      console.error(error);
    }
  }
  if (showAddOption) {
    return (
      <div>
        <form onSubmit={handAddOption}>
          <input type="text" name="title" required={true} placeholder="option title" />
          <textarea name="description" placeholder="Description" ></textarea>
          <button>ADD Option</button>
        </form>
      </div>
    );
  } else {
    return null;
  }
};

export default AddOption;
