import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";

import Layout from "./componentes/layout";
import LayoutPrivate from "./componentes/layout-private";
import routesPublic from "./routes/routes-public";
import routesPrivate from "./routes/routes-private";
import Login from "./pages/login";
import Products from "./pages/products";
import ProductAdmin from "./pages/admin/products-admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />}></Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Products />}></Route>
          {routesPublic.map((route) => (
            <Route
              exact
              path={route.route}
              element={route.component}
              key={route.key}
            />
          ))}
        </Route>
        <Route path="/admin" element={<LayoutPrivate />}>
          <Route index element={<ProductAdmin />}></Route>
          {routesPrivate.map((route) => (
            <Route
              exact
              path={route.route}
              element={route.component}
              key={route.key}
            />
          ))} 
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
