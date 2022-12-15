import { FC } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  title: string | undefined;
  back: string;
}

const Header: FC<HeaderProps> = ({ title, back }) => {
    console.log('back',back)
  function handleShare() {
    const shareData = {
      title: "Delib",
      text: `Please join me on voting on the question "${title}"`,
      url: window.location.href,
    };
    navigator.share(shareData);
  }
  return (
    <header>
      <Link to={`/${back}`}>
        <div className="headerBtn">
          <span className="material-symbols-outlined">arrow_back</span>
        </div>
      </Link>
      <h1>{title}</h1>
      <div className="headerBtn--circle" onClick={handleShare}>
        <span className="material-symbols-outlined">share</span>
      </div>
    </header>
  );
};

export default Header;
