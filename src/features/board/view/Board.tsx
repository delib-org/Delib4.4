import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../model/hooks";
import PostCard from "../../postCard/PostCard";
import BoardInput from "./BoardInput";

const Board = () => {
  const { councilId } = useParams();

  const posts = useAppSelector((state) =>
    state.boards.posts.filter((post) => post.councilId === councilId)
  );

  return (
    <div className="board">
      <div className="board__posts">
        {posts.map((post) => (
          <PostCard key={post.postId} post={post} />
        ))}
      </div>
      <BoardInput />
    </div>
  );
};

export default Board;
