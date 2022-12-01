import { uuidv4 } from "@firebase/util";
import { FC } from "react";
import { getColor } from "../../../control/helpers";
import { useAppDispatch, useAppSelector } from "../../../model/hooks";
import { Council } from "../../council/councilModel";
import { requestPermission } from "../../messages/messaging";
import { User } from "../../user/userModel";
import { selectUser } from "../../user/userSlice";
import {
  addOption,
  reorderCouncilOptions,
  updateOrder,
} from "../control/optionsSlice";
import { addOptionToDB } from "../control/setOptions";
import { OptionProps, Order } from "../model/optionModel";

interface AddOptionProps {
  showAddOption: boolean;
  handleShowAddOption: Function;
  council: Council;
}

const AddOption: FC<AddOptionProps> = ({
  council,
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
      description = description.value || "";
      if (!title) throw new Error("No title in option");
      const optionId = uuidv4();
      if (!user)
        throw new Error("To create new option, a user must be present");

      console.log(user);

      const newOption: OptionProps = {
        created: new Date().getTime(),
        title,
        description,
        optionId,
        councilId: council.councilId,
        councilTitle: council.title,
        votes: 0,
        creator: user,
        color: getColor(),
      };

      handleShowAddOption(false);
      dispatch(addOption(newOption));
      requestPermission();
      dispatch(
        reorderCouncilOptions({
          councilId: council.councilId,
          sortBy: Order.NEW,
        })
      );
      dispatch(updateOrder(Order.NEW));
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
            <div
              className="btn btn--cancel"
              onClick={() => handleShowAddOption(false)}>
              CANCEL
            </div>
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
