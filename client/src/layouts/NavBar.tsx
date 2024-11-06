import { Link } from "../components/Link";

export function NavBar() {
  return (
    <aside className="bg-gray-100 w-fit py-2.5 px-3.5 mx-auto rounded-lg">
      <nav className="flex justify-center gap-2.5">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </aside>
  );
}
