import React, { useState } from "react";
import { uuidv4 } from "@firebase/util";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../model/hooks";
import { selectUser } from "../../user/userSlice";
import { addPostToDB } from "../control/postsDB";
import { setPost } from "../control/boardSlice";
import { Post } from "../model/postModel";

enum SupportClass {
  NEUTRAL = "select--neutral",
  SUPPORT = "select--support",
  OPPOSE = "select--oppose",
}

const BoardInput = () => {
  const { councilId } = useParams();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const options = useAppSelector((state) =>
    state.options.options.filter((option) => option.councilId === councilId)
  );

  const [support, setSupport] = useState<SupportClass>(SupportClass.NEUTRAL);

  function handleSendPost(ev: any) {
   
    ev.preventDefault();
    try {
      if (!user) throw new Error("No user");
      if (!councilId) throw new Error("No council Id");

      const text = ev.target.elements.board_input.value;
      const support = ev.target.elements.support.value;
      const option = ev.target.elements.option.value;
      console.log(text, option, support);
      const post: Post = {
        text,
        creator: user,
        time: new Date().getTime(),
        postId: uuidv4(),
        councilId: councilId,
      };
      console.log(post);
      dispatch(setPost(post));
      addPostToDB(post);
      setSupport(SupportClass.NEUTRAL)
      ev.target.reset();
    } catch (error) {
      console.error(error);
    }
  }

  function handleSupportClass(ev: any) {
    try {
      const supportClass = ev.target.value;
      console.log(supportClass);
      switch (supportClass) {
        case SupportClass.NEUTRAL:
          setSupport(SupportClass.NEUTRAL);
          break;
        case SupportClass.SUPPORT:
          setSupport(SupportClass.SUPPORT);
          break;
        case SupportClass.OPPOSE:
          setSupport(SupportClass.OPPOSE);
          break;
        default:
          setSupport(SupportClass.NEUTRAL);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSendPost}>
      <div className="board__support">
        <select name="option" defaultValue={"intro"} className={support}>
          <option disabled value="intro">
            Which option do you support or oppose?
          </option>
          <option>None</option>
          {options.map((option) => (
            <option key={option.optionId} value={option.optionId}>
              {option.title}
            </option>
          ))}
        </select>
        <select name="support" onChange={handleSupportClass} className={support}>
          <option value={SupportClass.NEUTRAL}>Neutral</option>
          <option value={SupportClass.SUPPORT}>Support</option>
          <option value={SupportClass.OPPOSE}>Oppose</option>
        </select>
      </div>
      <div className="board__input">
        <textarea required name="board_input"></textarea>
        <button>
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </form>
  );
};

export default BoardInput;
