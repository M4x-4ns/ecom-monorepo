import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { SquareChartGantt,UserRoundCog,ShoppingBasket,ListOrdered,LogOut     } from "lucide-react";
const SidebarAdmin = () => {
  return (
    <div className="bg-gray-800 w-60 flex flex-col h-screen  text-gray-100">
      <div className="h-24 bg-gray-900 flex items-center justify-center text-2xl font-bold">
        Admin Panel
      </div>

      <nav className=" flex-1 px-5 py-5 space-y-2">
        <NavLink
          to={"/admin"}
          end
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white px-4 py-2 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rouded flex items-center"
          }
        >
          <LayoutDashboard className="mr-2" />
          Dashboard
        </NavLink>

        <NavLink
          to={"manage"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white px-4 py-2 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rouded flex items-center"
          }
        >
          <UserRoundCog className="mr-2"/> 
          Manage
        </NavLink>
        <NavLink
          to={"category"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white px-4 py-2 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rouded flex items-center"
          }
        >
          <SquareChartGantt className="mr-2" />
          Category
        </NavLink>
        <NavLink
          to={"product"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white px-4 py-2 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rouded flex items-center"
          }
        >
          <ShoppingBasket className="mr-2" />
          Product
        </NavLink>

        <NavLink
          to={"orders"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white px-4 py-2 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rouded flex items-center"
          }
        >
          <ListOrdered  className="mr-2" />
          Orders
        </NavLink>
      </nav>

      <div>
        <NavLink
          
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white px-4 py-2 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rouded flex items-center"
          }
        >
          <LogOut  className="mr-2" />
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default SidebarAdmin;
