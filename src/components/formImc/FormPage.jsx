import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useDispatch, useSelector } from "react-redux"
import Modal from "../shared/Modal"
import FormImc from "./FormImc"
import { addImc, fetchImc } from "./formImcSlice"
import ImcDisplay from "./ImcDisplay"

const FormPage = () => {

    const dispatch = useDispatch()
    const idUser = localStorage.getItem('token')
    const imc = useSelector(state => state.formImc.imc)
    const [formImcMode,setFormImcMode] = useState('')

    const onAdd = async (imc) => {
            await dispatch(addImc({idUser: idUser,...imc}));
            setFormImcMode("");
    }

    useEffect(() => {
        dispatch(fetchImc()); 
    }, [dispatch])

    return(
        <>
            {formImcMode && createPortal(<Modal onClose={()=>setFormImcMode("")}>
                <FormImc onAdd={onAdd}/>
            </Modal>,document.getElementById("modal-root"))}
            <div className="row">
                <h3 className="mb-3">Les dernières valeurs entrées</h3>
                {imc.length === 0 ?
                <p>Il n'y a pas de données</p> : 
                imc.map((e,i )=> <ImcDisplay key={i} imc={e} idUser={idUser}/>)}
            </div>
            <div className="row">
            <button className="ms-auto btn btn-outline-info" onClick={() => setFormImcMode("Sign Up")}>Ajouter une valeur</button>
            </div>
            
        </>
    )
}

export default FormPage