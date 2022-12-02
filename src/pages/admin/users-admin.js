import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import clientHttp from '../../services/ClientHttp';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



export const UserCreate = () => {
    const [usuario, setUsuario] = useState({
        user: "",
        clave: "string",
        active: false
    });


    const [loading, setLoading] = useState(true);


    const navegacion = useNavigate();


    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.id;
        setUsuario((userCurrent) => ({ ...userCurrent, [name]: value }));
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        if (event.target.checkValidity() === true) {
            clientHttp.post(`/Usuario`, usuario)
                .then((response) => {
                    navegacion(`/admin/users/create`)
                    setLoading(false)
                });
        }
    }
    const { user, active } = usuario;
    console.log(usuario)
    return !loading ? <div>Loading data...</div> :
        <form className="row" onSubmit={(e) => handleSubmit(e)}>
            <div className="col-6">
                <label htmlFor="identificacion" className="form-label">User</label>
                <div className="input-group has-validation">
                    <input type="text" className="form-control" id="user"
                        value={user} onChange={e => handleChange(e)} required maxLength="30" />
                    <div className="invalid-feedback">
                        User es obligatoria
                    </div>
                </div>
            </div>

            <div className="col-6">
                <label htmlFor="identificacion" className="form-label">Activo</label>
                <div className="input-group has-validation">
                    <input type="checkbox" id="active"
                        value={active} onChange={e => handleChange(e)} />
                    <div className="invalid-feedback">
                        Active es obligatoria
                    </div>
                </div>
            </div>
            <div className="col-12 mt-3">
                <button className="btn btn-secondary" type="button" onClick={(e) => navegacion(`/admin/users`)}>Cancelar</button>
                <button className="btn btn-primary ms-3" type="submit">Guardar</button>

            </div>
        </form>
}

export const UserDelete = () => {
    const [usuario, setUsuario] = useState({});


    const [loading, setLoading] = useState(true);
    const { userId } = useParams();

    const navegacion = useNavigate();

    useEffect(() => {
        clientHttp.delete(`/Usuario?=${userId}`)
            .then((response) => {
                setUsuario(response.data);
                setLoading(false);
            });
    }, []);


}

export const UserEdit = () => {

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

const UserList = () => {
    const [users, setusers] = useState([]);
    const [show, setShow] = useState(false);
    const [userList, setUserList] = useState({})

    const handleClose = () => setShow(false);
    const handleShow = (user) => {
        setShow(true)
        setUserList(user)
    };
    const navegacion = useNavigate();
    useEffect(() => {
        clientHttp.get(`/Usuario`)
            .then((response) => {
                //console.log(response);
                setusers(response.data.lista);
            });
    }, []);
    const handlerEditar = (user) => {
        navegacion(`/admin/users/${user.id}`)
    }
    const handlerCrear = () => {
        navegacion(`/admin/users/create`)

    }

    const handleDelete = (userId) => {
        
            clientHttp.delete(`/Usuario?id=${userId}`)
                .then((response) => {
                    console.log(response)
                });
        
    }
    
    return <>
        <h2>Usuario</h2>
        <button type="button" className="btn btn-success" onClick={(e) => handlerCrear()}>+ Nuevo</button>
        <table className="table">
            <thead>
                <tr>
                    <th >Id</th>
                    <th >Usuario</th>
                    <th >Activo</th>
                </tr>
            </thead>
            <tbody>
                {users.map((usr) =>
                    <tr key={usr.id}>
                        <td>{usr.id}</td>
                        <td>{usr.user}</td>
                        <td>{usr.activo === true ? <p>Si</p> : <p>No</p>}</td>
                        <td><button onClick={(e) => handlerEditar(usr)} className="btn btn-primary">Editar</button></td>
                        <td><Button variant="danger" onClick={() => handleShow(usr)}>
                            Eliminar
                        </Button></td>
                    </tr>)}
            </tbody>
        </table>


        <Modal show={show}  onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <p><b>Id: </b>{userList.id} </p>  
               <p><b>User: </b>{userList.user} </p>  
               <p><b>Activo: </b>{userList.activo?.toString()} </p>     
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(userList.id)}>
                    Borrar
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default function UserAdmin() {
    return <UserList />
}