import React,{ useState } from "react";
import { Link } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { NavLink } from "react-router-dom";
import { ChevronDown } from 'lucide-react';

const MainNav = () => {
  const carts = useEcomStore((s)=> s.carts);
  const user = useEcomStore((s)=> s.user);
  const logout = useEcomStore((s)=> s.logout);
  

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <nav className="bg-red-500 shadow-md">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-22">
          <div className="flex items-center">
            <Link to={"/"} className="text-2xl font-bold">LOGO</Link>
          </div>

          <div className="flex items-center gap-20">
            <NavLink 
            className={({isActive})=>
              isActive
              ? "bg-gray-200 px-5 py-6 rounded-md text-sm font-medium" 
              : "px-5 py-6 rounded-md text-sm font-medium hover:bg-gray-300"
            }
            to={"/"}>
              Home
            </NavLink>
            
            
            
            <NavLink 
            className={({isActive})=>
              isActive
              ? "bg-gray-200 px-5 py-6 rounded-md text-sm font-medium" 
              : "px-5 py-6 rounded-md text-sm font-medium hover:bg-gray-300"
            }
            to={"/shop"}>Shop
            </NavLink>
            
            {/* Badge */}
            <NavLink 
            className={({isActive})=>
              isActive
              ? "bg-gray-200 px-5 py-6 rounded-md text-sm font-medium" 
              : "px-5 py-6 rounded-md text-sm font-medium hover:bg-gray-300"
            } 
            to={"/cart"}>
            Cart 
              {carts.length > 0 && (<span className="absolute top-0 bg-white rounded-full px-2">{carts.length}</span>)}
            </NavLink>

          </div>

          {
            user 
            ? <div className="flex items-center gap-6">
            <button 
            onClick={toggleMenu}
            className="flex items-center gap-2 hover:bg-gray-300 rounded-md px-2 py-3">
              <img 
              className="w-11 h-11 " 
              src="https://cdn-icons-png.flaticon.com/512/1326/1326377.png"/>
            
              <ChevronDown /> 
            </button>

            {
              isOpen && 
              <div className="absolute  top-20 bg-white shadow-md z-50">
                <Link 
                to={"/user/history"}
                className="block px-5 py-2 hover:bg-gray-300">
                    History
                </Link>
                <button 
                onClick={()=> {
                  logout();
                }}
                className="block px-5 py-2 hover:bg-gray-300">
                    Logout
                </button>
            </div>
            }            
            


            </div> 
            : <div className="flex items-center gap-6">
            <NavLink 
            className={({isActive})=>
              isActive
              ? "bg-gray-200 px-5 py-6 rounded-md text-sm font-medium" 
              : "px-5 py-6 rounded-md text-sm font-medium hover:bg-gray-300"
            }
            to={"/register"}>Register
            </NavLink>

            <NavLink 
            className={({isActive})=>
              isActive
              ? "bg-gray-200 px-5 py-6 rounded-md text-sm font-medium" 
              : "px-5 py-6 rounded-md text-sm font-medium hover:bg-gray-300"
            } 
            to={"/login"}>Login
            </NavLink>
          </div>
          }  
           

          
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
