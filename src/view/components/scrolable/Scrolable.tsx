import { FC, useEffect, useRef } from "react";

interface ScrollableProps {
  children: JSX.Element;
  numberOfChildren: number;
}

const Scrollable: FC<ScrollableProps> = ({ children, numberOfChildren }) => {
  const childrenWrapper = useRef<any>(null);
  useEffect(() => {
    console.dir(childrenWrapper);
    console.log(childrenWrapper.current.scrollHeight);
    childrenWrapper.current.scrollTo({
      top: childrenWrapper.current.scrollHeight,
      behavior: "smooth",
    });
  }, [numberOfChildren]);
  //   const [isFirstScroll, setIsFirstScroll] = useState<boolean>(true);
  return (
    <main ref={childrenWrapper}>
      <div className="wrapper">{children}</div>
    </main>
  );
};

export default Scrollable;
