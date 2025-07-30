import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../src/Components/Navbar';


const Layout = () => {

    return (

        <div className='app-layout'>

            <NavBar />
            <main>
                <Outlet />
            </main>

        </div>

    )

}

export default Layout;