 
import { Outlet } from "react-router-dom";

import Footer from "./footer";
import NavegacionPrivada from "./nav-private";

const LayoutPrivate = () => {
  return (
    <>
      <div className="container py-3">
        <header>
          <NavegacionPrivada />
        </header>
        <main>
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h3>Titulo LayoutPrivate</h3>
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

export default LayoutPrivate;
