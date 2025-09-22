import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 flex justify-between items-center shadow-lg">
      <h1 className="font-bold text-2xl">Mi Tienda Online</h1>
      <div className="flex items-center space-x-6">
        <Link to="/" className="hover:text-gray-200 font-medium">Inicio</Link>
        <Link to="/products" className="hover:text-gray-200 font-medium">Productos</Link>
        <Link to="/cart" className="hover:text-gray-200 font-medium">Carrito</Link>
      </div>
    </nav>
  );
}
