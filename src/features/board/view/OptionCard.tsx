import React, { FC } from "react";
import { Accordion } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { OptionProps } from "../../options/model/optionModel";
import { selectPosts } from "../control/boardSlice";
import { useAppSelector } from "../../../model/hooks";
import PostCard from "../../postCard/PostCard";
import { Post } from "../model/postModel";

interface OptionCardProps {
  option: OptionProps;
}

const OptionCard: FC<OptionCardProps> = ({ option }) => {
  const posts: Post[] | undefined = useAppSelector(
    selectPosts(option.optionId)
  );

  return (
    <Accordion TransitionProps={{ unmountOnExit: true }} dir="rtl">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id={option.optionId}>
        <Typography className="optionCard__title">{option.title}</Typography>
      </AccordionSummary>
      <div className="optionCard">
        <div className="optionCard__description">{option.description}</div>
        <Accordion TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={option.optionId}>
            <Typography>דעות בעד ונגד</Typography>
            <div className="optionCard__add">
                <div className="optionCard__add__btn optionCard__add__btn--pro">בעד</div>
                <div className="optionCard__add__btn optionCard__add__btn--neutral">ניטרלי</div>
                <div className="optionCard__add__btn optionCard__add__btn--against">נגד</div>
            </div>
          </AccordionSummary>
          <div className="optionCard__posts">
            {posts
              ? posts.map((post: Post) => (
                  <PostCard key={post.postId} post={post} />
                ))
              : null}
          </div>
        </Accordion>
      </div>
    </Accordion>
  );
};

export default OptionCard;
