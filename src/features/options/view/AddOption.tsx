import { uuidv4 } from "@firebase/util";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../model/hooks";
import { User } from "../../user/userModel";
import { selectUser } from "../../user/userSlice";
import { addOption } from "../control/optionsSlice";
import { addOptionToDB } from "../control/setOptions";
import { OptionProps } from "../model/optionModel";

interface AddOptionProps {
  showAddOption: boolean;
  handleShowAddOption: Function;
  counsilId: string;
}

const AddOption: FC<AddOptionProps> = ({
  counsilId,
  showAddOption,
  handleShowAddOption,
}) => {
  const dispatch = useAppDispatch();
  const user: User | null = useAppSelector(selectUser);

  function handAddOptionForm(ev: any) {
    try {
      ev.preventDefault();
      let { title, description } = ev.target.elements;
      title = title.value;
      description = description.value;
      if (!title) throw new Error("No title in option");
      const optionId = uuidv4();
      if (!user)
        throw new Error("To create new option, a user must be present");

      const newOption: OptionProps = {
        created:new Date().getTime(),
        title,
        description,
        optionId,
        counsilId,
        votes: 0,
        creator: user,
      };

      handleShowAddOption(false);
      dispatch(addOption(newOption));
      addOptionToDB(newOption);
    } catch (error) {
      console.error(error);
    }
  }
  if (showAddOption) {
    return (
      <div className="modal">
        <form onSubmit={handAddOptionForm} className="modal__box">
          <input
            type="text"
            name="title"
            required={true}
            placeholder="option title"
          />
          <textarea name="description" placeholder="Description"></textarea>
          <div className="btns">
          <div className="btn btn--cancel" onClick={()=>handleShowAddOption(false)}>CANCEL</div>
            <button>ADD OPTION</button>
          </div>
        </form>
      </div>
    );
  } else {
    return null;
  }
};

export default AddOption;
