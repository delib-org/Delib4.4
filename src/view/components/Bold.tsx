import { FC } from "react";

interface BoldProps {
  text: string;
}

const Bold: FC<BoldProps> = ({ text }) => {
  let isBold = false;
  return (
    <>
      {text.split("*").map((txt: string) => {
        if (isBold) {
          isBold = !isBold;
          return <b key={`${Math.random()}`}>{txt}</b>;
        } else {
          isBold = !isBold;
          return <span key={`${Math.random()}`}>{txt}</span>;
        }
      })}
    </>
  );
};

export default Bold;
