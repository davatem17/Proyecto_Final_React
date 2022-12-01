import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import clientHttp from '../../services/ClientHttp';


const ProductEdit = () => {

    const [product, setProduct] = useState({});
    const { productId } = useParams();

    useEffect(() => {

        clientHttp.get(``)
            .then((response) => setProduct(response.data))

    }, [])

    return <form>
        <div className="col-md-4">
            <label for="validationCustomUsername" className="form-label">Username</label>
            <div className="input-group has-validation">
                <input type="text" className="form-control" id="validationCustomUsername"
                    required />
                <div className="invalid-feedback">
                    Please choose a username.
                </div>
            </div>
        </div>


    </form>
}


const ProductList = () => {
    const [products, setProducts] = useState([]);

    const navegacion = useNavigate();
    useEffect(() => {
        clientHttp.get(`/Producto`)
            .then((response) => {
                //console.log(response);
                setProducts(response.data.lista);
            });
    }, []);
    const handlerEditar = (product) => {
        navegacion(`/admin/products/${product.id}`)
    }
    return <table className="table">
        <thead>
            <tr>
                <th >Id</th>
                <th >Nombre</th>
                <th >Precio</th>
                <th >Observaciones</th>
                <th >Caducidad</th>
                <th >Marca</th>
                <th >TipoProducto</th>
            </tr>
        </thead>
        <tbody>
            {products.map((pro) =>
                <tr key={pro.id}>
                    <td>{pro.id}</td>
                    <td>{pro.nombre}</td>
                    <td>{pro.precio}</td>
                    <td>{pro.observaciones}</td>
                    <td>{pro.caducidad}</td>
                    <td>{pro.marca}</td>
                    <td>{pro.tipoProducto}</td>
                    <td><button onClick={(e) => handlerEditar(pro)}>Editar</button></td>
                </tr>)}
        </tbody>
    </table>
}

export default function ProductAdmin() {
    return <ProductList/>
}