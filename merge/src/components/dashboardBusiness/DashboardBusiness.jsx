import React, { useState } from "react";
import './DashboardBusinessStyle.css'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import { NavLink } from 'react-router-dom'
import { SidebarDate } from "./SidebarDate";
import { IconContext } from 'react-icons'
import mergeLogo from './../../Assets/Merge.svg'
import ModalMenu from "./ModaMenu/ModalMenu";

const DashboardBusiness = () => {

    const [sidebar, setSideBar] = useState(false)
    const showSideBar = () => setSideBar(!sidebar)

    return (
        <div className="MasterContainer">
            <IconContext.Provider value={{ color: "#fff" }}>
                <div className="navBar">
                    <NavLink to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSideBar} />
                    </NavLink>
                    <img className="merge-logo" src={mergeLogo} alt="" />
                </div>
                <ModalMenu/>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className="nav-menu-items" onClick={showSideBar}>
                        <li className="navbar-toggle">
                            <NavLink to="#" className="menu-bars">
                                <AiIcons.AiOutlineClose />
                            </NavLink>
                            <img className="merge-logo" src={mergeLogo} alt="" />
                        </li>
                        {SidebarDate.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <NavLink className="align-items" to={item.path}>
                                        {item.icon}
                                        <span className="title-nav">{item.title}</span>
                                    </NavLink>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </div>
    )
}
export default DashboardBusiness;