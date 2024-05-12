import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../../components/theme/footer/Footer";
import NavBar from "../../components/theme/header/NavBar";
import SideNav from "../../components/theme/header/SideNav";
import PublicRoute from "../../libs/Router/PublicRouter";
import { useLocation } from "react-router-dom";
export default function LayoutTheme({ children }) {
  let location = useLocation();

  const [path] = useState(location.pathname);
  return (
    <React.Fragment>
      <Routes>
        <Route path="*" element={<PublicRoute />}>
          <Route path="*" element={<NavBar />} />
        </Route>
      </Routes>
      {path !== "/not-found" && path !== "/login" ? (
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <Routes>
              <Route path="*" element={<PublicRoute />}>
                <Route path="*" element={<SideNav />} />
              </Route>
            </Routes>
          </div>
          <div id="layoutSidenav_content">
            {children}
            <Routes>
              <Route path="*" element={<PublicRoute />}>
                <Route path="*" element={<Footer />} />
              </Route>
            </Routes>
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </React.Fragment>
  );
}
