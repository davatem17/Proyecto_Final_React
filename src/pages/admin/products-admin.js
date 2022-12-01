import {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import clientHttp from '../../services/ClientHttp';


const ProductEdit=()=>{
    
    const [product,setProduct]=useState({});
    const { productId } = useParams();

    useEffect(()=>{
        
        clientHttp.get(``)
            .then((response)=>setProduct(response.data))

    },[])
    
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


const ProductList=()=>{
    
    return <></>
}

export default function ProductAdmin(){
    return <>ProductAdmin</>
}