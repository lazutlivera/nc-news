import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Header({ topics }) {
const {user} = useContext(UserContext);

  return (
    <header className="header">
      <Link to="/">
        <h1>NC News</h1>
      </Link>
      <div className="nav-container">
      <nav>
        {topics.map((topic) => (
          <Link key={topic.slug} to={`/topics/${topic.slug}`}>
            {topic.slug}
          </Link>
        ))}
      </nav>
      <section className="user-info">
        <p><em>Logged in as: <span id="logged-name">{user.username}</span></em></p>
      </section>
      </div>
    </header>
  );
}
