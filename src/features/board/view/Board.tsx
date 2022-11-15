import { FC, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../model/hooks";
import PostCard from "../../postCard/PostCard";
import BoardInput from "./BoardInput";



const Board: FC = () => {
  const postsBoard = useRef<any>(null);
  const { councilId } = useParams();
  const [isFirstScroll, setIsFirstScroll] = useState<boolean>(true)

  const posts = useAppSelector((state) =>
    state.boards.posts.filter((post) => post.councilId === councilId)
  );

  useEffect(()=>{
   console.log(isFirstScroll)
    
    if(isFirstScroll && posts.length>0){
      postsBoard.current.scrollTo({ top: postsBoard.current.scrollHeight });
      setIsFirstScroll(false)
    }else {

      postsBoard.current.scrollTo({ top: postsBoard.current.scrollHeight,behavior: "smooth" })
    }
  },[posts])

  return (
    <div className="board">
      <div className="board__posts" ref={postsBoard}>
        {posts
          .sort((a, b) => a.time - b.time)
          .map((post) => (
            <PostCard key={post.postId} post={post} />
          ))}
      </div>
      <BoardInput />
    </div>
  );
};

export default Board;
