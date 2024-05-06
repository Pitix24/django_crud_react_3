import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import '../styles/Navigation.css';

export function Navigation() {
  // Estado para controlar si el menú está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);

  // Estado para controlar si el menú de registro está abierto o cerrado
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Función para alternar entre abrir y cerrar el menú
  const toggleMenu = (event) => {
    // Verifica si el clic proviene de un elemento dentro del menú desplegable
    if (event.target.closest('.register-menu')) {
      return;
    }
    setIsOpen(!isOpen);
  };

  // Función para manejar los clics dentro del menú desplegable
  const handleDropdownClick = (event) => {
    event.stopPropagation(); // Detiene la propagación del evento, evitando que se active toggleMenu
    setIsRegisterOpen(!isRegisterOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/customers" style={{ color: 'inherit', textDecoration: 'inherit'}}>
          <FontAwesomeIcon icon={faReact} /> CRUD REACT
        </Link>
      </div>
      <ul className={isOpen ? "navbar-menu active" : "navbar-menu"}>
        <li className="navbar-item">
          <Link to="/customers" className="navbar-link" onClick={(event) => toggleMenu(event)}>Customers</Link>
        </li>
        <li className="navbar-item">
          <Link to="/employees" className="navbar-link" onClick={(event) => toggleMenu(event)}>Employees</Link>
        </li>
        <li className="navbar-item">
          <Link to="/orders" className="navbar-link" onClick={(event) => toggleMenu(event)}>Orders</Link>
        </li>
        <li className="navbar-item">
          <Link to="/products" className="navbar-link" onClick={(event) => toggleMenu(event)}>Products</Link>
        </li>
        <li className="navbar-item">
          <Link to="/orderdetails" className="navbar-link" onClick={(event) => toggleMenu(event)}>OrderDetails</Link>
        </li>
        <li className="navbar-item">
          <div className="navbar-link" onMouseEnter={handleDropdownClick}>
            Register <FontAwesomeIcon icon={faCaretDown} />
            {isRegisterOpen && (
              <ul className="register-menu" onMouseLeave={handleDropdownClick}>
                <li>
                  <Link to="/customers-create" onClick={(event) => toggleMenu(event)}>Customer</Link>
                </li>
                <li>
                  <Link to="/employees-create" onClick={(event) => toggleMenu(event)}>Employee</Link>
                </li>
                <li>
                  <Link to="/orders-create" onClick={(event) => toggleMenu(event)}>Order</Link>
                </li>
                <li>
                  <Link to="/products-create" onClick={(event) => toggleMenu(event)}>Product</Link>
                </li>
                <li>
                  <Link to="/orderdetails-create" onClick={(event) => toggleMenu(event)}>OrderDetail</Link>
                </li>
              </ul>
            )}
          </div>
        </li>
      </ul>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <i className={isOpen ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
    </nav>
  );
}

export default Navigation;
