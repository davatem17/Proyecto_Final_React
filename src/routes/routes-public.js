//import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutPrivate from "../componentes/layout-private";
import Products from "../pages/products";

export default [
    {
        name: "Productos",
        key:"products",
        route: "/products",
        component: <Products />,
        showLink:true
    },
    {
        name: "Administracion",
        key:"admin",
        route: "/admin",
        component: <LayoutPrivate />,
        showLink:true
    }
];