import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar(){
    const active="bg-blue-900 text-white h-full flex items-center px-3"
    const notActive = "text-blue-900 border-b-2 border-white hover:border-blue-900 px-2"
    return(
        <nav className="fixed bg-white w-full flex justify-evenly h-16 items-center text-xs md:text-base">
            <ul className="flex lg:gap-20 uppercase text-blue-900 font-semibold h-full items-center">
                <li className= "items-center h-full flex">< NavLink to ="/record" className={({isActive})=>isActive ? active:notActive}> Pending<span className="hidden md:inline ml-1">Client</span></NavLink></li>
                <li className= "items-center h-full flex">< NavLink to ="/CompletedList" className={({isActive})=>isActive ? active:notActive}> Completed <span className="hidden md:inline">Client</span></NavLink></li>
                <li className= "items-center h-full flex">< NavLink to ="/AuthorizeduserList" className={({isActive})=>isActive ? active:notActive}> Authorized <span className="hidden md:inline ">User</span></NavLink></li>
            </ul>
            <div>
                <Link to="/"><button className="border-2 border-blue-900 rounded-full py-1 px-4 uppercase hover:bg-blue-900 hover:text-white text-blue-900 font-semibold">Logout</button></Link>
            </div>
        </nav>
    )
}