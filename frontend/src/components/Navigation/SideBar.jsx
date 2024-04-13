import './SideBar.css'
import { useState } from 'react'

function SideBar({ user }) {
    const [ showMenu, setShowMenu ] = useState(false)

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };

    const ulClassName = "DropDownMenu" + (showMenu ? "" : " hidden");

    return (
        <>
            <div className='OpenMenuButton'>
                <i className="fa-solid fa-bars"></i>
            </div>
            <div className="DropDownMenu">
                <div>Welcome {user?.first_name}!</div>
                <li><a href="/orders"></a>Orders</li>
                <li><a href='/storepolicy'>Store Policy</a></li>
                <li><a href='/contactus'>Contact Us</a></li>
                <button>Log Out</button>
            </div>
        </>
    )
}


export default SideBar
