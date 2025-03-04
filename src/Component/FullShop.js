import React from 'react'
import {  NavLink, Outlet } from 'react-router-dom'
export default function FullShop() {
    return (
        <div className='bg-img'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container  p-2 sticky-top">

                    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button> */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink style={({isActive})=>({color:isActive?"dark":"gray",fontFamily:isActive?"cursive":"fantasy"})} className="nav-link   fs-5 ms-3 " aria-current="page" to="/shop">All Product</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink style={({isActive})=>({color:isActive?"red":"gray",fontFamily:isActive?"cursive":"fantasy",textDecoration:isActive?"underline":"",fontSize:isActive?"26px":"18px"})} className="nav-link ms-3 " to="/shop/women">Women</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink style={({isActive})=>({color:isActive?"red":"gray",fontFamily:isActive?"cursive":"fantasy",textDecoration:isActive?"underline":"",fontSize:isActive?"26px":"18px"})} className="nav-link  ms-3 " to="/shop/men"  >Men</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink style={({isActive})=>({color:isActive?"red":"gray",fontFamily:isActive?"cursive":"fantasy",textDecoration:isActive?"underline":"",fontSize:isActive?"26px":"18px"})} className="nav-link  ms-3 " to="/shop/bag"  >Bag </NavLink>
                            </li>
                        </ul>

                        {/* <div className="d-flex justify-content-center ">
                            <button className="btn btn-link d-flex" type="button" >
                                <input type='search' placeholder='Search Product...' className='form-control'></input>

                            </button>
                        </div> */}
                    </div>

                </div>
            </nav>
            <div className='container '>
                <div className='row mb-4'>
                    <div className='col-xl-12'>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    )
}
