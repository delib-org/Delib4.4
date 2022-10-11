import {FC} from "react";
import { fromTextToParagraph } from "../../control/helpers";
interface DescriptionProps {
  description: string;
}

const Description: FC<DescriptionProps> = ({ description }) => {
  const descriptionParagraph = fromTextToParagraph(description);
  return (
    <div className="description">
      {descriptionParagraph.map((p, i) => {
        return <p key={`${i}-description`}>{p}</p>;
      })}
    </div>
  );
};

export default Description;
