// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { Link, NavLink } from "react-router-dom";
// import { assets } from "../assets/assets";
// import { ShopContext } from "../context/ShopContext";

// const Navbar = () => {
//   const [visible, setVisible] = useState(false);

//   const {
//     setShowSearch,
//     getCartCount,
//     navigate,
//     token,
//     setToken,
//     setCartItems,
//   } = useContext(ShopContext);

//   const logout = () => {
//     navigate("/login");
//     localStorage.removeItem("token");
//     setToken("");
//     setCartItems({});
//   };
//   const [menuItems, setMenuItems] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:1337/api/menus?sort=order:asc")
//       .then((res) => {
//         // const items = res.data.data.map((item) => ({
//         //   id: item.id,
//         //   ...item.attributes,
//         // }));
//         // console.log("Menu items fetched:", items);
//         setMenuItems(res.data.data);
//       })
//       .catch((err) => console.error("Menu fetch failed:", err));
//   }, []);

//   return (
//     <div className="flex items-center justify-between py-5 font-medium">
//       <Link to="/">
//         <img src={assets.logo} className="w-36" alt="" />
//       </Link>

//       <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
//         {menuItems.map((item) => (
//           <NavLink
//             key={item.id}
//             to={item.path}
//             className="flex flex-col items-center gap-1"
//           >
//             <p>{item.title?.toUpperCase()}</p>
//             <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
//           </NavLink>
//         ))}
//       </ul>

//       <div className="flex items-center gap-6">
//         {/* <img
//           onClick={() => {
//             setShowSearch(true);
//             navigate("/collection");
//           }}
//           src={assets.search_icon}
//           className="w-5 cursor-pointer"
//           alt=""
//         /> */}

//         <div className="group relative">
//           <img
//             onClick={() => (token ? null : navigate("/login"))}
//             className="w-5 cursor-pointer"
//             src={assets.profile_icon}
//             alt=""
//           />
//           {/* Dropdown Menu */}
//           {token && (
//             <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
//               <div className="flex flex-col gap-2 w-36 py-3 px-5  bg-slate-100 text-gray-500 rounded">
//                 <p className="cursor-pointer hover:text-black">My Profile</p>
//                 <p
//                   onClick={() => navigate("/orders")}
//                   className="cursor-pointer hover:text-black"
//                 >
//                   Orders
//                 </p>
//                 <p onClick={logout} className="cursor-pointer hover:text-black">
//                   Logout
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//         <Link to="/cart" className="relative">
//           <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
//           <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
//             {getCartCount()}
//           </p>
//         </Link>
//         <img
//           onClick={() => setVisible(true)}
//           src={assets.menu_icon}
//           className="w-5 cursor-pointer sm:hidden"
//           alt=""
//         />
//       </div>

//       {/* Sidebar menu for small screens */}
//       <div
//         className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
//           visible ? "w-full" : "w-0"
//         }`}
//       >
//         <div className="flex flex-col text-gray-600">
//           <div
//             onClick={() => setVisible(false)}
//             className="flex items-center gap-4 p-3 cursor-pointer"
//           >
//             <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
//             <p>Back</p>
//           </div>
//           {menuItems.map((item) => (
//             <NavLink
//               key={item.id}
//               to={item.path}
//               onClick={() => setVisible(false)}
//               className="py-2 pl-6 border"
//             >
//               {item.title?.toUpperCase()}
//             </NavLink>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisble] = useState(false);

  const { setShowSearch, navigate, getCartCount } = useContext(ShopContext);

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img className="w-36" src={assets.logo} alt="" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => {
            setShowSearch(true);
            navigate("/collection");
          }}
          className="w-5 cursor-pointer"
          src={assets.search_icon}
          alt=""
        />
        <div className="group relative">
          <img
            onClick={() => {
              navigate("/login");
            }}
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt=""
          />

          {/* Dropdown Menu */}
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5  bg-slate-100 text-gray-500 rounded">
              <p onClick={() => {}} className="cursor-pointer hover:text-black">
                My Profile
              </p>
              <p
                onClick={() => navigate("/orders")}
                className="cursor-pointer hover:text-black"
              >
                Orders
              </p>
              <p onClick={() => {}} className="cursor-pointer hover:text-black">
                Logout
              </p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img className="w-5 min-w-5" src={assets.cart_icon} alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisble(true)}
          className="w-5 cursor-pointer sm:hidden"
          src={assets.menu_icon}
          alt=""
        />
      </div>

      {/* Sidebar Menu For Small Screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisble(false)}
            className="flex items-center gap-4 p-3 "
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisble(false)}
            to="/"
            className="py-2 pl-6 border"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisble(false)}
            to="/collection"
            className="py-2 pl-6 border"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisble(false)}
            to="/about"
            className="py-2 pl-6 border"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisble(false)}
            to="/contact"
            className="py-2 pl-6 border"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
