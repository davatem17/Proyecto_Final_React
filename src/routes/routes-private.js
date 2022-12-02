//import { BrowserRouter, Route, Routes } from "react-router-dom";

import ClientsAdmin, { ClientEdit, ClientCreate } from "../pages/admin/clients-admin";
import ProductAdmin, {ProductEdit} from "../pages/admin/products-admin";

import UserAdmin, { UserCreate, UserEdit } from "../pages/admin/users-admin";


export default [
    {
        name: "Administración Productos ",
        key: "products-admin",
        route: "/admin/products",
        component: <ProductAdmin />,
        showLink: true
    },
    
    {
        name: "Crear Productos ",
        key: "products-create-admin",
        route: "/admin/products/create",
        component: <UserCreate />,
        showLink: false
    },

    {
        name: "Clientes",
        key: "clients-admin",
        route: "/admin/clients",
        component: <ClientsAdmin />,
        showLink: true
    },
    {
        name: "Editar Clientes ",
        key: "clients-edit-admin",
        route: "/admin/clients/:clientId",
        component: <ClientEdit />,
        showLink: false
    }
    ,
    
    {
        name: "Usuario",
        key: "users-admin",
        route: "/admin/users",
        component: <UserAdmin />,
        showLink: true
    },
    {
        name: "Editar Usuarios ",
        key: "users-edit-admin",
        route: "/admin/users/:userId",
        component: <UserEdit />,
        showLink: false
    },
    {
        name: "Crear Usuarios ",
        key: "users-create-admin",
        route: "/admin/users/create",
        component: <UserCreate />,
        showLink: false
    }

];