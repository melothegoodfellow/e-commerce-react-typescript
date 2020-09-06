import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from 'antd';
import { ShoppingCartOutlined, LoginOutlined } from '@ant-design/icons';

import HomePage from "./pages/home.page";
import ProductPage from "./pages/product.page";
import CartPage from "./pages/cart.page";
import LoginPage from "./pages/login.page";
import RegisterPage from "./pages/register.page";

import { CartProduct } from "./lib/types";

function App() {
  const cartDetails = useSelector((state: any) => state.cartDetails);
  const userDetails = useSelector((state: any) => state.userDetails);
  const { cartProducts } = cartDetails;
  const { user } = userDetails;

  const openSidebar = () => {
    document.querySelector(".sidebar")!.classList.add("open");
  }

  const closeSidebar = () => {
    document.querySelector(".sidebar")!.classList.remove("open");
  }

  return (
    <BrowserRouter>
      <div className="App">
        <div className="grid-container">
        <header className="header">
          <div className="brand">
            <span>
              <button onClick={openSidebar}>
                &#9776;
              </button>
            </span>
            <span>
              <Link to="/"> E-commerce </Link>
            </span>
          </div>
          <nav className="header-links">
            <ul>
              <li>
                <Link to="/cart">
                  <Badge count={
                      cartProducts.reduce(
                        (accumulator: number, cartProduct: CartProduct) => 
                           accumulator + cartProduct.quantity
                      , 0)
                    }>
                    <ShoppingCartOutlined />
                  </Badge>
                  </Link>
              </li>
              <li>
                {
                  (user) ? 
                  <div>
                    Hi, { ' '+user.name }
                  </div> :
                  <Link to="/login">
                    <LoginOutlined />
                  </Link>
                }
              </li>
            </ul>
          </nav>
        </header>
        <aside className="sidebar">
          <section>
            <h3 className="sidebar-title">
              Categories
            </h3>
            <button 
              className="close-button"
              onClick={closeSidebar}>
              X
            </button>
            <ul className="product-categories">
              <li>
                <a href="index.html">
                  Pants
                </a>
              </li>
              <li>
                <a href="index.html">
                  Shirts
                </a>
              </li>
            </ul>
          </section>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/" exact={true} component={HomePage} />
            <Route path="/products/:id" component={ProductPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/cart/:id?" component={CartPage} />
          </div>
        </main>
        <footer className="footer">
          All rights reserved.
        </footer>
      </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
