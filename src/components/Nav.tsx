import { Link, useLocation } from "react-router-dom";

const Nav = () => {

  const links = [
    { key: 1, label: "Home", to: "/"},
    { key: 2, label: "Potential Candidates", to: "/SavedCandidates"},
  ];

  const location = useLocation();

  return (
    <div className = "header">
      <nav className = "navbar navbar-expand-sm">
        <div className = "container-fluid">
          <div className = "collapse navbar-collapse">
            <ul className = "navbar-nav me-auto mb-2 mb-md-0">
              {links.map((link) => (
                <li className = "nav-item" key={link.key}>
                  <Link to={link.to} className={`nav-link ${location.pathname== link.to ? "text-white fw-bold" : "text-white"}`}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
};

export default Nav;
