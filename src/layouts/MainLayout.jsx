import React from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <div className="main-layout h-full">
            <Outlet />
        </div>
    )
}

export default MainLayout;