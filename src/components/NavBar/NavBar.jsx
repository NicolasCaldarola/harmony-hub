import { NavLink, Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <h2>Harmony Hub</h2>
        </Link>

        <div className="nav-menu">
          <NavLink 
            to="/category/cuerdas" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Cuerdas
          </NavLink>
          <NavLink 
            to="/category/viento" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Viento
          </NavLink>
          <NavLink 
            to="/category/percusion" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Percusión
          </NavLink>
        </div>

        {/* Carrito */}
        <Link to="/cart" className="cart-container">
          <CartWidget />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;