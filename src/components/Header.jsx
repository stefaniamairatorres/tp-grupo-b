import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          E-Commerce
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Productos</Link>
          <Link to="/contact" className="nav-link">Contacto</Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/admin" className="nav-link">Admin</Link>
              <span className="nav-text">Hola, {user.name}</span>
              <button onClick={handleLogout} className="nav-link btn-logout">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
          <Link to="/carrito" className="nav-link cart-icon-link">
            🛒
            {totalItems > 0 && <span className="cart-item-count">{totalItems}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;