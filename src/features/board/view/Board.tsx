import { uuidv4 } from "@firebase/util";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../model/hooks";
import PostCard from "../../postCard/PostCard";
import { selectUser } from "../../user/userSlice";
import { setPost } from "../control/boardSlice";
import { addPostToDB } from "../control/postsDB";
import { Post } from "../model/postModel";



const Board = () => {
  const { councilId } = useParams();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) =>
    state.boards.posts.filter((post) => post.councilId === councilId)
  );

 


  function handleSendPost(ev: any) {
    ev.preventDefault();
    try {
      if (!user) throw new Error("No user");
      if (!councilId) throw new Error("No council Id");

      const text = ev.target.elements.board_input.value;

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
      ev.target.reset();
    } catch (error) {}
  }
  return (
    <div className="board">
      <div className="board__posts">
        {posts.map((post) => (
          <PostCard key={post.postId} post={post} />
        ))}
      </div>
      <form className="textInput" onSubmit={handleSendPost}>
        <textarea required name="board_input"></textarea>
        <button type="submit">
          <span className="material-symbols-outlined">send</span>
        </button>
      </form>
    </div>
  );
};

export default Board;
