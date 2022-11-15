import { FC } from "react";
import { Post, PostOption, Support } from "../board/model/postModel";
import moment from "moment";
import { useAppSelector } from "../../model/hooks";
import { SupportClass } from "../board/view/BoardInput";


interface PostCardProps {
  post: Post;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const option = useAppSelector((state) =>
    state.options.options.find(
      (option) => option.optionId === post.option?.optionId
    )
  );
  const supportClass: SupportClass = getSupportClass(post.option);
  return (
    <div className="postCard">
      {option && post.option ? (
        <div className={`postCard__support ${supportClass}`}>
          {post.option.support}: {option.title}
        </div>
      ) : null}
      <div className="postCard__text">{post.text}</div>

      <div className="postCard__time">{moment(post.time).fromNow()}</div>
    </div>
  );
};

export default PostCard;

function getSupportClass(option: PostOption|undefined) {
  try {
    console.log(option)
    if (!option) return SupportClass.NEUTRAL;
    if (!option.support) return SupportClass.NEUTRAL;
    console.log(option.support)
    switch (option.support) {
      case Support.OPPOSE:
        return SupportClass.OPPOSE;
      case Support.SUPPORT:
        return SupportClass.SUPPORT;
      default:
        return SupportClass.NEUTRAL;
    }
  } catch (error) {
    console.error(error);
    return SupportClass.NEUTRAL;
  }
}
