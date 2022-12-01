import { Outlet } from "react-router-dom";

import Footer from "./footer";
import NavegacionPublica from "./nav-public";

const Layout = () => {
  return (
    <>
      <div className="container py-3">
        <header>
          <NavegacionPublica />
        </header>
        <main>
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h3>Titulo</h3>
                </div>
                <div className="card-body">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
