import { NavLink, Outlet } from "react-router-dom";
import './index.css'
function Sidebar (){

    return(
        <>
        <nav className="sidebar">
            <NavLink to="/" >Home</NavLink>
            <NavLink to="/Products" >Products</NavLink>
        </nav>
        <main>
            <Outlet/>
        </main>
        </>
    )
}

export default Sidebar;