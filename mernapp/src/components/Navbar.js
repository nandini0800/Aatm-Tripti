import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
export default function Navbar(props) {
  const [cartView, setCartView] = useState(false)
  localStorage.setItem('temp', "first")
  //let data = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  const loadCart = () => {
    setCartView(true)
  }
  const items = useCart();
  return (

    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <Link className="navbar-brand fs-1 fst-italic" to="/">आत्म Tripti</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active fs-5" to="/">Home <span className="sr-only"></span></Link>
            </li>
            {(localStorage.getItem("authToken")) ?
              <li className="nav-item">
                <Link className="nav-link active fs-5" to="/myOrder">My orders <span className="sr-only"></span></Link>
              </li>
              : ""}
          </ul>
          {(!localStorage.getItem("authToken")) ?
            <div className='d-flex'>
              <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>

              <Link className="btn bg-white text-success mx-1" to="/createuser">Sign Up</Link>

            </div>
            :
            <div>
              <div className="btn bg-white text-success mx-2 " onClick={loadCart}>
                <Badge color="secondary" badgeContent={items.length} >
                  <ShoppingCartIcon />
                </Badge>
                Cart
              </div>

              {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}

              <div className='btn bg-white text-danger mx-2' onClick={handleLogout}> Logout</div>
            </div>
          }
        </div>
      </nav>
    </div>
  )
}
