import React, { useState } from "react";
import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import CropFreeIcon from "@mui/icons-material/CropFree";
import ShoppingBagSharpIcon from "@mui/icons-material/ShoppingBagSharp";
import DiscountIcon from "@mui/icons-material/Discount";
import NotificationsSharpIcon from "@mui/icons-material/NotificationsSharp";
import SettingsSuggestSharpIcon from "@mui/icons-material/SettingsSuggestSharp";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="sidebar">
      <div className="center">
        <ul>
          <Link to="/seller" style={{ textDecoration: "none" }}>
            <li className="active">
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">Application Stats</p>
          <Link to="/seller/products" style={{ textDecoration: "none" }}>
            <li>
              <InventoryIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/seller/blogs" style={{ textDecoration: "none" }}>
            <li>
              <NewspaperIcon className="icon" />
              <span>Blogs - Articles</span>
            </li>
          </Link>
          <Link to="/seller/orders" style={{ textDecoration: "none" }}>
            <li>
              <ShoppingBagSharpIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          <p className="title">Discount Offers</p>
          <Link to="/seller/sales" style={{ textDecoration: "none" }}>
            <li>
              <DiscountIcon className="icon" />
              <span>Sales - Deals</span>
            </li>
          </Link>
          <Link to="/seller/addPromo" style={{ textDecoration: "none" }}>
            <li>
              <CropFreeIcon className="icon" />
              <span>Promos</span>
            </li>
          </Link>
          <p className="title">System Controls</p>
          <Link to='/seller/notifications'>
            <li>
              <NotificationsSharpIcon className="icon" />
              <span>Notifications</span>
            </li>
          </Link>
          <p className="title">Store Profile</p>
          <Link to="/seller/sellerProfile">
            <li>
              <AccountCircleSharpIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <Link to="/sellerLogout">
            <li>
              <LogoutRoundedIcon className="icon" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>

    //   const [isOpen, setIsopen] = useState(false);

    //     const ToggleSidebar = () => {
    //         isOpen === true ? setIsopen(false) : setIsopen(true);
    //     }
    //     return (
    //         <>
    //             <div className="container-fluid mt-3">

    //                     <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-md">
    //                         <div className="container-fluid p-2">
    //                             <a className="navbar-brand text-primary mr-0">Company Logo</a>
    //                             <div className="form-inline ml-auto">
    //                                 <div className="btn btn-primary" onClick={ToggleSidebar} >
    //                                     <i className="fa fa-bars"></i>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </nav>
    //                     <div className={`sidebar ${isOpen == true ? 'active' : ''}`}>
    //                         <div className="sd-header">
    //                             <h4 className="mb-0">Sidebar Header</h4>
    //                             <div className="btn btn-primary" onClick={ToggleSidebar}><i className="fa fa-times"></i></div>
    //                         </div>
    //                         <div className="sd-body">
    //                             <ul>
    //                                 <li><a className="sd-link">Menu Item 1</a></li>
    //                                 <li><a className="sd-link">Menu Item 2</a></li>
    //                                 <li><a className="sd-link">Menu Item 3</a></li>
    //                                 <li><a className="sd-link">Menu Item 4</a></li>
    //                                 <li><a className="sd-link">Menu Item 5</a></li>
    //                                 <li><a className="sd-link">Menu Item 6</a></li>
    //                                 <li><a className="sd-link">Menu Item 7</a></li>
    //                                 <li><a className="sd-link">Menu Item 8</a></li>
    //                             </ul>
    //                         </div>
    //                     </div>
    //                     <div className={`sidebar-overlay ${isOpen == true ? 'active' : ''}`} onClick={ToggleSidebar}></div>
    //            </div>

    //         </>
  );
}
