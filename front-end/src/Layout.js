import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="navbar fixed-bottom navbar-expand-lg navbar-light bg-light col-8">
              <Link className="nav-link" to="/">
                <span className="oi oi-dashboard" />
                &nbsp;Map
              </Link>
              <Link className="nav-link" to="/Tables">
                <span className="oi oi-dashboard" />
                &nbsp;Registered
              </Link>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;