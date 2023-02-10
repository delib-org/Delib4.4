import React, { useState } from "react";
import { uuidv4 } from "@firebase/util";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../model/hooks";
import { selectUser } from "../../user/userSlice";
import { addPostToDB } from "../control/postsDB";
import { setPost } from "../control/boardSlice";
import { Post, Support } from "../model/postModel";

export enum SupportClass {
  NEUTRAL = "neutral",
  SUPPORT = "support",
  OPPOSE = "oppose",
}

const AddOpinion = () => {
  const { councilId } = useParams();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const options = useAppSelector((state) =>
    state.options.options.filter((option) => option.councilId === councilId)
  );

  const [support, setSupport] = useState<SupportClass>(SupportClass.NEUTRAL);
  const [showSupport, setShowSupport] = useState<boolean>(false);
  const [showOpinion, setShowOpinion] = useState<boolean>(false);

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
        !support ||
        support === Support.NEUTRAL ||
        optionId === "intro" ||
        optionId === "None"
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
      setShowOpinion(true);
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
    <div className="addOpinion">
      <div className={`addOpinion__box addOpinion--${support}`}>
        <form onSubmit={handleSendPost}>
          <div className="addOpinion__option">
            <p>על איזה פתרון אתם רוצים לכתוב?</p>
            <select
              name="option"
              defaultValue={"intro"}
              className={support}
              onChange={(e) => {
                console.log(e.target.value);
                if (e.target.value !== "none" || e.target.value === undefined) {
                  setShowSupport(true);
                } else {
                  setShowSupport(false);
                  setShowOpinion(true);
                }
              }}>
              <option disabled value="intro">
                על איזו פתרון אתם רוצים לכתוב?
              </option>
              <option value="none">על אף פתרון - משהו עצמאי</option>
              {options.map((option) => (
                <option key={option.optionId} value={option.optionId}>
                  {option.title}
                </option>
              ))}
            </select>
            {showSupport ? (
              <div className="addOpinion__support">
                <p>האם אתם מתנגדים, תומכים או נמנעים בפתרון?</p>
                <select
                  name="support"
                  onChange={handleSupportClass}
                  className={support}>
                  <option value={Support.NEUTRAL}>נמנעים</option>
                  <option value={Support.SUPPORT}>תומכים</option>
                  <option value={Support.OPPOSE}>מתנגדים</option>
                </select>
              </div>
            ) : null}
          </div>
          {showOpinion ? (
            <>
              <div className="addOpinion__input">
                <textarea
                  required
                  name="board_input"
                  className="addOpinion__input__textarea"></textarea>
              </div>
              <button>
                <span className="material-symbols-outlined">send</span>
              </button>
            </>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default AddOpinion;
