import React from 'react'
import { Link, Outlet } from "react-router-dom"

function NavBar() {
    return (
        <div className='header'>
            <div className='navbar-container'>
                <Link className="navbar-logo" to="/">Receipe Blog</Link>
                <div className='nav-menu'>
                    <Link className='nav-links' to="/">Home</Link>
                    <Link className='nav-links' to="/post">Post</Link>
                    <Link className='nav-links' to="/contact">Contact</Link>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default NavBar;