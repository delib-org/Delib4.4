import React, { useState } from "react";
import { uuidv4 } from "@firebase/util";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../model/hooks";
import { selectUser } from "../../user/userSlice";
import { addPostToDB } from "../control/postsDB";
import { setPost } from "../control/boardSlice";
import { Post, Support } from "../model/postModel";

export enum SupportClass {
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
      const optionId = ev.target.elements.option.value;
      const optionTitle =
        options.find((option) => option.optionId === optionId)?.title || "";
      
    
      const post: Post =
      !support || support === Support.NEUTRAL || optionId === 'intro' || optionId === 'None'
          ? {
              text,
              creator: user,
              time: new Date().getTime(),
              postId: uuidv4(),
              councilId: councilId,
            }
          : {
              text,
              creator: user,
              time: new Date().getTime(),
              postId: uuidv4(),
              councilId: councilId,
              option: {
                optionId,
                title: optionTitle,
                support,
              },
            };


      dispatch(setPost(post));
      addPostToDB(post);
      setSupport(SupportClass.NEUTRAL);
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
        case Support.NEUTRAL:
          setSupport(SupportClass.NEUTRAL);
          break;
        case Support.SUPPORT:
          setSupport(SupportClass.SUPPORT);
          break;
        case Support.OPPOSE:
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
        <select
          name="support"
          onChange={handleSupportClass}
          className={support}>
          <option value={Support.NEUTRAL}>Neutral</option>
          <option value={Support.SUPPORT}>Support</option>
          <option value={Support.OPPOSE}>Oppose</option>
        </select>
      </div>
      <div className="board__input">
        <textarea required name="board_input" className={support}></textarea>
        <button>
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </form>
  );
};

export default BoardInput;
