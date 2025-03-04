import React, { useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
// import {Link} from 'react-router-dom'
export default function NavBar() {
    const navigate = useNavigate();
    
    
    const userId = localStorage.getItem('userId');
    const handleLogout = () => {
        // Optionally, remove other login-related data like userId
        localStorage.removeItem('userId');
        alert("logout SuccessFully")
        navigate('/login');
    };
    return (
        <div>
            <nav  className="navbar navbar-expand-lg navbar-light ">
                <div className="container-fluid shadow p-2 sticky-top">
                    <Link to="/" className="logo fs-2 text-dark text-decoration-none fw-bold">
                        {/* <img src="images/icons/logo-01.png" alt="IMG-LOGO" className="img-fluid" /> */}
                        Fashionfizz
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink style={({ isActive }) => ({ color: isActive ? "dark" : "gray", fontFamily: isActive ? "cursive" : "fantasy" })} className="nav-link btn fs-4   ms-4 fw-semibold " to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink style={({ isActive }) => ({ color: isActive ? "dark" : "gray", fontFamily: isActive ? "cursive" : "fantasy" })} className="nav-link  btn   fs-4 ms-4 fw-semibold " to="/shop">Shop</NavLink>
                            </li>
                            {/* <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle text-dark fs-4 ms-4 fw-semibold " to='/shop' id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Services
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/">Action</Link></li>
                                    <li><Link className="dropdown-item" to="/">Another action</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/">Something else here</Link></li>
                                </ul>
                            </li> */}
                            <li className="nav-item">
                                <NavLink style={({ isActive }) => ({ color: isActive ? "dark" : "gray", fontFamily: isActive ? "cursive" : "fantasy" })} className="nav-link  fs-4 ms-4 fw-semibold " to="/about"  >About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink style={({ isActive }) => ({ color: isActive ? "dark" : "gray", fontFamily: isActive ? "cursive" : "fantasy" })} className="nav-link  fs-4 ms-4 fw-semibold " to="/contact"  >Contact</NavLink>
                            </li>
                            {
                                (userId) ? <li className="nav-item">
                                    <button className="nav-link fs-4 ms-4 fw-semibold " onClick={handleLogout}  >Logout</button>
                                </li> : <li className="nav-item">
                                    <NavLink style={({ isActive }) => ({ color: isActive ? "dark" : "gray", fontFamily: isActive ? "cursive" : "fantasy" })} className="nav-link  fs-4 ms-4 fw-semibold " to="/register"  >Register</NavLink>
                                </li>

                            }

                        </ul>
                        <div className="d-flex justify-content-start ">
                            <button className="btn btn-link d-flex" type="button" >
                                <input type='search' placeholder='Search Product...' className='form-control'></input>
                            </button>

                            {/* <div className="cont mt-2">
                                <div className="toggle rounded-pill">
                                    <input type="checkbox" onChange={()=>Setthem()} id="mode-toggle" ref={toggle} className="toggle__input" />
                                    <label for="mode-toggle" className="toggle__label"></label>
                                </div>
                            </div> */}
                            <Link to={'/cart'} className="btn btn-link position-relative">
                                <i className="fa-solid fa-cart-shopping fs-3"></i>
                                {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    2
                                </span> */}
                            </Link>



                        </div>
                    </div>
                </div>
            </nav>

        </div>
    )
}
