import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="h-20 flex items-center border-b">
      <nav className="main-wrapper">
        <Link to={"/"}>
          <span className="font-title text-2xl font-extrabold">
            <span>Daily</span>
            <span className="text-accent">Draft</span>
          </span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
