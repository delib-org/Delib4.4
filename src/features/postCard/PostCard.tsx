import { FC } from "react";
import { Post, PostOption, Support } from "../board/model/postModel";
import moment from "moment";
import { useAppSelector } from "../../model/hooks";
import { SupportClass } from "../board/view/BoardInput";
import { setVote } from "../selections/votes/setVote";
import { selectUser } from "../user/userSlice";
import { fromTextToArray } from "../../control/helpers";
import Bold from "../../view/components/Bold";

interface PostCardProps {
  post: Post;
}

const PostCard: FC<PostCardProps> = ({ post }) => {

  const user = useAppSelector(selectUser);
  const option = useAppSelector((state) =>
    state.options.options.find(
      (option) => option.optionId === post.option?.optionId
    )
  );
  const supportClass: SupportClass = getSupportClass(post.option);

  function handleSetVote() {
    try {
      if (!option) throw new Error(`No option`);
      if (!user) throw new Error("No user");
      // dispatch(updateUserVote({optionId:option.optionId,councilId:option.councilId}));
      setVote(option.councilId, option.optionId, user);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="postCard">
      <div className={`postCard__text`}>
        {fromTextToArray(post.text).map((prg, i) => (
          <p key={`${post.postId}-${i}`}>
            <Bold text={prg} />
          </p>
        ))}
      </div>

      {option && post.option ? (
        <div className="postCard__support">
          <span className={`postCard__support__span ${supportClass}`}>
            {" "}
            {post.option.support}
          </span>
          <div
            className={
              option.userVotedOption
                ? `postCard__support__btn postCard__support__btn--voted btn`
                : `postCard__support__btn btn`
            }
            style={{ background: `${option.color}` }}
            onClick={handleSetVote}>
            {option.title}
          </div>
        </div>
      ) : null}
      <div className="postCard__time">{moment(post.time).fromNow()}</div>
    </div>
  );
};

export default PostCard;

function getSupportClass(option: PostOption | undefined) {
  try {
    if (!option) return SupportClass.NEUTRAL;
    if (!option.support) return SupportClass.NEUTRAL;

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
