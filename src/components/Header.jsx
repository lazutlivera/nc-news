import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
export default function Header() {
  const { user, users, handleChange } = useContext(UserContext);

  return (
    <header className="header">
      <Link to="/">
        <h1>NC News</h1>
      </Link>
      <section className="user-select">
        <label htmlFor="user-select" className="user-select">
          Select User:
        </label>
        <select onChange={handleChange}>
          {users.map((user) => (
            <option key={user.username} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>
        <p>Logged in as: <span id="logged-name">{user.username}</span></p>
      </section>
    </header>
  );
}
