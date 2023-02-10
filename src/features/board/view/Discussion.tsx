import { FC, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../model/hooks";
import PostCard from "../../postCard/PostCard";
import AddCommentIcon from "@mui/icons-material/AddComment";
import AddOpinion from "./AddOpinion";
import { addOption } from "../../options/control/optionsSlice";
import { showAddPost } from "../control/boardSlice";

const Discussion: FC = () => {
  const postsBoard = useRef<any>(null);
  const { councilId } = useParams();
  const dispatch = useAppDispatch();
  const [isFirstScroll, setIsFirstScroll] = useState<boolean>(true);
  const [addOpinionShow, setAddOpinionShow] = useState<boolean>(false);

  const posts = useAppSelector((state) =>
    state.boards.posts.filter((post) => post.councilId === councilId)
  );

  useEffect(() => {
    if (isFirstScroll && posts.length > 0) {
      postsBoard.current.scrollTo({ top: postsBoard.current.scrollHeight });
      setIsFirstScroll(false);
    } else {
      postsBoard.current.scrollTo({
        top: postsBoard.current.scrollHeight,
        behavior: "smooth",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);

  return (
    <div className="board">
      <div className="board__posts" ref={postsBoard}>
        {posts
          .sort((a, b) => a.time - b.time)
          .map((post) => (
            <PostCard key={post.postId} post={post} />
          ))}
      </div>
      <div className="fav" onClick={()=>dispatch(showAddPost(true))}>
        <AddCommentIcon />
      </div>
     
    </div>
  );
};

export default Discussion;
