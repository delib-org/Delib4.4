import { FC } from "react";
import { Post, PostOption, Support } from "../board/model/postModel";
import moment from "moment";
import { useAppSelector } from "../../model/hooks";
import { SupportClass } from "../board/view/AddOpinion";
import { setVote } from "../selections/votes/setVote";
import { selectUser } from "../user/userSlice";
import { fromTextToArray } from "../../control/helpers";
import Bold from "../../view/components/Bold";
import { Link } from "react-router-dom";

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
      {option && post.option ? (
        <div className="postCard__support">
          <span>מכתב זה</span>
          <div className={`postCard__support--${post.option.support}`}>
          <span className={`postCard__support__span ${supportClass}`}>
            {translateSupport(post.option.support).word}
          </span>
          </div>
          <span>{translateSupport(post.option.support).prefix}- </span>
          <div
            className={
              option.userVotedOption
                ? `postCard__support__btn postCard__support__btn--voted btn`
                : `postCard__support__btn btn`
            }
            style={{ background: `${option.color}` }}
            onClick={handleSetVote}>
            <span>{option.title}</span>
            <span>{option.userVotedOption ? "✓" : ""}</span>
          </div>
          <div className="postCard__count" style={{ background: `${option.color}` }}>
          {option.votes} {option.votes === 1 ? "בעד" : "בעד"}
          </div>
        </div>
      ) : null}
      <div className={`postCard__text`}>
        {fromTextToArray(post.text).map((prg, i) => (
          <p key={`${post.postId}-${i}`}>
            <Bold text={prg} />
          </p>
        ))}
      </div>
      <Link to={`/council/${post.councilId}/chat/${post.postId}`}>
        <div className="more">Read more...</div>
      </Link>

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

function translateSupport(support: Support): { word: string; prefix: string } {
  try {
    switch (support) {
      case Support.OPPOSE:
        return { word: "מתנגד", prefix: "ל" };
      case Support.SUPPORT:
        return { word: "תומך", prefix: "ב" };
      case Support.NEUTRAL:
        return { word: "נמנע", prefix: "ב" };
      default:
        return { word: "", prefix: "" };
    }
  } catch (error) {
    console.error(error);
    return { word: "", prefix: "" };
  }
}
