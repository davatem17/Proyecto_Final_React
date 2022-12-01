import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import clientHttp from '../../services/ClientHttp';

export const UserEdit=()=>{
    
    const [ usuario,setUsuario]=useState({});
    
    
    const [loading,setLoading]=useState(true);
    const { userId } = useParams();

    const navegacion = useNavigate();

    useEffect(()=>{
        clientHttp.get(`/Usuario/${userId}`)
            .then((response)=>{
                setUsuario(response.data);
                setLoading(false);
            });
    },[]);

  
    
    const handleChange = (event) => {
         const target = event.target;
         const value = target.type === "checkbox" ? target.checked : target.value;
         const name = target.id;         
         setUsuario((userCurrent)=>({...userCurrent,[name]: value}));
    };

    
    const handleSubmit= (event) => {
        event.preventDefault();
        if (event.target.checkValidity() === true) {
            var activo
            if(active===undefined){
                activo = false
            }else{
                activo = active
            }
            clientHttp.put(`/Usuario?entidadId=${userId}&active=${activo}`,usuario)
                .then((response)=>{
                    navegacion(`/admin/users`)
                });
        }
      }
      const {active} = usuario;
    

    return loading?<div>Loading data...</div>:
        <form className="row"  onSubmit={(e)=>handleSubmit(e)}>
            
            <div className="col-6">
                <label htmlFor="identificacion" className="form-label">Activo</label>
                <div className="input-group has-validation">
                    <input type="checkbox"  id="active"
                    value={active} onChange= {e => handleChange(e)}    />
                    <div className="invalid-feedback">
                        Identificación es obligatoria
                    </div>
                </div>
            </div>
            

            
            
            <div className="col-12 mt-3">
               <button className="btn btn-secondary" type="button" onClick={(e)=>navegacion(`/admin/users`)}>Cancelar</button>
                <button className="btn btn-primary ms-3" type="submit">Guardar</button>
                
            </div>
        </form> 
}

const UserList = () => {
    const [users, setusers] = useState([]);

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
    return <table className="table">
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
                    <td>{usr.activo===true?<p>Si</p>:<p>No</p>}</td>
                    <td><button onClick={(e) => handlerEditar(usr)}>Editar</button></td>
                </tr>)}
        </tbody>
    </table>
}

export default function UserAdmin() {
    return <UserList/>
}