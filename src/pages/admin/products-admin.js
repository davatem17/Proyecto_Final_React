import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import clientHttp from '../../services/ClientHttp';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ProductEdit = () => {

    const [usuario, setUsuario] = useState({});


    const [loading, setLoading] = useState(true);
    const { userId } = useParams();

    const navegacion = useNavigate();

    useEffect(() => {
        clientHttp.get(`/Usuario/${userId}`)
            .then((response) => {
                setUsuario(response.data);
                setLoading(false);
            });
    }, []);



    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.id;
        setUsuario((userCurrent) => ({ ...userCurrent, [name]: value }));
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        if (event.target.checkValidity() === true) {
            var activo
            if (active === undefined) {
                activo = false
            } else {
                activo = active
            }
            clientHttp.put(`/Usuario?entidadId=${userId}&active=${activo}`, usuario)
                .then((response) => {
                    navegacion(`/admin/users`)
                });
        }
    }
    const { active } = usuario;


    return loading ? <div>Loading data...</div> :
        <form className="row" onSubmit={(e) => handleSubmit(e)}>

            <div className="col-6">
                <label htmlFor="identificacion" className="form-label">Activo</label>
                <div className="input-group has-validation">
                    <input type="checkbox" id="active"
                        value={active} onChange={e => handleChange(e)} />
                    <div className="invalid-feedback">
                        Identificación es obligatoria
                    </div>
                </div>
            </div>
            <div className="col-12 mt-3">
                <button className="btn btn-secondary" type="button" onClick={(e) => navegacion(`/admin/users`)}>Cancelar</button>
                <button className="btn btn-primary ms-3" type="submit">Guardar</button>

            </div>
        </form>
}


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [productList, setProductList] = useState({})

    const handleClose = () => setShow(false);
    const handleShow = (pro) => {
        setShow(true)
        setProductList(pro)
    };

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
    const handleDelete = (productId) => {
        
        clientHttp.delete(`/Producto?id=${productId}`)
            .then((response) => {
                console.log(response)
            });
    
}
    return <>
     <h2>Producto</h2>
        <table className="table">
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
                        <td><button onClick={(e) => handlerEditar(pro)} className="btn btn-primary">Editar</button></td>
                        <td><Button variant="danger" onClick={() => handleShow(pro)}>
                            Eliminar
                        </Button></td>
                    </tr>)}
            </tbody>
        </table>
        <Modal show={show}  onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Productos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <p><b>Id: </b>{productList.id} </p>
               <p><b>Nombre: </b>{productList.nombre} </p> 
               <p><b>Precio: </b>{productList.precio} </p> 
               <p><b>Observaciones: </b>{productList.observaciones} </p>
               <p><b>Caducidad: </b>{productList.caducidad} </p>  
               <p><b>Marca: </b>{productList.marca} </p>  
               <p><b>Tipo Producto: </b>{productList.tipoProducto} </p>        
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(productList.id)}>
                    Borrar
                </Button>
            </Modal.Footer>
        </Modal>
    </>

}

export default function ProductAdmin() {
    return <ProductList />
}