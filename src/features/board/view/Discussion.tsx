import { FC, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../model/hooks";
import PostCard from "../../postCard/PostCard";
import AddCommentIcon from "@mui/icons-material/AddComment";
import AddOpinion from "./AddOpinion";
import { addOption, optionsSelector } from "../../options/control/optionsSlice";
import { showAddPost } from "../control/boardSlice";
import OptionCard from "./OptionCard";

const Discussion: FC = () => {
  const postsBoard = useRef<any>(null);
  const { councilId } = useParams();
  const options = useAppSelector(optionsSelector).filter(option=>option.councilId===councilId);
  const dispatch = useAppDispatch();
  const [isFirstScroll, setIsFirstScroll] = useState<boolean>(true);
  // const [addOpinionShow, setAddOpinionShow] = useState<boolean>(false);

  const posts = useAppSelector((state) =>
    state.boards.posts.filter((post) => post.councilId === councilId)
  );

  useEffect(() => {
    if (isFirstScroll && posts.length > 0) {
      // postsBoard.current.scrollTo({ top: postsBoard.current.scrollHeight });
      // setIsFirstScroll(false);
    } else {
      // postsBoard.current.scrollTo({
      //   top: postsBoard.current.scrollHeight,
      //   behavior: "smooth",
      // });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);

  return (
    <div className="board">
      <h3>דעות בעד ונגד</h3>
      <div className="board__options">
        {options.map((option) =><OptionCard key={`board-${option.optionId}`} option={option}/>)}
      </div>
      <div className="fav fav--comments" onClick={()=>dispatch(showAddPost(true))}>
        <AddCommentIcon />
      </div>
     
    </div>
  );
};

export default Discussion;
